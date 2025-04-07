import React from 'react';
import customConnectStyles from "@/src/components/Global/CustomConnectButton/CustomConnectButton.module.css";
import ReviewAndApproveButton from "@/src/components/Global/CustomConnectButton/ReviewAndApproveButton";
import {useBalance} from "wagmi";
import {formatUnits, parseUnits} from "ethers";
import styles from "@/src/components/AppSwapReviewTrade/AppSwapReviewTrade.module.css";
import {useTranslation} from "react-i18next";
import Translate from "@/src/components/Translate/Translate";
import {LoadingIcon} from "@/src/components/Icon/Icon";
import {truncateDecimal} from "@/src/config/functions";

export default function SwapButtonHandler({ loading, price, address, sellToken, buyToken, sellTokenAmount, buyTokenAmount }) {

    const { t } = useTranslation();
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
                    <LoadingIcon />
                    <Translate>Loading for the best quote</Translate>...
                </div>
            </div>
        )
    }

    if (price && price.minBuyAmount && BigInt(price.buyAmount) < BigInt(price.minBuyAmount)) {
        return (
            <div className={customConnectStyles['select-token-alert'] + ' ' + customConnectStyles['alert-danger']}>
                <Translate>Minimum buy Amount</Translate> : {truncateDecimal(parseFloat(formatUnits(price.minBuyAmount)), 8)} {buyToken.symbol}
            </div>
        );
    }

    if(price && price.liquidityAvailable === false) {
        return (
            <div className={customConnectStyles['select-token-alert'] + ' ' + customConnectStyles['alert-danger']}>
                <Translate>Liquidity not available</Translate>
            </div>
        );
    }

    if(sellToken && buyToken && sellTokenAmount > 0 && price) {
        return (
            <ReviewAndApproveButton taker={address}
                                    sellToken={sellToken}
                                    buyToken={buyToken}
                                    price={price}
                                    disabled={inSufficientBalance}
                                    sellTokenAmount={sellTokenAmount}
                                    buyTokenAmount={buyTokenAmount}
            />
        );
    }

    return (
        <div className={customConnectStyles['select-token-alert']}>
            <Translate>{
                (!sellToken || !buyToken)
                    ? "Select a token"
                    : "Enter an amount"
            }</Translate>
        </div>
    );
}