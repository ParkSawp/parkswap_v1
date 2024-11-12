'use client'

import styles from "./AppSwapTokenSelectionBlockHeader.module.css";
import { motion, useAnimation } from "framer-motion";
import React, {useEffect, useState} from 'react';
import axios from "axios";


export default function AppSwapTokenSelectionBlockHeader({ title, onTokenClick }) {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        axios.get('/api/tokens')
            .then(response => {
                setTokens(response.data.splice(0, 4));
            })
            .catch(error => {
                console.error("There was an error fetching the tokens!", error);
            });
    }, []);

    return <div className={styles['swap-token-selection-block-header']}>
        <p className={styles["firstBox-title"]}>{title}</p>
        <div className={styles['swap-frequently-tokens-container']}>
            {
                tokens.map((token) => (
                    <div key={token.name} className={styles['swap-frequently-token']} onClick={() => onTokenClick && onTokenClick(token)}>
                        <svg width="18px" height="18px">
                            <image width="18px" height="18px" href={token.logo}/>
                        </svg>
                    </div>
                ))
            }
        </div>
    </div>
}