import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const navCategories = [
    { name: "Women", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=150&h=150&fit=crop", link: "/women" },
    { name: "Men", img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=150&h=150&fit=crop", link: "/men" },
    { name: "Kids", img: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=150&h=150&fit=crop", link: "/kids" },
    { name: "Footwear", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=150&h=150&fit=crop", link: "/shop?category=Footwear" },
    { name: "Bags", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=150&h=150&fit=crop", link: "/shop?category=Bags" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54cb2?q=80&w=150&h=150&fit=crop", link: "/shop?category=Beauty" },
    { name: "Home & Living", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=150&h=150&fit=crop", link: "/shop?category=Home%20%26%20Living" },
    { name: "Babyshop", img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=150&h=150&fit=crop", link: "/kids" },
    { name: "Festive", img: "https://images.unsplash.com/photo-1583391733958-d259746c8181?q=80&w=150&h=150&fit=crop", link: "/shop?category=Festive" },
    { name: "Watches", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=150&h=150&fit=crop", link: "/shop?category=Watches" },
    { name: "LUXE", img: "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?q=80&w=150&h=150&fit=crop", link: "/shop?category=Accessories" },
];

const CategoryCircles = () => {
    return (
        <section className="lifestyle-image-nav">
            <div className="image-nav-container">
                {navCategories.map((cat, index) => (
                    <Link to={cat.link} key={index} className="image-nav-link">
                        <div className="image-nav-item">
                            <div className="image-wrapper">
                                <img src={cat.img} alt={cat.name} loading="lazy" />
                            </div>
                            <span className={`nav-name ${cat.name === 'Women' ? 'active-text' : ''}`}>{cat.name}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryCircles;
