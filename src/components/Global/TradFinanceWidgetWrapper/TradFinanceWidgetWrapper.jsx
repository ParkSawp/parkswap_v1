'use client';

import React from 'react';
import styles from './TradFinanceWidgetWrapper.module.css';

export default function TradFinanceWidgetWrapper({ title, showAll, children }) {

    return (
        <div className={styles['trad-finance-widget']}>
            <div className={styles['trad-finance-widget-header']}>
                <div className={styles['trad-finance-widget-title']}>
                    {title}
                </div>
                {
                    showAll
                        ? <div className={styles['trad-finance-widget-show-all']}>Tout afficher</div>
                        : <div></div>
                }
            </div>
            <div className={styles['trad-finance-widget-container']}>
                {children}
            </div>
        </div>
    );
}