import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import '../styles/lifestyle-sections.css';

const LifestyleChartbusters = () => {
    const hits = [
        { brand: "Libas", offer: "Flat 50%", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&h=600&fit=crop" },
        { brand: "JACK&JONES", offer: "2 at 40%", img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=400&h=600&fit=crop" },
        { brand: "W", offer: "40% off", img: "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=400&h=600&fit=crop" },
        { brand: "celio*", offer: "Flat 50%", img: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=400&h=600&fit=crop" },
        { brand: "aurelia", offer: "40% off", img: "https://images.unsplash.com/photo-1550614000-4b95d466ee1c?q=80&w=400&h=600&fit=crop" },
        { brand: "AND", offer: "50% off", img: "https://images.unsplash.com/photo-1515347619362-e67c82fb658d?q=80&w=400&h=600&fit=crop" }
    ];

    return (
        <section className="lifestyle-section chartbusters-section container">
            <div className="section-header-left">
                <h2>Chartbusters</h2>
                <div className="header-underline"></div>
            </div>

            <div className="chartbusters-scroll-container">
                <div className="chartbusters-track">
                    {hits.map((hit, idx) => (
                        <Link to={`/discover`} key={idx} className="chartbuster-card-wrapper">
                            <div className="chartbuster-card">
                                <img src={hit.img} alt={hit.brand} />
                                <div className="chartbuster-gradient"></div>
                                <div className="chartbuster-brand">
                                    <span className="cb-brand-name">{hit.brand}</span>
                                </div>
                            </div>
                            <div className="chartbuster-offer">
                                {hit.offer}
                            </div>
                        </Link>
                    ))}
                </div>
                <button className="nav-arrow right-arrow floating"><ChevronRight /></button>
            </div>
        </section>
    );
};

export default LifestyleChartbusters;
