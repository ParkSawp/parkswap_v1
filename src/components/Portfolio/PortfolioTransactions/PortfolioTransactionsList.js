import React, { useState } from 'react';
import styles from "@/src/components/Portfolio/PortfolioTransactions/portfolio-transactions-list.module.css";
import {AngleRightIcon, SendIcon} from "@/src/components/Icon/Icon";
import Amount from "@/src/components/Global/Amount/Amount";
import Translate from "@/src/components/Translate/Translate";
import { motion } from "framer-motion";
import Address from "@/src/components/Global/Address/Address";
import TransactionToDetail from "@/src/components/Portfolio/PortfolioTransactions/TransactionToDetail";
import {Trans} from "react-i18next";
import TransactionMoreDetail from "@/src/components/Portfolio/PortfolioTransactions/TransactionMoreDetail";
import TransactionLogAsset from "@/src/components/Portfolio/PortfolioTransactions/TransactionLogAsset";
import log from "eslint-plugin-react/lib/util/log";
import PortfolioTransactionTypeIcon from "@/src/components/Portfolio/PortfolioTransactions/PortfolioTransactionTypeIcon";


export default function PortfolioTransactionsList({ transactions = [], showMoreHash, setShowMoreHash }) {

    const showMore = (hash) => {
        setShowMoreHash((hash === showMoreHash) ? null : hash);
    };


    return (
        <div  className={styles['history-transactions-list-container']} >
            {
                transactions.map((transaction, index) => (
                    <div onClick={() => console.log(transaction)} key={transaction.hash} className={styles['history-transaction-container']+' '+((showMoreHash === transaction.hash) ? styles['active'] : '')}>
                        <div key={transaction.hash} onClick={() => showMore(transaction.hash)} className={styles['history-transaction-row-container']}>
                            <div className={styles['history-transaction-type-container']}>
                                <div className={styles['history-transaction-type']}>
                                    <div className={styles['history-transaction-type-operation']+' '+styles['is-'+transaction.type]}>
                                        <PortfolioTransactionTypeIcon transaction={transaction} />
                                        <div className={styles['history-transaction-type-network']}>
                                            <img src={'/img/chains/'+  transaction.network.id+ '.svg'} alt="Network logo" width={15}/>
                                        </div>
                                    </div>
                                    <div className={styles['history-transaction-type-details']}>
                                        <div className={styles['history-transaction-type-name']}>{transaction.type}</div>
                                        <div className={styles['history-transaction-type-time']}>{transaction.time}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['history-transaction-assets-container']}>
                                {
                                   transaction.mainLogs.map((log, index) => <TransactionLogAsset key={index} log={log} />)
                                }
                            </div>
                            <div className={styles['history-transaction-second-part-container']}>
                                <TransactionToDetail transaction={transaction} />
                            </div>
                        </div>
                        {
                            (showMoreHash === transaction.hash) ? <TransactionMoreDetail transaction={transaction} /> : null
                        }
                    </div>
                ))
            }
        </div>
    )
}