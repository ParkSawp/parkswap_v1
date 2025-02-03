import React from 'react';
import customConnectStyles from "@/src/components/Global/CustomConnectButton/CustomConnectButton.module.css";
import ReviewAndApproveButton from "@/src/components/Global/CustomConnectButton/ReviewAndApproveButton";
import {useBalance} from "wagmi";
import {formatUnits, parseUnits} from "ethers";
import styles from "@/src/components/AppSwapReviewTrade/AppSwapReviewTrade.module.css";

export default function SwapButtonHandler({ loading, price, address, sellToken, buyToken, sellTokenAmount, buyTokenAmount }) {

    const { data: sellTokenBalance, isLoading: sellTokenBalanceLoading } = useBalance({
        address: address,
        token: sellToken?.address,
    });

    // const inSufficientBalance = false;
    const inSufficientBalance = (sellTokenBalance && sellToken && sellTokenAmount)
            ? parseUnits(sellTokenAmount, sellToken.decimals) > sellTokenBalance.value
            : true;

    if(loading) {
        return (
            <div className={styles['best-price-details-container']}>
                <div className={styles['best-price-loading-container']}>
                    <img src="/img/w-loading.gif" alt="Loading" height={25}/>
                    Loading for the best quote...
                </div>
            </div>
        )
    }

    if (price && price.minBuyAmount && BigInt(price.buyAmount) < BigInt(price.minBuyAmount)) {
        return (
            <div className={customConnectStyles['select-token-alert'] + ' ' + customConnectStyles['alert-danger']}>
                Minimum buy Amount : {parseFloat(formatUnits(price.minBuyAmount)).toFixed(8)} {buyToken.symbol}
            </div>
        );
    }

    if(price && price.liquidityAvailable === false) {
        return (
            <div
                className={customConnectStyles['select-token-alert'] + ' ' + customConnectStyles['alert-danger']}>
                Liquidity not available
            </div>
        );
    }

    if(sellToken && buyToken && sellTokenAmount > 0 && price) {
        return (
            <ReviewAndApproveButton taker={address}
                                    sellToken={sellToken}
                                    buyToken={buyToken} price={price}
                                    disabled={inSufficientBalance}
                                    sellTokenAmount={sellTokenAmount}
                                    buyTokenAmount={buyTokenAmount}
            />
        );
    }

    return (
        <div className={customConnectStyles['select-token-alert']}>
            {
                (!sellToken || !buyToken)
                    ? "Select a token"
                    : "Enter an amount"
            }
        </div>
    );
}