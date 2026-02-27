import React from 'react';
import { ChevronRight } from 'lucide-react';
import '../styles/home.css';

const YellowPromoStrip = () => {
    return (
        <div className="lifestyle-yellow-promo">
            <div className="promo-content">
                <span>Season's Fresh Hits</span>
                <ChevronRight size={20} style={{ strokeWidth: 3 }} />
            </div>
        </div>
    );
};

export default YellowPromoStrip;
