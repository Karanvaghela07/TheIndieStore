import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const HeroSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            id: 1,
            desktopImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&h=740&fit=crop&crop=center",
            mobileImg: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&h=800&fit=crop&crop=center",
            subtitle: "SUMMER EDIT",
            title: "BOLD & VIBRANT",
            ctaText: "Shop The Collection",
            link: "/women",
            alt: "Summer Yellow Collection"
        },
        {
            id: 2,
            desktopImg: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1920&h=740&fit=crop&crop=center",
            mobileImg: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&h=800&fit=crop&crop=center",
            subtitle: "URBAN LUXE",
            title: "Night Out Essentials",
            ctaText: "Explore Now",
            link: "/women",
            alt: "Night Out Collection"
        },
        {
            id: 3,
            desktopImg: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=1920&h=740&fit=crop&crop=center",
            mobileImg: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=800&h=800&fit=crop&crop=center",
            subtitle: "STREET CULTURE",
            title: "Redefine Casuals",
            ctaText: "Shop Sneakers & Tees",
            link: "/discover",
            alt: "Streetwear Collection"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="hero-slider-container">
            <div className="hero-image-wrapper">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hero-slide-item"
                    >
                        <Link to={slides[currentIndex].link} className="hero-slide-link">
                            <picture>
                                <source media="(max-width: 768px)" srcSet={slides[currentIndex].mobileImg} />
                                <img
                                    src={slides[currentIndex].desktopImg}
                                    alt={slides[currentIndex].alt}
                                    className="slider-img"
                                />
                            </picture>

                            {/* Lifestyle Text Overlay */}
                            <div className="lifestyle-hero-overlay">
                                <span className="lifestyle-hero-subtitle">{slides[currentIndex].subtitle}</span>
                                <h2 className="lifestyle-hero-title">{slides[currentIndex].title}</h2>
                                <button className="lifestyle-btn solid">{slides[currentIndex].ctaText}</button>
                            </div>
                        </Link>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button className="slider-arrow left" onClick={prevSlide}>
                    <ChevronLeft size={32} />
                </button>
                <button className="slider-arrow right" onClick={nextSlide}>
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Dots - Below Image */}
            <div className="slider-dots-container">
                <div className="slider-dots">
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            className={`slider-dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSlider;
