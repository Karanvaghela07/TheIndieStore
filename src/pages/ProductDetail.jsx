import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Heart, Truck, RefreshCcw, ShieldCheck, Star, MapPin, CheckCircle, ChevronRight, Lock } from 'lucide-react';
import Footer from '../components/Footer';
import '../styles/product-detail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const { addToCart, setCartOpen } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [selectedSize, setSelectedSize] = useState('M');
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const found = products.find(p => p.id === parseInt(id));
        if (found) {
            setProduct(found);
        } else {
            navigate('/shop'); // Redirect if product ID doesn't exist
        }
        window.scrollTo(0, 0);
    }, [id, navigate]);

    const handleBuyNow = () => {
        addToCart({ ...product, selectedSize });
        setCartOpen(false); // don't keep the drawer open over the checkout page
        navigate('/checkout');
    };

    if (!product) return <div className="loading">Loading...</div>;

    const inWishlist = isInWishlist(product.id);

    // Create a mock gallery array since we only have image1/image2 in data
    const gallery = [product.image1, product.image2, product.image1, product.image2].filter(Boolean);

    return (
        <div className="pdp-wrapper" style={{ backgroundColor: '#fff' }}>
            {/* Breadcrumbs */}
            <div className="pdp-breadcrumbs">
                <span>Home</span> <ChevronRight size={14} /> <span>Shop</span> <ChevronRight size={14} /> <span>{product.category}</span> <ChevronRight size={14} /> <span className="pdp-crumb-active">{product.name}</span>
            </div>

            {/* Core Layout: 3 Columns for Amazon/Flipkart specific structure */}
            <div className="pdp-core-layout">

                {/* COLUMN 1: Image Gallery */}
                <div className="pdp-left-col">
                    <div className="pdp-thumbnails">
                        {gallery.map((img, idx) => (
                            <button
                                key={idx}
                                className={`pdp-thumb-btn ${activeImage === idx ? 'active' : ''}`}
                                onMouseEnter={() => setActiveImage(idx)}
                                onClick={() => setActiveImage(idx)}
                            >
                                <img src={img} alt={`Thumbnail ${idx + 1}`} />
                            </button>
                        ))}
                    </div>
                    <div className="pdp-gallery-main">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage}
                                src={gallery[activeImage]}
                                alt={product.name}
                                className="pdp-main-img"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            />
                        </AnimatePresence>
                    </div>
                </div>

                {/* COLUMN 2: Product Info & Details (Center) */}
                <div className="pdp-center-col">
                    <div className="pdp-brand-link">Visit The Indie Store</div>
                    <h1 className="pdp-title">{product.name}</h1>

                    <div className="pdp-rating-block">
                        <div className="pdp-stars">
                            {[1, 2, 3, 4].map(s => <Star key={s} size={16} fill="#FF9900" color="#FF9900" />)}
                            <Star size={16} fill="none" color="#FF9900" />
                        </div>
                        <span className="pdp-rating-count">4.1 <span>|</span> <a href="#reviews">1,824 ratings</a></span>
                    </div>

                    <div className="pdp-divider"></div>

                    <div className="pdp-price-zone">
                        <div className="pdp-price-badge">-33%</div>
                        <div className="pdp-price-current">
                            <span className="currency">₹</span>{(product.price * 80).toLocaleString()}
                        </div>
                    </div>
                    <div className="pdp-price-mrp">
                        M.R.P.: <span className="strikethrough">₹{(product.price * 120).toLocaleString()}</span>
                    </div>
                    <div className="pdp-taxes-note">Inclusive of all taxes</div>

                    {/* EMI / Bank Offers */}
                    <div className="pdp-emi-note">
                        <b>EMI</b> starts at ₹249. No Cost EMI available <a href="#emi">EMI options</a>
                    </div>

                    <div className="pdp-divider"></div>

                    {/* Offers Cards Horizontal Scroll */}
                    <div className="pdp-offers-container">
                        <div className="pdp-offer-card">
                            <div className="pdp-offer-title">Bank Offer</div>
                            <div className="pdp-offer-desc">Upto ₹1,500 Discount on HDFC Credit Cards.</div>
                            <a href="#offers">1 offer &gt;</a>
                        </div>
                        <div className="pdp-offer-card">
                            <div className="pdp-offer-title">Partner Offers</div>
                            <div className="pdp-offer-desc">Get GST invoice and save up to 28% on business.</div>
                            <a href="#offers">2 offers &gt;</a>
                        </div>
                    </div>

                    <div className="pdp-divider"></div>

                    {/* Trust Badges */}
                    <div className="pdp-trust-row">
                        <div className="pdp-trust-item">
                            <div className="trust-icon"><RefreshCcw size={24} color="#007185" /></div>
                            <span>14 days Returnable</span>
                        </div>
                        <div className="pdp-trust-item">
                            <div className="trust-icon"><Truck size={24} color="#007185" /></div>
                            <span>Free Delivery</span>
                        </div>
                        <div className="pdp-trust-item">
                            <div className="trust-icon"><ShieldCheck size={24} color="#007185" /></div>
                            <span>Top Brand</span>
                        </div>
                        <div className="pdp-trust-item">
                            <div className="trust-icon"><Lock size={24} color="#007185" /></div>
                            <span>Secure transaction</span>
                        </div>
                    </div>

                    <div className="pdp-divider"></div>

                    {/* Product Specs */}
                    <ul className="pdp-bullets">
                        <li><b>Material Composition:</b> 100% Premium Heavyweight Cotton</li>
                        <li><b>Fit Type:</b> Relaxed Modern Fit</li>
                        <li><b>Care Instructions:</b> Machine Wash Cold, Tumble Dry Low</li>
                        <li><b>Country of Origin:</b> India</li>
                        <li>Elevate your street style with this staple piece designed for everyday comfort.</li>
                    </ul>
                </div>

                {/* COLUMN 3: The Buy Box Card (Right) */}
                <div className="pdp-right-col">
                    <div className="pdp-buy-box">
                        <div className="pdp-bb-price">
                            <span className="currency">₹</span>{(product.price * 80).toLocaleString()}
                        </div>

                        <div className="pdp-bb-delivery">
                            <a href="#delivery">FREE delivery</a> <b>Wednesday, 24 April.</b> Order within 20 hrs 30 mins. <a href="#details">Details</a>
                        </div>

                        <div className="pdp-bb-location">
                            <MapPin size={16} /> <span>Deliver to <b>Mumbai 400001</b></span>
                        </div>

                        <h3 className="pdp-bb-stock">In stock</h3>

                        <div className="pdp-bb-seller">
                            Ships from <span>The Indie Store</span><br />
                            Sold by <span>The Indie Store Retail</span>
                        </div>

                        {/* Size Selection inside Buy Box for Flipkart style */}
                        <div className="pdp-bb-sizes">
                            <div className="pdp-bb-size-label">Select Size</div>
                            <div className="pdp-size-grid">
                                {['S', 'M', 'L', 'XL'].map(size => (
                                    <button
                                        key={size}
                                        className={`pdp-size-select ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pdp-bb-actions">
                            <button className="pdp-btn-flipkart-cart" onClick={() => addToCart({ ...product, selectedSize })}>
                                Add to Cart
                            </button>
                            <button className="pdp-btn-amazon-buy" onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </div>

                        <div className="pdp-bb-secure">
                            <Lock size={14} color="#999" /> Secure transaction
                        </div>

                        <button className="pdp-btn-wishlist-text" onClick={() => toggleWishlist(product)}>
                            <Heart size={16} fill={inWishlist ? "#444" : "none"} /> Add to Wish List
                        </button>
                    </div>
                </div>

            </div>

            <div className="pdp-divider-full"></div>

            {/* Related Products */}
            <div className="pdp-related-wrapper">
                <h2 className="pdp-related-title">Products related to this item</h2>
                <div className="product-grid">
                    {products
                        .filter(p => p.id !== product?.id && p.category === product?.category)
                        .slice(0, 4)
                        .map(related => (
                            <ProductCard key={related.id} product={related} />
                        ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
