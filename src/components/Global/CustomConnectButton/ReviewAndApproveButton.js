import React, {useEffect, useState} from 'react';
import customConnectStyles from "@/src/components/Global/CustomConnectButton/CustomConnectButton.module.css";
// import { useEffect, useState, ChangeEvent } from "react";
// import { formatUnits, parseUnits } from "ethers";
import {
    useReadContract,
    // useBalance,
    useSimulateContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";
import { erc20Abi, Address } from "viem";
import {
    // MAINNET_TOKENS,
    // MAINNET_TOKENS_BY_SYMBOL,
    MAX_ALLOWANCE,
    // AFFILIATE_FEE,
    // FEE_RECIPIENT,
} from "@/src/config/constants";
import { toast, Bounce } from 'react-toastify';
import AppSwapReviewTrade from "@/src/components/AppSwapReviewTrade/AppSwapReviewTrade";
import {Toast} from "@/src/config/functions";
import useAppSettings from "@/src/hooks/useAppSettings";
import {LoadingIcon} from "@/src/components/Icon/Icon";
// import { permit2Abi } from "@/src/config/permit2abi";
// import Image from "next/image";
// import qs from "qs";


function ReviewTradeButton({ sellToken, buyToken, sellTokenAmount, buyTokenAmount }) {

    return (
        <>
            <AppSwapReviewTrade
                sellToken={sellToken}
                buyToken={buyToken}
                sellTokenAmount={sellTokenAmount}
                buyTokenAmount={buyTokenAmount}
            />
        </>
    )
}

export default function ReviewAndApproveButton({taker, sellToken, buyToken, sellTokenAmount, buyTokenAmount, disabled, price}) {
    if(disabled) {
        return (
            <div className={`${customConnectStyles["select-token-alert"]} ${customConnectStyles["alert-warning"]}`} >
                Insufficient {sellToken?.symbol}
            </div>
        );
    }

    // If price.issues.allowance is null, show the Review Trade button
    if (!price?.issues || price?.issues.allowance === null) {
        return <ReviewTradeButton sellTokenAmount={sellTokenAmount} buyTokenAmount={buyTokenAmount} sellToken={sellToken} buyToken={buyToken}/>;
    }

    // Determine the spender from price.issues.allowance
    const spender = price?.issues?.allowance?.spender;

    // 1. Read from erc20, check approval for the determined spender to spend sellToken
    const { data: allowance, refetch } = useReadContract({
        address: sellToken.address,
        abi: erc20Abi,
        functionName: "allowance",
        args: [taker, spender],
    });

    // 2. (only if no allowance): write to erc20, approve token allowance for the determined spender
    const { data } = useSimulateContract({
        address: sellToken.address,
        abi: erc20Abi,
        functionName: "approve",
        args: [spender, MAX_ALLOWANCE],
    });

    // Define useWriteContract for the 'approve' operation
    const {data: writeContractHash, isPending, writeContractAsync: writeContract, error } = useWriteContract();
    const settings = useAppSettings();

    const approve =  async () => {
        writeContract({
            abi: erc20Abi,
            address: sellToken.address,
            functionName: "approve",
            args: [spender, MAX_ALLOWANCE],
        });

        refetch();
    };

    // Call `refetch` when the transaction succeeds
    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data, refetch]);

    const isOnProcess = isPending && !error;

    useEffect(() => {
        if(writeContractHash) {
            Toast.success(sellToken.symbol+' Approved. Transaction Hash : '+ writeContractHash, settings.notificationSound);
            return;
        }
        if (!error) {
            return;
        }
        Toast.error(error.message, settings.notificationSound);
    }, [error, writeContractHash]);

    let isAllowance = false;
    try {
        isAllowance = !allowance || allowance < BigInt(sellTokenAmount);
    }catch (e){}

    if (isAllowance) {
        return (
            <>
                <div>
                    {
                        isOnProcess
                        &&
                        <div className={customConnectStyles["loading-approve-container"]}>
                            <LoadingIcon height={25} />
                            <span>Waiting for your approvement</span>
                        </div>
                    }
                    <button
                        type="button"
                        disabled={isPending}
                        className={`${customConnectStyles["connect-wallet-btn"]} primary-button ${customConnectStyles["swap-wallet-btn"]}`}
                        onClick={approve}
                    >
                        Approve
                    </button>
                </div>
            </>
        );
    }

    return <ReviewTradeButton sellTokenAmount={sellTokenAmount} buyTokenAmount={buyTokenAmount} sellToken={sellToken} buyToken={buyToken} />;
}
// }