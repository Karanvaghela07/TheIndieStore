import React from 'react';
import HeroSlider from '../components/HeroSlider';
import YellowPromoStrip from '../components/AjioBankOffers';
import CategoryCircles from '../components/CategoryCircles';
import BannerStrip from '../components/BannerStrip';
import AjioDealGrid from '../components/AjioDealGrid';
import AjioBrandSpotlight from '../components/AjioBrandSpotlight';
import HorizontalProductScroll from '../components/HorizontalProductScroll';
import LifestyleNewSeason from '../components/LifestyleNewSeason';
import LifestyleBrands from '../components/LifestyleBrands';
import LifestyleChartbusters from '../components/LifestyleChartbusters';
import LifestyleCategoriesToBag from '../components/LifestyleCategoriesToBag';
import LifestyleTrendingStyles from '../components/LifestyleTrendingStyles';
import { products } from '../data/products';
import '../styles/home.css';

const Home = () => {
    // Slicing products for different sections to simulate massive inventory
    const newArrivals = products.slice(0, 8);
    const trendingNow = products.slice(4, 12);
    const bestSellers = products.slice(8, 16);

    return (
        <div className="commercial-home lifestyle-theme">
            {/* 1. CATEGORY NAV */}
            <div className="lifestyle-category-section">
                <CategoryCircles />
            </div>

            {/* 2. BANK OFFERS STRIP */}
            <div className="lifestyle-strip-wrapper">
                <YellowPromoStrip />
            </div>

            {/* 3. HERO SLIDER */}
            <HeroSlider />

            {/* 4. NEW SEASON (Previously Deals Grid) */}
            <LifestyleNewSeason />

            {/* 5. FEATURED BRANDS */}
            <LifestyleBrands />

            {/* 6. BANNER STRIP (Marquee) */}
            <BannerStrip />

            {/* 7. CATEGORIES TO BAG */}
            <LifestyleCategoriesToBag />

            {/* 8. TRENDING STYLES */}
            <LifestyleTrendingStyles />

            {/* 9. CHARTBUSTERS */}
            <LifestyleChartbusters />

            {/* 8. SHOP BY COLLECTION BANNER */}
            <section className="lifestyle-banner-mid container">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2670" alt="Collection" loading="lazy" />
                <div className="lifestyle-banner-content">
                    <h3>THE DENIM EDIT</h3>
                    <p>Explore the latest trends in denim.</p>
                    <button className="lifestyle-btn">Explore Collection</button>
                </div>
            </section>

            {/* 9. HORIZONTAL SCROLL: TRENDING NOW */}
            <div className="lifestyle-product-scroll container">
                <HorizontalProductScroll
                    title="STEAL DEALS"
                    products={trendingNow}
                />
            </div>

            {/* 10. HORIZONTAL SCROLL: BEST SELLERS */}
            <div className="lifestyle-product-scroll container">
                <HorizontalProductScroll
                    title="MOST LOVED"
                    products={bestSellers}
                />
            </div>

            {/* 11. MEMBERSHIP IMPACT BANNER */}
            <section className="lifestyle-banner-mid membership-banner container">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670" alt="Members" loading="lazy" />
                <div className="lifestyle-banner-content right-aligned">
                    <h3>UNLOCK EXTRA 10% OFF</h3>
                    <p>Join the club for member-only pricing and free delivery on all orders.</p>
                    <a href="/account" className="lifestyle-btn solid">Join exclusive club</a>
                </div>
            </section>

        </div>
    );
};

export default Home;
