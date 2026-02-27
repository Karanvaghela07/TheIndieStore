import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/lifestyle-sections.css';

const LifestyleCategoriesToBag = () => {
    const categories = [
        { name: "Dresses", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&h=400&fit=crop", link: "/shop?category=Dresses" },
        { name: "Tops", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&h=400&fit=crop", link: "/shop?category=Tops" },
        { name: "Bottoms", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&h=400&fit=crop", link: "/shop?category=Bottoms" },
        { name: "Shoes", img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&h=400&fit=crop", link: "/shop?category=Footwear" },
        { name: "Bags", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=400&h=400&fit=crop", link: "/shop?category=Bags" }, // Reused image for now
        { name: "Outerwear", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=400&h=400&fit=crop", link: "/shop?category=Outerwear" }
    ];

    return (
        <section className="lifestyle-section categories-to-bag-section container">
            <div className="section-header-center">
                <h2>Categories to Bag</h2>
                <p>Curated collections for your everyday style</p>
                <div className="header-underline mx-auto mt-2"></div>
            </div>

            <div className="categories-bag-grid">
                {categories.map((cat, idx) => (
                    <Link to={cat.link} key={idx} className="category-bag-card">
                        <div className="ctb-image-wrapper">
                            <img src={cat.img} alt={cat.name} loading="lazy" />
                        </div>
                        <h3 className="ctb-title">{cat.name}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default LifestyleCategoriesToBag;
