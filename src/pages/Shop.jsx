import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import PremiumProductCard from '../components/PremiumProductCard';
import DiscoverTriptych from '../components/DiscoverTriptych';
import DiscoverPolaroids from '../components/DiscoverPolaroids';
import DiscoverMagazine from '../components/DiscoverMagazine';
import { products } from '../data/products';
import { Filter, X, ChevronDown } from 'lucide-react';
import '../styles/shop.css';
import '../styles/ajio-promos.css';

const Shop = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category') || 'All';
    const initialSearch = queryParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState(1000);
    const [selectedSize, setSelectedSize] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Sync selected category if URL changes
    useEffect(() => {
        const cat = new URLSearchParams(location.search).get('category') || 'All';
        setSelectedCategory(cat);
    }, [location.search]);

    // Categories to show in the sidebar
    const categoriesList = ['All', 'Women', 'Men', 'Kids', 'Footwear', 'Bags', 'Beauty', 'Home & Living', 'Sale', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];
    const sizes = ['OS'];

    useEffect(() => {
        let result = [...products];

        if (initialSearch) {
            result = result.filter(p => p.name.toLowerCase().includes(initialSearch.toLowerCase()) || p.category.toLowerCase().includes(initialSearch.toLowerCase()));
        }

        if (selectedCategory !== 'All') {
            if (selectedCategory === 'Sale') {
                result = result.filter(p => p.price < 150);
            } else {
                result = result.filter(p => p.name.toLowerCase().includes(selectedCategory.toLowerCase()) || p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
            }
        }

        result = result.filter(p => p.price <= priceRange);

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(result);
    }, [selectedCategory, priceRange, selectedSize, sortBy, initialSearch]);

    return (
        <div className="shop-page-standard" style={{ backgroundColor: '#fff' }}>

            <DiscoverTriptych />
            <DiscoverPolaroids />
            <DiscoverMagazine />

            {/* Standard Ecommerce Scroll Area */}
            <div className="container" id="grid" style={{ paddingTop: '2rem' }}>
                <h2 className="ajio-section-header" style={{ textAlign: 'left', margin: '0 0 2rem' }}>DISCOVER ALL</h2>
            </div>

            {/* Split Layout Container */}
            <div className="ecommerce-layout">

                {/* Left Sidebar Filters */}
                <aside className={`ecommerce-sidebar ${isMobileFilterOpen ? 'open' : ''}`}>
                    <div className="filter-group">
                        <h3 className="filter-title">Categories</h3>
                        <ul className="filter-list">
                            {categoriesList.map((item) => (
                                <li key={item}>
                                    <label className="filter-label">
                                        <input
                                            type="radio"
                                            name="category"
                                            className="filter-checkbox"
                                            checked={selectedCategory === item}
                                            onChange={() => {
                                                setSelectedCategory(item);
                                                navigate(`/shop${item === 'All' ? '' : `?category=${encodeURIComponent(item)}`}`);
                                            }}
                                        />
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Max Price: ₹{priceRange * 80}</h3>
                        <input
                            type="range"
                            className="sidebar-range"
                            min="0"
                            max="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span className="price-display">₹0</span>
                            <span className="price-display">₹80,000</span>
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3 className="filter-title">Size</h3>
                        <div className="sidebar-size-grid">
                            {sizes.map(s => (
                                <button
                                    key={s}
                                    className={`sidebar-size-btn ${selectedSize === s ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(s === selectedSize ? '' : s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="ecommerce-main">
                    {/* Top Action Bar */}
                    <div className="ecommerce-top-bar">
                        <div className="results-count">
                            Showing {filteredProducts.length} results
                        </div>

                        <div className="sort-container">
                            <button
                                className="mobile-filter-btn"
                                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            >
                                {isMobileFilterOpen ? <X size={18} /> : <Filter size={18} />}
                                {isMobileFilterOpen ? 'Close Filters' : 'Filters'}
                            </button>

                            <label className="sort-label">Sort by:</label>
                            <select
                                className="ecommerce-sort-select"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="standard-product-grid">
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <PremiumProductCard product={product} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="no-products-message">
                            <h3>No items found matching your criteria</h3>
                            <button
                                className="clear-btn"
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setPriceRange(1000);
                                    setSelectedSize('');
                                    setSortBy('default');
                                }}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shop;
