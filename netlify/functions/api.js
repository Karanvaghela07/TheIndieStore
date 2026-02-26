import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

const app = express();

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-session-token']
}));

// Manually parse JSON for safety instead of strictly relying on express.json()
app.use(express.json({ type: ['application/json', 'text/plain'] }));
app.use(express.urlencoded({ extended: true }));

// ── Database Connection ───────────────────────────────────────────────────────
// In Netlify, environmental variables are handled automatically via UI Dashboard
// But we fallback to process.env locally just in case.
const MONGO_URI = process.env.MONGO_URI;

// We connect only once in a serverless environment (warm start)
let isConnected = false;
async function connectToDatabase() {
    if (isConnected) return;
    if (!MONGO_URI) throw new Error("FATAL ERROR: MONGO_URI is not defined");

    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas Serverless!');
}

// ── Mongoose Schemas & Models ─────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }
}, { timestamps: true });

const sessionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    sessionToken: { type: String, required: true, unique: true },
    loginTime: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(+new Date() + 30 * 24 * 60 * 60 * 1000) }
});

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Ensure models aren't redefined if the serverless function is "warm"
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Session = mongoose.models.Session || mongoose.model('Session', sessionSchema);


// ── Routes ────────────────────────────────────────────────────────────────────
function getBody(req) {
    let body = req.body;

    // Fallback to raw event body (Netlify Serverless Specific)
    if (!body || Object.keys(body).length === 0) {
        if (req.apiGateway && req.apiGateway.event && req.apiGateway.event.body) {
            body = req.apiGateway.event.body;
        }
    }

    // Attempt to defensively parse strings if Netlify didn't format it as JSON
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch (e) {
            // If it's URL encoded (e.g. name=Karan&email=test...), parse it manually
            const searchParams = new URLSearchParams(body);
            if (Array.from(searchParams.keys()).length > 0) {
                body = Object.fromEntries(searchParams);
            }
        }
    }

    // Double check if somehow it got double-stringified
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { }
    }

    return body || {};
}

app.post('/api/signup', async (req, res) => {
    try {
        await connectToDatabase();
        const { name, email, password } = getBody(req);
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields required. Please ensure no fields are empty.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'An account with this email already exists.' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const sessionToken = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const newSession = new Session({ name, email, sessionToken });
        await newSession.save();

        return res.json({ success: true, user: { name, email }, sessionToken });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ error: 'Internal server error during signup.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        await connectToDatabase();
        const { email, password } = getBody(req);
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required.' });
        }

        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid email or password. Please try again.' });
        }

        const sessionToken = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const newSession = new Session({ name: user.name, email: user.email, sessionToken });
        await newSession.save();

        return res.json({ success: true, user: { name: user.name, email: user.email }, sessionToken });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: 'Internal server error during login.' });
    }
});

app.get('/api/session', async (req, res) => {
    try {
        await connectToDatabase();
        const token = req.headers['x-session-token'];
        if (!token) return res.json({ user: null });

        const session = await Session.findOne({ sessionToken: token });
        if (!session) return res.json({ user: null });

        return res.json({ user: { name: session.name, email: session.email } });
    } catch (error) {
        return res.json({ user: null });
    }
});

app.post('/api/logout', async (req, res) => {
    try {
        await connectToDatabase();
        const token = req.headers['x-session-token'];
        if (token) {
            await Session.deleteOne({ sessionToken: token });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to logout properly' });
    }
});

// Wrap the Express app in a Serverless HTTP wrapper
export const handler = serverless(app);
