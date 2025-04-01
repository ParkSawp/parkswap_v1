import React, {useEffect, useState} from 'react';
import AppSwapTokenBox from "@/src/components/AppSwapTokenBox/AppSwapTokenBox";
import styles from "./AppSwapContainer.module.css";
import customConnectStyles from "@/src/components/Global/CustomConnectButton/CustomConnectButton.module.css";
import CustomConnectButton from "@/src/components/Global/CustomConnectButton/CustomConnectButton";
import { isAddress, parseUnits, Interface } from 'ethers';
import { useSendTransaction } from "wagmi";
import { ERC20_ABI } from '@/src/config/constants'
import Translate from "@/src/components/Translate/Translate";
import {useTranslation} from "react-i18next";
import {LoadingIcon} from "@/src/components/Icon/Icon";
import {Toast} from "@/src/config/functions";
import SendTransactionNotification from "@/src/components/AppSwapContainer/SendTransactionNotification";



export default function SendFormView({ }) {

    const [amount, setAmount] = useState('0');
    const [token, setToken] = useState(null);
    const [receiverAddress, setReceiverAddress] = useState('');
    const { sendTransaction, data, isPending, error } = useSendTransaction();
    const { t } = useTranslation();

    const handleReceiverAddress = (event) => {
        setReceiverAddress(event.target.value.trim());
    }

    const send = () => {
        if(!token) {
            return;
        }
        if(token.address) {
            sendToken();
            return;
        }
        return sendNativeToken();
    }
    const sendNativeToken = () => {
        const amountFormatted = parseUnits(amount, token.decimals);
        sendTransaction({
            to: receiverAddress,
            value: amountFormatted
        });
    }
    const sendToken = () => {
        const amountFormatted = parseUnits(amount, token.decimals);
        const data = (new Interface(ERC20_ABI)).encodeFunctionData('transfer', [receiverAddress, amountFormatted]);

        const transaction = {
            to: token.address,
            data
        };

        sendTransaction(transaction);
    };

    const isInvalidAddress = (receiverAddress && !isAddress(receiverAddress));
    const isInvalidForm = !receiverAddress || isInvalidAddress || !amount || !token;

    useEffect(() => {
        console.log({ data, error });
        if(data) {
            setAmount('0');
            setReceiverAddress('');
            Toast.success(<SendTransactionNotification hash={data} />, true);
        }
        if(error) {
            Toast.error(<SendTransactionNotification error={true} />, true);
        }
    }, [data, error]);

    return (
        <>
            <div className={styles['send-token-block']}>
                <h3 className={styles['send-block-title']}>
                    <Translate>Send Tokens</Translate>
                </h3>
                <AppSwapTokenBox
                    onTokenSelected={setToken}
                    onAmountChange={setAmount}
                    amount={amount}
                    token={token}
                    amountSlipper={true}
                />
            </div>
            <div className={styles['send-token-block']}>
                <h3 className={styles['send-block-title']}>
                    <Translate>Receiver Address</Translate>
                </h3>
                <input type="text"
                       placeholder={t('Receiver Address')}
                       value={receiverAddress}
                       onChange={handleReceiverAddress}
                       className={styles['send-receiver-input']+' '+(isInvalidAddress ? styles['has-error'] : '')}
                />
            </div>
            {
                isInvalidAddress
                &&
                (
                    <div className={styles['send-token-block-error-container']}>
                        <Translate>Please provide a correct address</Translate>
                    </div>
                )
            }
            <br/>
            <div className={styles['send-token-block']+' '+styles['send-connect-wallet-btn-container']}>
                <CustomConnectButton className={styles['send-connect-wallet-btn']+' primary-button'}>
                    {
                        isPending
                            ? (
                                <div className={styles['send-loading-container']} >
                                    <LoadingIcon height={35} />
                                </div>
                            )
                            : (
                                <button
                                    className={customConnectStyles['connect-wallet-btn'] + ' primary-button ' + styles['send-connect-wallet-btn']}
                                    onClick={send}
                                    disabled={isInvalidForm} >
                                    <Translate>Send</Translate>
                                </button>
                            )
                    }
                </CustomConnectButton>
            </div>
        </>
    )
}