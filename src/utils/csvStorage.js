// csvStorage.js — API client for the Express backend
// The actual CSV files live in:
//   data/signup.csv  — all registered users
//   data/login.csv   — login sessions with tokens

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const TOKEN_KEY = 'moda_token';     // stores session token in localStorage
const USER_KEY = 'moda_user';       // stores current user object in localStorage (cache)

// ── Token helpers ─────────────────────────────────────────────────────────────

export function getStoredToken() {
    return localStorage.getItem(TOKEN_KEY) || null;
}

export function getStoredUser() {
    try {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function storeSession(user, token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

// ── API calls ─────────────────────────────────────────────────────────────────

/**
 * Sign up a new user. Writes a row to signup.csv on the server.
 * Returns { success, user, error }
 */
export async function apiSignup(name, email, password) {
    try {
        const res = await fetch(`${API}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) return { success: false, error: data.error || 'Signup failed.' };
        storeSession(data.user, data.sessionToken);
        return { success: true, user: data.user };
    } catch {
        return { success: false, error: 'Cannot connect to auth server. Make sure the server is running.' };
    }
}

/**
 * Login. Validates against signup.csv, appends a row to login.csv.
 * Returns { success, user, error }
 */
export async function apiLogin(email, password) {
    try {
        const res = await fetch(`${API}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) return { success: false, error: data.error || 'Login failed.' };
        storeSession(data.user, data.sessionToken);
        return { success: true, user: data.user };
    } catch {
        return { success: false, error: 'Cannot connect to auth server. Make sure the server is running.' };
    }
}

/**
 * Validate a stored token against the server (login.csv).
 * IMPORTANT: We NEVER auto-clear the session here.
 * The user stays logged in until they explicitly click Logout.
 * If the server is down or the token isn't found, we fall back to the cached user.
 */
export async function apiCheckSession() {
    const token = getStoredToken();
    const cachedUser = getStoredUser();

    // No token means not logged in at all
    if (!token) return null;

    try {
        const res = await fetch(`${API}/session`, {
            headers: { 'x-session-token': token },
        });
        const data = await res.json();
        if (data.user) {
            // Server confirmed — refresh the cache
            localStorage.setItem(USER_KEY, JSON.stringify(data.user));
            return data.user;
        }
        // Server didn't find the token (e.g. server restarted) — keep the cached user
        // Only logout() will ever clear the session
        return cachedUser;
    } catch {
        // Server offline or network error — use cached user
        return cachedUser;
    }
}


/**
 * Logout — removes session row from login.csv, clears localStorage.
 */
export async function apiLogout() {
    const token = getStoredToken();
    clearStoredSession();
    if (!token) return;
    try {
        await fetch(`${API}/logout`, {
            method: 'POST',
            headers: { 'x-session-token': token },
        });
    } catch {
        // Server offline — we already cleared localStorage, so logout is effective locally
    }
}
