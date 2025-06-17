import React, {useEffect, useState} from 'react';
import styles from "./portfolio-wallet.module.css";
import Translate from "@/src/components/Translate/Translate";
import Amount from "@/src/components/Global/Amount/Amount";
import {ChartIcon, LoadingIcon} from "@/src/components/Icon/Icon";
import {useTranslation} from "react-i18next";
import dynamic from "next/dynamic";
import useGetPortfolio from "@/src/hooks/useGetPortfolio";
import {PORTFOLIO} from "@/src/config/constants";
import NetworkTokenList from "@/src/components/Portfolio/PortfolioWallet/NetworkTokenList";
import WalletNetwork from "@/src/components/Portfolio/PortfolioWallet/WalletNetwork";

const PortfolioPerformanceChart = dynamic(() => import("@/src/components/Portfolio/PortfolioPerformanceChart/PortfolioPerformanceChart"), { ssr: false });


export default function PortfolioWallet({ tokens: allTokens, chains, amount }) {

    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        network: 0,
    });

    if(!allTokens) {
        return (
            <>
                <div className={styles["portfolio-wallet-loading-container"]}>
                    <LoadingIcon />
                </div>
            </>
        );
    }
    const changeNetworkFilter = (networkId) => {
        setFilters({...filters, network: networkId || 0 })
    }
    const amounts = { total: 0, native: 0, stablecoin: 0, token: 0 };

    const tokens = allTokens.filter((token) => {
        return (filters.network === 0 || filters.network === token.chainId);
    });

    tokens.forEach((token) => {
        amounts.total += token.price.total;
        if(token.is.native) {
            amounts.native += token.price.total;
            return;
        }
        if(token.is.stablecoin) {
            amounts.stablecoin += token.price.total;
            return;
        }
        amounts.token += token.price.total;
    })


    return (
        <>
            <div className={styles["portfolio-wallet-container-body"]}>
                {/*<div className={styles['portfolio-section']} >*/}
                {/*    <div className={styles['portfolio-wallet-section-title']}><Translate>Performance</Translate></div>*/}
                {/*    <PortfolioPerformanceChart />*/}
                {/*</div>*/}

                <div className={styles['portfolio-network-section']}>
                    <div className={styles['portfolio-wallet-section-title']}><Translate>Networks</Translate></div>
                    <div className={styles['portfolio-network-section-available']}>
                        <WalletNetwork chain={{ name: 'All networks', id: 0 }} amount={amount.total} active={filters.network === 0} onClick={changeNetworkFilter} />
                        {
                            chains.map((chain) => <WalletNetwork key={chain.id} chain={chain} tokens={allTokens} active={filters.network === chain.id} onClick={changeNetworkFilter} />)
                        }
                    </div>
                </div>
                <div className={styles['portfolio-section']} >
                    <div className={styles['portfolio-wallet-section-title']}><Translate>Details</Translate></div>
                    <div className={styles["portfolio-wallet-stats-container-body"]}>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total
                                Value</Translate>
                            </div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={amounts.total}/>
                            </div>
                        </div>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Native
                                Value</Translate></div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={amounts.native}/>
                            </div>
                        </div>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Stable
                                Value</Translate></div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={amounts.stablecoin}/>
                            </div>
                        </div>
                        <div className={styles["portfolio-wallet-stats-item"]}>
                            <div className={styles["portfolio-wallet-stats-item-title"]}><Translate>Total Token
                                Value</Translate></div>
                            <div className={styles["portfolio-wallet-stats-item-amount"]}><Amount amount={amounts.token}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['portfolio-section']} >
                    <div className={styles['portfolio-wallet-section-title']}><Translate>Assets</Translate></div>
                    <table>
                        <thead>
                            <tr className={styles['portfolio-wallet-table-header']}>
                                <th scope="col"><Translate>Token</Translate></th>
                                <th scope="col"><Translate>Type</Translate></th>
                                <th scope="col"><Translate>Balance</Translate></th>
                                <th scope="col"><Translate>Price</Translate></th>
                                <th scope="col"><Translate>USD Value</Translate></th>
                                <th scope="col" className={styles['portfolio-wallet-table-header-options']}><Translate>Options</Translate></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tokens.length === 0
                                ? <tr>
                                        <td colSpan="6" >
                                            <div className={styles['portfolio-wallet-table-empty']} >
                                                <Translate>No tokens</Translate>
                                            </div>
                                        </td>
                                </tr>
                                : <NetworkTokenList tokens={tokens} filters={filters} />
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
};