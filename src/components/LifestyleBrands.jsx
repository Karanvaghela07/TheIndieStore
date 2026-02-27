import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../styles/lifestyle-sections.css';

const LifestyleBrands = () => {
    const brands = [
        { name: "ginger", price: "299", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=400&h=500&fit=crop" },
        { name: "FAME FOREVER", price: "299", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&h=500&fit=crop" },
        { name: "melange", price: "399", img: "https://images.unsplash.com/photo-1583391733958-d259746c8181?q=80&w=400&h=500&fit=crop" },
        { name: "CODE", price: "399", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&fit=crop" },
        { name: "FORCA", price: "499", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=400&h=500&fit=crop" }
    ];

    return (
        <section className="lifestyle-section feature-brands-section container">
            <div className="section-header-left">
                <h2>Featured Brands</h2>
                <div className="header-underline"></div>
            </div>

            <div className="brands-scroll-container">
                <div className="brands-track">
                    {brands.map((brand, idx) => (
                        <Link to={`/discover`} key={idx} className="brand-card">
                            <img src={brand.img} alt={brand.name} />
                            <div className="brand-gradient"></div>
                            <div className="brand-info">
                                <span className="b-name">{brand.name}</span>
                                <span className="b-price">
                                    <small>FROM</small> ₹{brand.price}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <button className="nav-arrow right-arrow floating"><ChevronRight /></button>
            </div>
        </section>
    );
};

export default LifestyleBrands;
