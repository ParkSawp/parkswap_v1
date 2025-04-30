import React from 'react';
import styles from "./portfolio-wallet.module.css";
import Translate from "@/src/components/Translate/Translate";
import Amount from "@/src/components/Global/Amount/Amount";
import {ChartIcon} from "@/src/components/Icon/Icon";
import {useTranslation} from "react-i18next";

export default function PortfolioWallet({ }) {

    const { t } = useTranslation();

    const tokens = [
        {
            name: 'ETH',
            icon: '',
            type: 'native',
            balance: 22,
            price: 667
        },
        {
            name: 'USDT',
            icon: '',
            type: 'stable',
            balance: 1800,
            price: 1
        },
        {
            name: 'USDC',
            icon: '',
            type: 'stable',
            balance: 2700,
            price: 1
        },
        {
            name: 'UNI',
            icon: '',
            type: 'token',
            balance: 550,
            price: 12
        }
    ];

    return (
        <>
            <div className={styles["portfolio-wallet-container-body"]}>
                <div className={styles["portfolio-wallet-stats-container-body"]}>
                    <div className={styles["portfolio-wallet-stats-item"]}>
                        <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Value</Translate></div>
                        <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={2230240}/></div>
                    </div>
                    <div className={styles["portfolio-wallet-stats-item"]}>
                        <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Native Value</Translate></div>
                        <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={1230240}/></div>
                    </div>
                    <div className={styles["portfolio-wallet-stats-item"]}>
                        <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Stable Value</Translate></div>
                        <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={230240}/></div>
                    </div>
                    <div className={styles["portfolio-wallet-stats-item"]}>
                        <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Token Value</Translate></div>
                        <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={730240}/></div>
                    </div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th scope="col"><Translate>Token</Translate></th>
                        <th scope="col"><Translate>Type</Translate></th>
                        <th scope="col"><Translate>Balance</Translate></th>
                        <th scope="col"><Translate>Price</Translate></th>
                            <th scope="col"><Translate>USD Value</Translate></th>
                            <th scope="col"><Translate>Options</Translate></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tokens.map((token, index) => (
                                <tr key={index} className={styles["token-row"]} >
                                    <td scope="row">
                                        <div className={styles['token-details-container']}>
                                            <img src="/svg/icons/base-logo.svg" alt="Token Logo" width={25}/>
                                            <span>ETH</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span
                                            className={styles['token-type'] + ' ' + styles['type-' + token.type]}>Native</span>
                                    </td>
                                    <td><Amount amount={token.price} /></td>
                                    <td>{token.balance}</td>
                                    <td><Amount amount={token.price * token.balance} /></td>
                                    <td>
                                        <button title={t('Transactions')} >
                                            <ChartIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
};