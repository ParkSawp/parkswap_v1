'use client';

import React, {useState} from 'react';
import styles from './BridgePathDescriptor.module.css';
import bfstyles from '../../BridgeFormItem/BridgeFormItem.module.css';
import BridgeFormItem from "@/src/components/BridgeFormItem/BridgeFormItem";
import {truncateDecimal} from "@/src/config/functions";

export default function BridgePathDescriptor({ fromToken, token, network, showTitle = true, isTheBest }) {
    const [showDetails, setShowDetails] = useState(false);

    const path = {
        amount: 0,
        details: [
            {
                token,
                network,
                title: 'Kyberswap via LI.FI',
                description: '$0.03 estimated costs'
            },
            {
                logo: '/img/stacks.webp',
                description: [
                    'Swap on Arbitrum via Kyberswap',
                    '10 USDC -> 0.0001121 WBTC'
                ]
            },
            {
                logo: '/img/sushiswap.png',
                title: '1',
                description: 'Bridge from Ethereum to Avalanche via Mayan (MCTP)'
            },
            {
                token,
                network,
                description: 'Each exchange step can contain 1-2 transactions that require a signature.'
            },
        ]
    };

    const toggleShowDetails = () => {
        setShowDetails(!showDetails);
    }

    return (
        <div className={bfstyles['bridge-form-item-container'] +' '+ (isTheBest && styles['bridge-form-item-best-return'])}>
            {showTitle && <div className={bfstyles['bridge-form-item-title']}>Receive</div>}
            {isTheBest && <div className={styles['bridge-form-best-route']}>Best Return</div>}
            <div className={bfstyles['bridge-form-item-token-description']}>
                <div className={bfstyles['bridge-form-item-token']}>
                    <div className={bfstyles['bridge-form-item-token-picture-container']}>
                        {token && <img src={token.logo} alt={token.name}/>}
                        {!token && network && <img src={network.logo} alt={network.name}/>}
                    </div>
                    <div className={bfstyles['bridge-form-item-network-picture-container']}>
                        {network && <img src={network.logo} alt={network.name}/>}
                    </div>
                </div>
                <div className={styles['bridge-form-item-placeholder']}>
                    <div className={styles['bridge-form-amount-details-container']}>
                        <div className={styles['bridge-form-amount-to-receive']}>
                            {truncateDecimal(path.amount, 9)}
                        </div>
                        <div className={styles['bridge-form-provider-container']}>
                            <div className={styles['bridge-form-provider-amount']}>$10.04</div>
                            <div className={styles['bridge-form-provider-performance']}>0.53%</div>
                            <div className={styles['bridge-form-provider-description']}>
                                <div className={styles['bridge-form-provider-picture-container']}>
                                    <img src="/img/sushiswap.png" alt="Sushi Swap"/>
                                </div>
                                <div className={styles['']}>SuchiSwap Agg</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['bridge-form-route-more-handler']} onClick={toggleShowDetails}>
                    <img src="/svg/icons/down_arrow.svg" alt=""/>
                </div>
            </div>
            {
                showDetails &&
                <div className={styles['bridge-form-receive-details-container']}>
                    {
                        path.details?.map(({token, network, logo, title, description}) => (
                            <div className={bfstyles['bridge-form-item-token-description']}>
                                {
                                    (token || network)
                                        ? (
                                            <div className={bfstyles['bridge-form-item-token']}>
                                                <div
                                                    className={bfstyles['bridge-form-item-token-picture-container'] + ' ' + styles['sub-details-icon-container']}>
                                                    {token && <img src={token.logo} alt={token.name}/>}
                                                    {!token && network && <img src={network.logo} alt={network.name}/>}
                                                </div>
                                                <div
                                                    className={bfstyles['bridge-form-item-network-picture-container'] + ' ' + styles['sub-details-network-container']}>
                                                    {network && <img src={network.logo} alt={network.name}/>}
                                                </div>
                                            </div>
                                        )
                                        : <div className={styles['empty-icon-container']}>
                                            <img src={logo} alt=""/>
                                        </div>
                                }
                                <div className={styles['bridge-form-item-placeholder']}>
                                    <div className={styles['bridge-form-item-details-description']}>
                                        {title && <div className={styles['bridge-form-details-title']}>{title}</div>}
                                        {
                                            Array.isArray(description)
                                                ? (
                                                    description.map((descriptionLine) => (
                                                        <div className={styles['bridge-form-details-description']}>{descriptionLine}</div>
                                                    ))
                                                )
                                                : <div className={styles['bridge-form-details-description']}>{description}</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            <div className={styles['bridge-form-receive-performance-container']}>
                <div className={styles['bridge-form-receive']}>
                    <span>1 {fromToken?.symbol}</span>
                    <span> ≈ </span>
                    <span>0.0411171 {token?.symbol}</span>
                </div>
                <div className={styles['bridge-form-receive-gas']}>
                    <div className={styles['bridge-form-receive-icon-container']}>
                        <img src="/img/gas.png" alt=""/>
                    </div>
                    <span>&lt; $0.01</span>
                </div>
                <div className={styles['bridge-form-receive-find-duration']}>
                    <div className={styles['bridge-form-receive-icon-container']}>
                        <img src="/img/clock.png" alt=""/>
                    </div>
                    <span>30s</span>
                </div>
            </div>
        </div>
    );
}