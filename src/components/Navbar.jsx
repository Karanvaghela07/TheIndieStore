import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart, MapPin, Truck, HelpCircle, Phone, Navigation } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { toggleCart, cartCount } = useCart();
    const { wishlistItems } = useWishlist();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100); // Trigger shadow after top strip scrolls away
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
        }
    };

    const navLinks = [
        { name: 'Women', path: '/women' },
        { name: 'Men', path: '/men' },
        { name: 'Kids', path: '/kids' },
        { name: 'Footwear', path: '/shop?category=Footwear' },
        { name: 'Bags', path: '/shop?category=Bags' },
        { name: 'Beauty', path: '/shop?category=Beauty' },
        { name: 'Home & Living', path: '/shop?category=Home%20%26%20Living' },
        { name: 'Babyshop', path: '/kids' },
        { name: 'Festive', path: '/shop?category=Festive' },
        { name: 'Watches', path: '/shop?category=Watches' },
        { name: 'LUXE', path: '/shop?category=Accessories' },
    ];

    return (
        <header className="lifestyle-header">
            {/* TIER 1: TOP STRIP */}
            <div className="lifestyle-top-strip">
                <div className="container top-strip-container">
                    <div className="top-strip-left">
                        <Link to="/shipping" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span><Truck size={14} /> Free Shipping</span></Link>
                        <Link to="/shipping" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span><MapPin size={14} /> Click & Collect</span></Link>
                        <Link to="/returns" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span><Phone size={14} /> Return To Store</span></Link>
                    </div>
                    <div className="top-strip-right">
                        <Link to="/shipping" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span><Navigation size={14} /> Delivering To</span></Link>
                        <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>Download Our Apps</span></Link>
                        <Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>Store Locator</span></Link>
                        <Link to="/support" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span>Help</span></Link>
                    </div>
                </div>
            </div>

            {/* TIER 2: MAIN HEADER */}
            <div className={`lifestyle-main-header ${isScrolled ? 'sticky-scrolled' : ''}`}>
                <div className="container main-header-container">
                    {/* Logo */}
                    <Link to="/" className="lifestyle-logo" style={{ fontSize: '1.6rem' }}>
                        THE INDIE STORE
                    </Link>

                    {/* Search Bar */}
                    <div className="lifestyle-search-wrapper desktop-only">
                        <form onSubmit={handleSearch} className="lifestyle-search-form">
                            <Search size={18} className="search-icon" />
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>

                    {/* Right Utilities */}
                    <div className="lifestyle-utils">
                        <Link to={currentUser ? '/account' : '/login'} className="lifestyle-auth-btn desktop-only">
                            {currentUser ? `HI, ${currentUser.name.toUpperCase()}` : 'SIGN UP / SIGN IN'}
                        </Link>

                        <Link to="/wishlist" className="util-item">
                            <div className="util-icon-wrapper">
                                <Heart size={22} />
                                {wishlistItems && wishlistItems.length > 0 && <span className="util-badge"></span>}
                            </div>
                            <span className="util-label desktop-only">Favourites</span>
                        </Link>

                        <div className="util-item" onClick={toggleCart}>
                            <div className="util-icon-wrapper">
                                <ShoppingBag size={22} />
                                {cartCount > 0 && <span className="util-badge count">{cartCount}</span>}
                            </div>
                            <span className="util-label desktop-only">Basket</span>
                        </div>

                        <div className="util-item mobile-only" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={24} />
                            <span className="util-label">Menu</span>
                        </div>

                        <div className="util-item desktop-only">
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', height: '22px', justifyContent: 'center' }}>
                                <div style={{ width: 3, height: 3, background: '#111', borderRadius: '50%' }}></div>
                                <div style={{ width: 3, height: 3, background: '#111', borderRadius: '50%' }}></div>
                                <div style={{ width: 3, height: 3, background: '#111', borderRadius: '50%' }}></div>
                            </div>
                            <span className="util-label">More</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Search - Below Header on Mobile */}
                <div className="lifestyle-search-wrapper mobile-only" style={{ padding: '0 1rem 1rem' }}>
                    <form onSubmit={handleSearch} className="lifestyle-search-form">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="What are you looking for?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            {/* TIER 3: CATEGORY NAV */}
            <nav className={`lifestyle-cat-nav desktop-only ${isScrolled ? 'sticky-cat-nav' : ''}`}>
                <div className="container cat-nav-container">
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} className="cat-nav-link">
                            {link.name}
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay"
                        initial={{ opacity: 0, x: '-100%' }} /* Customary left-slide */
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '-100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <div className="mobile-menu-header">
                            <span className="lifestyle-logo">LIFESTYLE</span>
                            <X
                                className="icon close-icon"
                                size={28}
                                onClick={() => setIsMobileMenuOpen(false)}
                            />
                        </div>

                        <div className="mobile-auth-section">
                            <Link to={currentUser ? '/account' : '/login'} className="lifestyle-auth-btn full-width" onClick={() => setIsMobileMenuOpen(false)}>
                                {currentUser ? `HI, ${currentUser.name.toUpperCase()}` : 'SIGN UP / SIGN IN'}
                            </Link>
                        </div>

                        <div className="mobile-links">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <Link
                                        to={link.path}
                                        className="mobile-link"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
