import React, { useState, useEffect } from 'react';
import styles from './SwapResumeModal.module.css';
import Modal from "@/src/components/Modal/Modal";
import {useSendTransaction, useSignTypedData} from "wagmi";
import {formatEther} from "ethers";
import {Toast} from "@/src/config/functions";
import useRecentToken from "@/src/hooks/useRecentToken";
import {numberToHex, size, concat} from "viem";
import useUpdateTransaction from "@/src/hooks/useUpdateTransaction";
import Translate from "@/src/components/Translate/Translate";
import {ArrowRight, LoadingIcon} from "@/src/components/Icon/Icon";
import useAppSettings from "@/src/hooks/useAppSettings";
import useGetUsdPrice from "@/src/hooks/useGetUsdPrice";
import Amount from "@/src/components/Global/Amount/Amount";
import SuccessSwapToast from "@/src/components/Modal/SwapResumeModal/SuccessSwapToast";

const SwapResumeTokenDetail = ({ token, amount }) => {
    const { amount: usdAmount, updateAmount } = useGetUsdPrice();

    useEffect(() => {
        updateAmount(token, amount);
    }, [amount, token.name]);

    return (
        <div className={styles['swap-resume-step-token']}>
            <div className={styles['swap-resume-step-token-details']}>
                <img src={token.logo_uri} alt={token.name} width={30}/>
                <span>{token.symbol}</span>
            </div>
            <div className={styles['swap-resume-step-token-amount']}>
                <div className={styles['swap-resume-step-token-amount-quantity']}>
                    {parseFloat(amount).toFixed(3)}
                </div>
                <div className={styles['swap-resume-step-token-amount-value']}>
                    <Amount amount={usdAmount} />
                </div>
            </div>
        </div>
    );
}

export default function SwapResumeModal({onClose, quote, sellToken, buyToken, sellTokenAmount, buyTokenAmount}) {


    const {data: transactionSentHash, sendTransaction, isPending: isTransactionOnLoading, error} = useSendTransaction();
    const {updateTransaction} = useUpdateTransaction();
    const {addToRecent} = useRecentToken();
    const {signTypedData} = useSignTypedData();
    const settings = useAppSettings();

    const executeTransaction = (transaction) => {
        const params = {
            to: transaction.to,
            data: transaction.data,
            value: transaction.value
        };
        if (!!transaction.gas) {
            params.gas = BigInt(transaction.gas);
        }
        if (!!transaction.gasPrice) {
            params.gasPrice = BigInt(transaction.gasPrice);
        }

        sendTransaction(params);
        addToRecent(sellToken);
    }
    const handleTransactionWithPermit2 = () => {
        signTypedData(quote.permit2.eip712, {
            onSuccess: (signature) => {
                const signatureLengthInHex = numberToHex(size(signature), { signed: false, size: 32})
                const transaction = quote.transaction;
                transaction.data = concat([transaction.data, signatureLengthInHex, signature]);
                executeTransaction(transaction);
            }
        });
    }
    const handleTransaction = () => {
        if(!quote?.transaction) {
            return;
        }

        if(quote.permit2?.eip712) {
            handleTransactionWithPermit2();
            return;
        }
        executeTransaction(quote.transaction);
    };

    useEffect(() => {
        if(transactionSentHash) {
            Toast.success(<SuccessSwapToast hash={transactionSentHash} />, settings.notificationSound);
            onClose && onClose();
            updateTransaction({ transactionId: quote.transactionId, hash: transactionSentHash });
            return;
        }
        if(error) {
            console.log(error)
            Toast.error("Swap rejected by user", settings.notificationSound);
        }
    }, [error, transactionSentHash]);


    return (
        <>
            <Modal
                className={null}
                isOpen={true}
                closeModal={onClose}
                modalTitle={null}
                modalWidth={400}
                modalHeight={600}
            >
                <div className={styles['swap-resume-modal-content']}>
                    <h2 className={styles['swap-resume-title']} >
                        <Translate>You’re swapping</Translate>
                    </h2>
                    <div className={styles['swap-resume-step-container'] + ' ' + styles['step-resume']}>
                        <SwapResumeTokenDetail token={sellToken} amount={sellTokenAmount} />
                        <div className={styles['swap-resume-step-direction-logo']}>
                            <ArrowRight />
                        </div>
                        <SwapResumeTokenDetail token={buyToken} amount={buyTokenAmount} />
                    </div>
                    <div className={styles['swap-resume-step-separator']}></div>
                    <div className={styles['swap-resume-step-container'] + ' ' + styles['step-information']}>
                        <div className={styles['swap-resume-step-transaction-detail']}>
                            <strong><Translate>Fee</Translate></strong> <span>{parseFloat(formatEther(quote?.totalNetworkFee)).toFixed(8)} <strong>ETH</strong></span>
                        </div>
                        {/*<div className={styles['swap-resume-step-transaction-detail']}>*/}
                        {/*    <strong>Network Cost</strong> <span>0,00</span>*/}
                        {/*</div>*/}
                        {/*<div className={styles['swap-resume-step-transaction-detail']}>*/}
                        {/*    <strong>Rate</strong> <span>0,00</span>*/}
                        {/*</div>*/}
                        {/*<div className={styles['swap-resume-step-transaction-detail']}>*/}
                        {/*    <strong>Max slippage</strong> <span>0,00</span>*/}
                        {/*</div>*/}
                    </div>
                    {/*<div className={styles['step-alert']}>*/}
                    {/*    <div className={styles['step-alert-title']}>Very high price impact (-8.65%)</div>*/}
                    {/*    <div className={styles['step-alert-body']}>*/}
                    {/*        This transaction will result in a -8.66% price impact on the market price of this pool and*/}
                    {/*        will result in a loss of funds.*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={styles['swap-resume-options-container']} >
                        <div></div>
                        <div className={styles['swap-resume-buttons-container']} >
                            { isTransactionOnLoading && <LoadingIcon height={25} /> }
                            <button className={styles['swap-resume-option-button']+' '+styles["cancel-swap"]} onClick={onClose}>
                                <Translate>Close</Translate>
                            </button>
                            <button disabled={isTransactionOnLoading} className={styles['swap-resume-option-button']+' '+styles["validate-swap"]} onClick={handleTransaction}>
                                <Translate>Confirm swap</Translate>
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}