import styles from "@/public/css/app.module.css";
import AppSwapTokenSelectionBlockHeader
    from "@/src/components/AppSwapTokenSelectionBlockHeader/AppSwapTokenSelectionBlockHeader";
import AppSwapTokenBox from "@/src/components/AppSwapTokenBox/AppSwapTokenBox";
import customConnectStyles from "@/src/components/Global/CustomConnectButton/CustomConnectButton.module.css";
import CustomConnectButton from "@/src/components/Global/CustomConnectButton/CustomConnectButton";
import SwapButtonHandler from "@/src/components/AppSwapContainer/SwapButtonHandler";
import React, {useCallback, useEffect, useState, useRef} from "react";
import {formatUnits, parseUnits} from "ethers";
import useGetPrice from "@/src/hooks/useGetPrice";
import {useAccount} from "wagmi";
import useAppSettings from "@/src/hooks/useAppSettings";
import AppSwapSettings from "@/src/components/AppSwapSettings/AppSwapSettings";


const BUY_DIRECTION = 'buy';
const SELL_DIRECTION = 'sell';

export default function SwapFormView({setIsWalletConnected, reset: {shouldResetPrice, setShouldResetPrice}, isWalletConnected, displaySettings, onTokensSelect }) {

    const [sellToken,setSellToken] = useState();
    const [sellTokenAmount,setSellTokenAmount] = useState(0);
    const [buyToken,setBuyToken] = useState();
    const [direction,setDirection] = useState(BUY_DIRECTION);
    const [buyTokenAmount,setBuyTokenAmount] = useState(0);

    const { price, getPrice, resetPrice, loading: loadPrice, error } = useGetPrice();
    const { address } = useAccount();
    const appSettings = useAppSettings();

    const prevValues = useRef({ direction, sellTokenAmount, buyTokenAmount, sellTokenAddress: null, buyTokenAddress: null }).current

    const switchTokens = async () => {
        setBuyToken(sellToken);
        setSellToken(buyToken);
        onTokensSelect && onTokensSelect({ sellToken: buyToken, buyToken: sellToken});
        await updateAmount(SELL_DIRECTION, sellTokenAmount);
    };
    const changeSellTokenAmount = (amount) => {
        setSellTokenAmount(amount);
        setDirection(SELL_DIRECTION);
    };
    const changeBuyTokenAmount = (amount) => {
        setBuyTokenAmount(amount);
        setDirection(BUY_DIRECTION);
    };
    const handleSellToken = async (token) => {
        setSellToken(token);
        setDirection(SELL_DIRECTION);
        onTokensSelect && onTokensSelect({ sellToken: token, buyToken: buyToken});
    };
    const handleBuyToken = (token) => {
        setBuyToken(token);
        setDirection(SELL_DIRECTION);
        onTokensSelect && onTokensSelect({ buyToken: token, sellToken: sellToken});
    };


    const updateAmount = useCallback(async () => {
        // resetPrice();
        if(!sellToken || !buyToken || sellTokenAmount?.length === 0) {
            setBuyTokenAmount('0.00');
            return;
        }
        const params = {
            amount: parseUnits(sellTokenAmount.toString(), sellToken.decimals),
            chainId: appSettings.selectedChainId,
        };
        if(address) {
            params.taker = address;
        }
        params.sellAddress =  sellToken.address;
        params.buyAddress = buyToken.address;

        const price = await getPrice(params);
        if(!price) {
            return;
        }
        const amountConverted = parseFloat(formatUnits(price.buyAmount ?? '0', buyToken.decimals)).toFixed(8);
        setBuyTokenAmount(amountConverted);
    }, [getPrice, sellTokenAmount, direction, buyTokenAmount, sellToken, buyToken]);

    const updateSellAmount = useCallback(async (amount) => {
        // resetPrice();
        if(!sellToken || !buyToken) {
            return;
        }
        const params = {
            amount: parseUnits(buyTokenAmount.toString(), buyToken.decimals),
            chainId: appSettings.selectedChainId,
        };
        if(address) {
            params.taker = address;
        }
        params.sellAddress =  buyToken.address;
        params.buyAddress = sellToken.address;
        const price = await getPrice(params);
        if(!price) {
            return;
        }
        const amountConverted = parseFloat(formatUnits(price.buyAmount ?? '0', sellToken.decimals)).toFixed(2);
        setSellTokenAmount(amountConverted);
    }, [getPrice, sellTokenAmount, direction, buyTokenAmount, sellToken, buyToken]);


    useEffect(() => {
        if(prevValues.direction === direction && prevValues.buyTokenAddress === buyToken?.address && prevValues.sellTokenAddress === sellToken?.address) {
            if(prevValues.direction === SELL_DIRECTION && prevValues.sellTokenAmount === sellTokenAmount) {
                return;
            }
            else if(prevValues.direction === BUY_DIRECTION && prevValues.buyTokenAmount === buyTokenAmount) {
                return;
            }
        }
        if(direction === SELL_DIRECTION) {
            updateAmount();
        } else {
            updateSellAmount();
        }
        return () => {
            prevValues.direction = direction;
            prevValues.sellTokenAmount = sellTokenAmount;
            prevValues.buyTokenAmount = buyTokenAmount;
            prevValues.sellTokenAddress = sellToken?.address;
            prevValues.buyTokenAddress = buyToken?.address;
        };
    }, [sellTokenAmount, direction, buyTokenAmount, sellToken?.address, buyToken?.address]);

    useEffect(() => {
        if(shouldResetPrice) {
            updateAmount();
        }
        setShouldResetPrice(false);
    }, [shouldResetPrice, updateAmount]);

    return (
        <>
            <div className={`${styles["app-swap-box-container"]} ${styles["bg-green"]}`}>
                <AppSwapTokenSelectionBlockHeader title="You Pay"/>
                <AppSwapTokenBox token={sellToken} amount={sellTokenAmount} onTokenSelected={handleSellToken}
                                 onAmountChange={changeSellTokenAmount}/>
            </div>
            <div className={styles["app-container-swap-btn-wrapper"]}>
                <div className={styles["app-container-swapBtn"]} onClick={switchTokens}>
                    <svg height="25px" width="25px">
                        <title>Swap cryptocurrencies</title>
                        <image href="/svg/icons/swp.svg" height="25px" width="25px"/>
                    </svg>
                </div>
            </div>
            <div className={`${styles["app-swap-box-container"]} ${styles["bordered"]}`}>
                <AppSwapTokenSelectionBlockHeader title="You receive"/>
                <AppSwapTokenBox token={buyToken} amount={buyTokenAmount} onTokenSelected={handleBuyToken}
                                 onAmountChange={changeBuyTokenAmount}/>
            </div>

            {displaySettings && <AppSwapSettings/>}

            {
                /* If wallet connected do : */
                isWalletConnected && (
                    <div className={styles["app-container-button"]} onClick={(() => {
                    })}>
                        <svg>
                            <title>Swap currency</title>
                            <image href="/svg/icons/wallet.svg" height="100%" width="100%"/>
                        </svg>
                        <span>Swap currency</span>
                    </div>
                )
            }

            <br/>
            <div className={customConnectStyles["swap-button-container"]}>
                <CustomConnectButton>
                    <SwapButtonHandler
                        sellToken={sellToken}
                        buyToken={buyToken}
                        sellTokenAmount={sellTokenAmount}
                        buyTokenAmount={buyTokenAmount}
                        price={price}
                        address={address}
                        loading={loadPrice}
                    />
                </CustomConnectButton>
            </div>
        </>
    )
}