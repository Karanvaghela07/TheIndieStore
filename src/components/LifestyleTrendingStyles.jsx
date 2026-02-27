import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/lifestyle-sections.css';

const LifestyleTrendingStyles = () => {
    return (
        <section className="lifestyle-section trending-styles-section container">
            <div className="section-header-left">
                <h2>Trending Styles</h2>
                <div className="header-underline"></div>
            </div>

            <div className="trending-styles-layout">
                {/* Large Featured Style */}
                <Link to="/shop?category=Outerwear" className="ts-large-card">
                    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&h=1000&fit=crop" alt="Festive Wear" />
                    <div className="ts-content">
                        <h3>The Festive Edit</h3>
                        <p>Elevate your celebrations with our new arrivals.</p>
                        <span className="lifestyle-btn-outline">Shop Now</span>
                    </div>
                </Link>

                <div className="ts-side-cards">
                    {/* Top Side Card */}
                    <Link to="/shop?category=Footwear" className="ts-small-card">
                        <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&h=500&fit=crop" alt="Sneakers" />
                        <div className="ts-content-overlay">
                            <h4>Sneaker Studio</h4>
                        </div>
                    </Link>

                    {/* Bottom Side Card */}
                    <Link to="/shop?category=Accessories" className="ts-small-card">
                        <img src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&h=500&fit=crop" alt="Accessories" />
                        <div className="ts-content-overlay">
                            <h4>Must-Have Accessories</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LifestyleTrendingStyles;
