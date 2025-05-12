import React from 'react';
import styles from "./portfolio-wallet.module.css";
import Translate from "@/src/components/Translate/Translate";
import Amount from "@/src/components/Global/Amount/Amount";
import {ChartIcon} from "@/src/components/Icon/Icon";
import {useTranslation} from "react-i18next";
import dynamic from "next/dynamic";

const PortfolioPerformanceChart = dynamic(() => import("@/src/components/Portfolio/PortfolioPerformanceChart/PortfolioPerformanceChart"), { ssr: false });

export default function PortfolioWallet({ }) {

    const { t } = useTranslation();

    const tokens = [
        {
            name: 'ETH',
            icon: '/svg/icons/eth_icon.svg',
            type: 'native',
            balance: 22,
            price: 667
        },
        {
            name: 'USDT',
            icon: '/svg/icons/pepe-pepe-logo.svg',
            type: 'stable',
            balance: 1800,
            price: 1
        },
        {
            name: 'USDC',
            icon: '/svg/icons/ltc-logo.svg',
            type: 'stable',
            balance: 2700,
            price: 1
        },
        {
            name: 'UNI',
            icon: '/svg/icons/dai-logo.svg',
            type: 'token',
            balance: 550,
            price: 12
        },
        {
            name: 'SOL',
            icon: '/svg/icons/sol-logo.svg',
            type: 'token',
            balance: 23,
            price: 125
        },
        {
            name: 'USDT',
            icon: '/svg/icons/theter-logo.svg',
            type: 'token',
            balance: 8230,
            price: 1
        }
    ];

    return (
        <>
            <div className={styles["portfolio-wallet-container-body"]}>
                <div class={styles['portfolio-section']} >
                    <div className={styles['portfolio-wallet-section-title']}><Translate>Performance</Translate></div>
                    <PortfolioPerformanceChart />
                </div>
                <div class={styles['portfolio-section']} >
                    <div className={styles['portfolio-wallet-section-title']}><Translate>Performance</Translate></div>
                    <div className={styles["portfolio-wallet-stats-container-body"]}>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total
                                Value</Translate>
                            </div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={2230240}/>
                            </div>
                        </div>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Native
                                Value</Translate></div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={1230240}/>
                            </div>
                        </div>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Stable
                                Value</Translate></div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={230240}/>
                            </div>
                        </div>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Token
                                Value</Translate></div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={730240}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class={styles['portfolio-section']} >
                    <div className={styles['portfolio-wallet-section-title']}><Translate>Assets</Translate></div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col"><Translate>Token</Translate></th>
                                <th scope="col"><Translate>Type</Translate></th>
                                <th scope="col"><Translate>Price</Translate></th>
                                <th scope="col"><Translate>Balance</Translate></th>
                                <th scope="col"><Translate>USD Value</Translate></th>
                                <th scope="col"><Translate>Options</Translate></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            tokens.map((token, index) => (
                                <tr key={index} className={styles["token-row"]}>
                                    <td scope="row">
                                        <div className={styles['token-details-container']}>
                                            <div className={styles['token-image-container']}>
                                                <img src={token.icon} alt="Token Logo" width={25}
                                                     className={styles['token-image']}/>
                                                <span className={styles['token-network-image-container']}>
                                                    <img src="/svg/icons/base-logo.svg" alt="Token Logo" width={25}/>
                                                </span>
                                            </div>
                                            <span>ETH</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={styles['token-type'] + ' ' + styles['type-' + token.type]}>Native</span>
                                    </td>
                                    <td><Amount amount={token.price}/></td>
                                    <td>{token.balance}</td>
                                    <td><Amount amount={token.price * token.balance}/></td>
                                    <td>
                                        <button title={t('Transactions')}>
                                            <ChartIcon/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};