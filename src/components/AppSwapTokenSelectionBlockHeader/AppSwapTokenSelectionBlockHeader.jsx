'use client'

import styles from "./AppSwapTokenSelectionBlockHeader.module.css";
import React from 'react';
import useRecentToken from "@/src/hooks/useRecentToken";


export default function AppSwapTokenSelectionBlockHeader({ title, onTokenClick }) {
    const { tokens } = useRecentToken();

    return <div className={styles['swap-token-selection-block-header']}>
        <p className={styles["firstBox-title"]}>{title}</p>
        <div className={styles['swap-frequently-tokens-container']}>
            {
                tokens.map((token) => (
                    <div key={token.address} className={styles['swap-frequently-token']} onClick={() => onTokenClick && onTokenClick(token)}>
                        <svg width="18px" height="18px">
                            <image width="18px" height="18px" href={token.logo_uri}/>
                        </svg>
                    </div>
                ))
            }
        </div>
    </div>
}