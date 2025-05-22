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
                        <Translate>Network Fee</Translate>
                    </div>
                    <div className={styles['history-transaction-more-item-value']} >
                        {transaction.gas.price} ETH ($0.00)
                    </div>
                </div>
                <div className={styles['history-transaction-more-item']} >
                    <div className={styles['history-transaction-more-item-label']} >
                        <Translate>Rate</Translate>
                    </div>
                    <div className={styles['history-transaction-more-item-value']} >
                        1 ETH = 1,632.653 USDC
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