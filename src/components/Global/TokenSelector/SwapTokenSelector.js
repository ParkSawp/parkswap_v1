'use client'

import styles from "@/src/components/Global/TokenSelector/SwapTokenSelector.module.css";
import React, {useEffect, useRef, useState} from "react";
import { useAccount, useBalance } from 'wagmi';
import {formatFromBalance, fullFormatFromBalance, truncateDecimal} from "@/src/config/functions";
import useGetUsdPrice from "@/src/hooks/useGetUsdPrice";
import Amount from "@/src/components/Global/Amount/Amount";
import RangeSlider from "react-range-slider-input";


export default function SwapTokenSelector({ openModal, selectedToken, elementToDisplay, placeholder, selectedNetwork, customProps: { onAmountChange, token, amount, amountSlipper } }) {

    const { address } = useAccount();
    const inputRef = useRef(null);
    const [query, setQuery] = useState(amount);
    const [refreshFromParent, setRefreshFromParent] = useState(false);
    const { amount: usdAmount, updateAmount } = useGetUsdPrice();
    const tokenSelected = token || selectedToken;
    const [amountToUse, setAmountToUse] = useState(0);
    const amountSlipperValues = [25, 50, 75, 100];

    const { data: selectedTokenBalance } = useBalance({
        address,
        token: token?.address
    });

    const cleanCurrentValue = (event) => {
        if(parseFloat(query) === 0) {
            setQuery('');
        }
    };

    const handleAmountInput = (event) => {
        let value = event.target.value;
        value = value.replace(',', '.');
        value = value.replace(/^0/g, '');
        if(/^\./.test(value)) {
            value = '0'+value;
        }
        value = value.replace(/[\.]+/, '.');

        if(value.split('.').length > 2) {
            const [digit, decimal] = value.split('.');
            value = digit+'.'+decimal;
        }
        setRefreshFromParent(false);
        setQuery(value.length > 0 ? value.toString() : '');
        setAmountToUse(0);
    };

    const setMax =  () => {
        onAmountChange(fullFormatFromBalance(selectedTokenBalance));
    };

    const handleAmountToUse = (value) => {
        setAmountToUse(value[1]);
    };

    const setAmount = (value) => {
        setAmountToUse(value);
    };

    useEffect(() => {
        if(refreshFromParent) {
            setRefreshFromParent(false);
            return;
        }
        const timeOutId = setTimeout(() => {
            const value = Number(query);
            if(isNaN(value)) {
                setQuery('');
                return;
            }
            onAmountChange(query);
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    useEffect(() => {
        setRefreshFromParent(true);
        setQuery(amount);
    }, [amount]);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            updateAmount(tokenSelected, query ? parseFloat(query) : 0);
        }, 200);
        return () => clearTimeout(timeOutId);
    }, [query, tokenSelected]);

    useEffect(() => {
        if(!selectedTokenBalance) {
            return;
        }
        if(amountToUse === 0) {
            return;
        }
        const amountTotal = fullFormatFromBalance(selectedTokenBalance);
        const amountPercentToUse = ((selectedToken.address === null && amountToUse === 100) ? amountToUse - 1 : amountToUse);
        const amount = (amountTotal / 100) * amountPercentToUse;
        setQuery(truncateDecimal(amount, 8));

        const timeOutId = setTimeout(() => {
            if(isNaN(amount)) {
                return;
            }
            onAmountChange(truncateDecimal(amount, 4));
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [amountToUse]);

    useEffect(() => {
        setAmountToUse(0);
    }, [tokenSelected]);

    return (
        <div>
            <div className={styles["swap-token-selector"]}>
                <div className={styles["swap-token-selector-token-selection"]}>
                    <div className={styles["swap-token-selector-button"]} onClick={openModal}>
                        <div className={styles["swap-token-selector-token-description"]}>
                        <span className={styles["swap-token-selector-token-icon"]}>
                              <img width="35px" height="35px" src={tokenSelected?.logo_uri || '/svg/tokens/icon.404.svg'} />
                        </span>
                            <span
                                className={styles["swap-token-selector-token-symbol"]}>{tokenSelected?.symbol || placeholder}</span>
                        </div>
                        <svg width='15px' height='15px'>
                            <title>Select Currency</title>
                            <image width="15px" height="15px" href="/svg/icons/arrowgreynew.svg"/>
                        </svg>
                    </div>

                    {
                        !amountSlipper && token && selectedTokenBalance?.value
                        &&
                        (
                            <div className={styles["swap-token-selector-token-balance"]}>
                                <span>{formatFromBalance(selectedTokenBalance)} {selectedTokenBalance.symbol}</span>
                            </div>
                        )
                    }
                </div>
                <div className={styles["swap-token-selector-amount-wrapper"]}>
                    <div className={styles["swap-token-selector-amount-container"]}>
                        <input placeholder="0.00" type="text"
                               className={styles['swap-token-selector-amount-input']}
                               ref={inputRef}
                               value={query}
                               onFocus={cleanCurrentValue}
                               onInput={handleAmountInput}
                        />
                        <span className={styles["swap-token-selector-amount"]}>
                        <Amount amount={usdAmount}/>
                    </span>
                    </div>
                </div>
            </div>
            {
                amountSlipper && token && selectedTokenBalance?.value
                &&
                (
                    <div className={styles["swap-token-amount-slipper"]}>
                        <div className={styles["swap-token-amount-handlers-container"]}>
                            <div className={styles["swap-token-selector-token-balance"]}>
                                <button className={styles['swap-token-selector-amount-max-button']}
                                        type='button'
                                        onClick={setMax}>Max
                                </button>
                                <span>{formatFromBalance(selectedTokenBalance)} {selectedTokenBalance.symbol}</span>
                            </div>
                            <div className={styles["swap-token-amount-slipper-shorts-container"]}>
                                {
                                    amountSlipperValues.map((value) => (
                                        <button key={'key-'+value} type='button' onClick={() => setAmount(value)}
                                                className={styles["swap-token-amount-slipper-item"] + ' ' + (amountToUse === value ? styles['active'] : '')}>
                                            {value} %
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={styles['amount-slipper-slider-container']}>
                            <RangeSlider
                                className="single-thumb"
                                value={[0, amountToUse]}
                                thumbsDisabled={[true, false]}
                                rangeSlideDisabled={false}
                                onInput={handleAmountToUse}
                                min={0}
                                max={100}
                                step={1}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
};