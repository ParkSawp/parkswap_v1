import styles from "@/src/components/Portfolio/PortfolioTransactions/portfolio-transactions-list.module.css";
import Translate from "@/src/components/Translate/Translate";
import Address from "@/src/components/Global/Address/Address";
import React from "react";


export default function TransactionMoreDetail({ transaction }) {

    return (
        <>
            <div className={styles['history-transaction-more-container']} >
                <div className={styles['history-transaction-more-item']} >
                    <div className={styles['history-transaction-more-item-label']} >
                        <Translate>Transaction Fee</Translate>
                    </div>
                    <div className={styles['history-transaction-more-item-value']} >
                        <span>{transaction.gas.fee} ETH</span>
                    </div>
                </div>
                <div className={styles['history-transaction-more-item']} >
                    <div className={styles['history-transaction-more-item-label']} >
                        <Translate>Gas Price</Translate>
                    </div>
                    <div className={styles['history-transaction-more-item-value']} >
                        <span>{transaction.gas.priceGwei} Gwei</span>
                        <span>{transaction.gas.price} ETH</span>
                    </div>
                </div>
                <div className={styles['history-transaction-more-item']} >
                    <div className={styles['history-transaction-more-item-label']} >
                        <Translate>Transaction Hash</Translate>
                    </div>
                    <div className={styles['history-transaction-more-item-value']} >
                        <Address value={transaction.hash} isHash  network={transaction.network}  />
                    </div>
                </div>
            </div>
        </>
    );
}