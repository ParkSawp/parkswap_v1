'use client'

import styles from "@/src/components/Global/TokenSelector/SwapTokenSelector.module.css";
import React from "react";
import { useAccount, useBalance } from 'wagmi';
import {formatFromBalance, fullFormatFromBalance} from "@/src/config/functions";


export default function SwapTokenSelector({ openModal, selectedToken, elementToDisplay, placeholder, selectedNetwork, customProps: { onAmountChange, token, amount } }) {

    const { address } = useAccount();
    const tokenSelected = token || selectedToken;

    const { data: selectedTokenBalance } = useBalance({
        address,
        token: token?.address
    });

    const handleAmountInput = (event) => {
        const value = event.target.value.trim();
        onAmountChange(value.length > 0 ? value : '0');
    };

    const setMax =  () => {
        onAmountChange(fullFormatFromBalance(selectedTokenBalance));
    }

    return (
        <div className={styles["swap-token-selector"]}>
            <div className={styles["swap-token-selector-token-selection"]}>
                <div className={styles["swap-token-selector-button"]} onClick={openModal}>
                    <div className={styles["swap-token-selector-token-description"]}>
                        <span className={styles["swap-token-selector-token-icon"]}>
                            <svg width="35px" height="35px">
                              <title>{tokenSelected?.name}</title>
                              <image width="35px" height="35px" href={tokenSelected?.logo_uri}/>
                            </svg>
                        </span>
                        <span className={styles["swap-token-selector-token-symbol"]} >{tokenSelected?.symbol || placeholder}</span>
                    </div>
                    <svg width='15px' height='15px'>
                        <title>Select Currency</title>
                        <image width="15px" height="15px" href="/svg/icons/arrowgreynew.svg"/>
                    </svg>
                </div>
                <div className={styles["swap-token-selector-token-balance"]}>
                    {
                        token && selectedTokenBalance?.value
                        &&
                        (
                            <>
                                <button className={styles['swap-token-selector-amount-max-button']} type='button' onClick={setMax}>Max</button>
                                <span>{formatFromBalance(selectedTokenBalance)} {selectedTokenBalance.symbol}</span>
                            </>
                        )
                    }
                </div>
            </div>
            <div className={styles["swap-token-selector-amount-wrapper"]}>
                <div className={styles["swap-token-selector-amount-container"]}>
                    <input placeholder="0.00" type="text" dir="rtl"
                           className={styles['swap-token-selector-amount-input']}
                           value={amount}
                           onInput={handleAmountInput}
                    />
                    <span className={styles["swap-token-selector-amount"]}>
                        0 $
                    </span>
                </div>
            </div>
        </div>
    )
};