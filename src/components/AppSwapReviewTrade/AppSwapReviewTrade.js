'use client'

import React, {useEffect, useRef, useState} from 'react';
import useGetQuote from "@/src/hooks/useGetQuote";
import useAppSettings from "@/src/hooks/useAppSettings";
import {useAccount} from "wagmi";
import {formatEther, formatUnits, parseUnits} from "ethers";


import styles from './AppSwapReviewTrade.module.css';
import SwapResumeModal from "@/src/components/Modal/SwapResumeModal/SwapResumeModal";
import customConnectStyles from "@/src/components/Global/CustomConnectButton/CustomConnectButton.module.css";

export default function AppSwapReviewTrade({  buyToken, sellToken, buyTokenAmount, sellTokenAmount }) {
    const { address } = useAccount();
    const { quote, loading, getQuote } = useGetQuote();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const appSettings = useAppSettings();

    useEffect(() => {

        const params = {
            sellAddress: sellToken.address,
            buyAddress: buyToken.address,
            amount: parseUnits(sellTokenAmount.toString(), sellToken.decimals),
            chainId: appSettings.selectedChainId,
            slippage: appSettings.slippage,
            taker: address
        };
        getQuote(params);
    }, [address, buyToken.address, sellToken.address, sellTokenAmount ]);

    const startSwap = () => {
        setIsOpenModal(true);
    };
    const cancelSwap = () => {
        setIsOpenModal(false);
    };

    if(!quote || loading) {
        return (
            <>
                <div className={styles['best-price-details-container']}>
                    <div className={styles['best-price-loading-container']}>
                        <img src="/img/w-loading.gif" alt="Loading" height={25} />
                        Loading for the best quote...
                    </div>
                </div>
            </>
        );
    }

    if(quote.name === 'SWAP_VALIDATION_FAILED') {
        return (
            <>
                <div className={customConnectStyles['select-token-alert'] + ' ' + customConnectStyles['alert-danger']}>
                    {quote.message}
                </div>
            </>
        );
    }

    return (
        <>
            {isOpenModal &&
                <SwapResumeModal
                    onClose={cancelSwap}
                    quote={quote}
                    sellToken={sellToken}
                    buyToken={buyToken}
                    buyTokenAmount={buyTokenAmount}
                    sellTokenAmount={sellTokenAmount}
                />
            }
            <div>
                <div className={styles['best-price-details-container']} >
                    <div className={styles['best-price-details-resume-container']}>
                        <div className={styles['best-price-detail-tokens-container']}>
                            <div className={styles['best-price-detail-token-sell']} >
                                <img src={sellToken.logo_uri} alt={sellToken.name} height={15} />
                                <span>{sellToken.symbol}</span>
                            </div>
                            <div className={styles['best-price-detail-direction-logo']}>
                                <img src="/img/exchange.png" alt="Exchange" height={15} />
                            </div>
                            <div className={styles['best-price-detail-token-buy']}>
                                <img src={buyToken.logo_uri} alt={buyToken.name} height={15} />
                                <span>{buyToken.symbol}</span>
                            </div>
                        </div>
                        <div className={styles['best-price-gas-container']}>
                            {
                                quote.totalNetworkFee
                                &&
                                (
                                    <>
                                        <strong>Fee :</strong> {parseFloat(formatEther(quote?.totalNetworkFee)).toFixed(8)}
                                        <strong>ETH</strong>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <button className={`${customConnectStyles["connect-wallet-btn"]} ${customConnectStyles["swap-wallet-btn"]}`} onClick={startSwap} >Swap</button>
            </div>
        </>
    );
}