import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import '../styles/lifestyle-sections.css';

const LifestyleNewSeason = () => {
    const collections = [
        {
            title: "Women",
            img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&h=800&fit=crop",
            link: "/women"
        },
        {
            title: "Men",
            img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&h=800&fit=crop",
            link: "/men"
        },
        {
            title: "Kids",
            img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600&h=800&fit=crop",
            link: "/kids"
        }
    ];

    return (
        <section className="lifestyle-section new-season-section">
            <div className="section-header-center">
                <h2>New Season</h2>
                <p>Spring Summer Collection</p>
            </div>

            <div className="new-season-container">
                <button className="nav-arrow left-arrow"><ChevronLeft /></button>
                <div className="new-season-grid">
                    {collections.map((item, idx) => (
                        <Link to={item.link} key={idx} className="new-season-card">
                            <div className="ns-image-wrapper">
                                <img src={item.img} alt={item.title} />
                                <div className="ns-gradient-overlay"></div>
                                <h3 className="ns-title">{item.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <button className="nav-arrow right-arrow"><ChevronRight /></button>
            </div>
        </section>
    );
};

export default LifestyleNewSeason;
