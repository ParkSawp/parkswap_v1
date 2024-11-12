'use client'

import styles from './AppSwapSlipage.module.css';
import React, {useState} from 'react';


export default function AppSwapSlipage({ onSelect }) {

    const [currentSlipage, setCurrentSlipage] = useState(0);
    const slipages = [
        { label: '25%', value: .25 },
        { label: '50%', value: .50 },
        { label: '75%', value: .75 },
        { label: '100%', value: 1 },
    ];

    const selectSlipage = (item) => {
        setCurrentSlipage(item.value);
        onSelect && onSelect(item.value);
    };

    return <div className={styles['slipage-container']}>
        {
            slipages.map((slip => (
                <div key={slip.label} className={[styles['slipage-item'] +' '+ ((currentSlipage === slip.value ) ? styles['active'] : '')]} onClick={() => selectSlipage(slip)}>
                    { slip.label }
                </div>
            )))
        }
    </div>
}