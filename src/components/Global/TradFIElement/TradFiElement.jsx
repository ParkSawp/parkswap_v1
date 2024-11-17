'use client';

import React from 'react';
import styles from './TradFiElement.module.css';

export default function TradFiElement({ element }) {

    return (
        <div className={styles['trad-fi-element-container']} >
            <div className={styles['trad-fi-element-logo-container']} style={{ backgroundColor: element.color }} >
                <img src={element.logo} className={styles['trad-fi-element-picture']} />
            </div>
            <div className={styles['trad-fi-element-name']} >
                {element.name}
            </div>
            <div className={styles['trad-fi-element-move-container']} >
                {
                    element.move.value > 0
                    &&
                    <div className={styles['trad-fi-element-move-direction']}>
                        {
                            element.move.up
                                ? <img src='/svg/price-up.svg' alt='' />
                                : <img src='/svg/price-down.svg' alt='' />
                        }
                    </div>
                }
                <div className={styles['trad-fi-element-value']} >
                    { element.move.value} %
                </div>
            </div>
        </div>
    );
}