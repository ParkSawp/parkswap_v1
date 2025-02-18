import React, {useEffect, useState} from 'react';
import AppSwapTokenBox from "@/src/components/AppSwapTokenBox/AppSwapTokenBox";
import styles from "./AppSwapContainer.module.css";
import customConnectStyles from "@/src/components/Global/CustomConnectButton/CustomConnectButton.module.css";
import CustomConnectButton from "@/src/components/Global/CustomConnectButton/CustomConnectButton";
import { isAddress, parseUnits, Interface } from 'ethers';
import { useSendTransaction } from "wagmi";
import { ERC20_ABI } from '@/src/config/constants'



export default function SendFormView({ }) {

    const [amount, setAmount] = useState('0');
    const [token, setToken] = useState(null);
    const [receiverAddress, setReceiverAddress] = useState('');
    const { sendTransaction, data, isPending, error } = useSendTransaction()

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

    const isInvalidAddress = receiverAddress && !isAddress(receiverAddress);
    const isInvalidForm = isInvalidAddress || !amount || !token;

    useEffect(() => {
        if(data) {
            setAmount('0');
            setReceiverAddress('');
        }
    }, [data]);

    return (
        <>
            <div className={styles['send-token-block']}>
                <h3 className={styles['send-block-title']}>Send Tokens</h3>
                <AppSwapTokenBox
                    onTokenSelected={setToken}
                    onAmountChange={setAmount}
                    amount={amount}
                    token={token}
                />
            </div>
            <div className={styles['send-token-block']}>
                <h3 className={styles['send-block-title']}>Receiver Address</h3>
                <input type="text"
                       placeholder="Receiver Address"
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
                        Please provide a correct address
                    </div>
                )
            }
            <br/>
            <div className={styles['send-token-block']+' primary-button '+styles['send-connect-wallet-btn-container']}>
                <CustomConnectButton className={styles['send-connect-wallet-btn']+' primary-button'}>
                    {
                        isPending
                            ? (
                                <div className={styles['send-loading-container']} >
                                    <img src="/img/w-loading.gif" alt="Loading" height={35}/>
                                </div>
                            )
                            : (
                                <button
                                    className={customConnectStyles['connect-wallet-btn'] + ' primary-button ' + styles['send-connect-wallet-btn']}
                                    onClick={send} disabled={isInvalidForm}>
                                    Send
                                </button>
                            )
                    }
                </CustomConnectButton>
            </div>
        </>
    )
}