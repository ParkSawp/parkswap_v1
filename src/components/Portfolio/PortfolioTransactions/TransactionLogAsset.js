import styles from "@/src/components/Portfolio/PortfolioTransactions/portfolio-transactions-list.module.css";
import Amount from "@/src/components/Global/Amount/Amount";
import React from "react";
import {truncateDecimal} from "@/src/config/functions";
import {SwapIcon} from "@/src/components/Icon/Icon";


export default function TransactionLogAsset({ log }) {

    return (
        <>
            <div className={styles['history-transaction-asset-container']}>
                <div className={styles['history-transaction-asset-logo-container']}>
                    <img src={log.asset?.logo_uri ?? '/svg/icons/theter-logo.svg'}
                         alt="Network logo" width={40}/>
                </div>
                <div className={styles['history-transaction-asset-details-container']}>
                    <div
                        className={styles['history-transaction-asset-balance-container'] + ' ' + styles['decrease']}>
                        {
                            log.args.value &&
                            <span className={styles['history-transaction-asset-balance-value']} >
                                {truncateDecimal(parseFloat(log.args.value), 2)}
                            </span>
                        }
                        <span className={styles['history-transaction-asset-symbol']} >{ log.asset?.symbol }</span>
                    </div>
                    <div className={styles['history-transaction-asset-amount-container']}>
                        {/*<Amount amount={150}/>*/}
                    </div>
                </div>
            </div>
            <div className={styles['history-transaction-asset-swap-icon']}>
                <SwapIcon />
            </div>
        </>
    );
}