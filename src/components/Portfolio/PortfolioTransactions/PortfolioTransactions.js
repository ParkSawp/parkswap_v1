import React, {useEffect, useMemo, useState} from 'react';
import styles from './portfolio-transactions.module.css';
import PortfolioTransactionsList from "@/src/components/Portfolio/PortfolioTransactions/PortfolioTransactionsList";
import {CloseIcon, LoadingIcon, SearchIcon} from "@/src/components/Icon/Icon";
import {useTranslation} from "react-i18next";
import Translate from "@/src/components/Translate/Translate";
import useGetTransactions from "@/src/hooks/useGetTransactions";

export default function PortfolioTransactions({ address, lastUpdate }) {

    const { t, i18n } = useTranslation();
    const { data: transactions, isLoading: fetchTransactionLoading, fetchTransactions } = useGetTransactions();

    const [isLoading, setIsLoading] = useState(false);
    const [showMoreHash, setShowMoreHash] = useState(null);
    const [filters, setFilters] = useState({asset: 'all', transactions: [], searchKey: ''});

    const transactionTypes = useMemo(() => {
        return [
            { value: 'trade', label: t('Trade') },
            { value: 'mint', label: t('Mint') },
            { value: 'receive', label: t('Receive') },
            { value: 'send', label: t('Send') },
            { value: 'others', label: t('Others') },
        ]
    }, [i18n.language]);
    const assetTypes = useMemo(() => {
        return [
            { value: 'all', label: t('All assets') },
            { value: 'tokens', label: t('Tokens') },
            { value: 'nft', label: t('NFTs') },
        ]
    },[i18n.language]);

    const find = () => setIsLoading(true);
    const setFilterAsset = (assetType) => setFilters({ ...filters, asset: assetType});
    const toggleFilterTransaction = (event, transactionType) => {
        if(!event.target.checked) {
            setFilters({
                ...filters,
                transactions: filters.transactions.filter((item) => item !== transactionType)
            });
            return;
        }
        setFilters({
            ...filters,
            transactions: [...filters.transactions, transactionType]
        });
    };

    useEffect(() => {
        fetchTransactions(address)
    }, [address, lastUpdate, fetchTransactions]);

    return (
        <>
            <div className={styles['history-filters-container']}>
                <div className={styles['history-filters']}>
                    <div className={styles['history-section-filter-container']}>
                        <div className={styles['history-filter-title']}>
                            <Translate>Transactions</Translate>
                        </div>
                        <div className={styles['history-filter-body']}>
                            {
                                transactionTypes.map((transactionType) => (
                                    <label
                                           key={transactionType.value}
                                           className={styles['history-filter-item']+' '+(filters.transactions.includes(transactionType.value) ? styles['active'] : '')} >
                                        <input type="checkbox"
                                               readOnly
                                               checked={filters.transactions.includes(transactionType.value)}
                                               value={transactionType.value}
                                               onChange={(event) => toggleFilterTransaction(event, transactionType.value)}  />
                                        <span>{transactionType.label}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles['history-section-filter-container']}>
                        <div className={styles['history-filter-title']}>
                            <Translate>Assets</Translate>
                        </div>
                        <div className={styles['history-filter-body']}>
                            {
                                assetTypes.map((assetType) => (
                                    <label onClick={() => setFilterAsset(assetType.value)}
                                           key={assetType.value}
                                           className={styles['history-filter-item']+' '+(filters.asset === assetType.value ? styles['active'] : '')}>
                                        <input type="radio" readOnly checked={filters.asset === assetType.value} name='history-filter-asset-type' value={assetType.value}/>
                                        <span>{assetType.label}</span>
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    {/*<div className={styles['history-spam-filter-container']}>*/}
                    {/*    Hide Span*/}
                    {/*</div>*/}
                </div>
                <div className={styles['history-section-filter-container']} >
                    <div className={styles['history-filter-title']}>
                        <Translate>Filter by Address or name</Translate>
                    </div>
                    <div className={styles['history-filter-body']}>
                        <div className={styles['history-search-filter-container']}>
                            <input type="text" placeholder={t('Filter by address or name')}/>
                            <div className={styles['history-search-options-container']}>
                                {
                                    isLoading
                                        ? <LoadingIcon size={20}/>
                                        : <button onClick={find}><SearchIcon/></button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['history-transactions-body-container']}>
                {
                    transactions.map((transactionsByDate, index) => (
                        <div key={transactionsByDate.date} className={styles['history-transactions-date-container']} >
                            <div className={styles['history-transactions-date']} >{transactionsByDate.date}</div>
                            <PortfolioTransactionsList transactions={transactionsByDate.transactions} showMoreHash={showMoreHash} setShowMoreHash={setShowMoreHash} />
                        </div>
                    ))
                }
            </div>
        </>
    );
}