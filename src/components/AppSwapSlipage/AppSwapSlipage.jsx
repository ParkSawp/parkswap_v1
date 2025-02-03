'use client'

import styles from './AppSwapSlipage.module.css';
import React, {useState} from 'react';



export default function AppSwapSlipage({ onSelect }) {

    const [currentSlipage, setCurrentSlipage] = useState(5);
    const slipages = [
        { label: '5%', value: 25 },
        { label: '10%', value: 25 },
        { label: '25%', value: 25 },
        { label: '50%', value: 50 },
        { label: '75%', value: 75 },
        { label: '100%', value: 100 },
    ];


    const onSwapSlideChange = (event) => {
        setCurrentSlipage(parseInt(event.target.value, 10));
    };

    const selectSlipage = (item) => {
        setCurrentSlipage(item.value);
        onSelect && onSelect(item.value);
    };

    return <div className={styles['slipage-wrapper']}>
        <div className={styles['slipage-container']} >
            {
                slipages.map((slip => (
                    <div key={slip.label} className={[styles['slipage-item'] +' '+ ((currentSlipage === slip.value ) ? styles['active'] : '')]} onClick={() => selectSlipage(slip)}>
                        { slip.label }
                    </div>
                )))
            }
        </div>
        <div className={styles['slipage-slider-wrapper']}>
            <span className={styles['slipage-slider-container']}>
                <input type="range" min={0} max={100} value={currentSlipage} onChange={onSwapSlideChange} />
            </span>
            <span className={styles['slipage-slider-current-value']}>
                { currentSlipage } %
            </span>
        </div>
    </div>
}