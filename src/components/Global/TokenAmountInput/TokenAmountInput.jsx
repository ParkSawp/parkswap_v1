'use client';

import React, {useState} from 'react';
import styles from './TokenAmountInput.module.css';
import BridgeFormItem from "@/src/components/BridgeFormItem/BridgeFormItem";


export default function TokenAmountInput({ token, network, title, onInput }) {
    const [quantity, setQuantity] = useState(0);
    const [amount, setAmount] = useState(0);

    const amountHandler = (event) => {
        const value = parseFloat(event.target.value);
        if(isNaN(value)) {
            setAmount(0);
            onInput && onInput(0);
            return;
        }
        onInput && onInput(value);
    };

    return (
        <BridgeFormItem title={title} token={token} network={network} >
            <div className={styles['amount-input-wrapper']}>
                <div className={styles['amount-input-container']}>
                    <input type="text" placeholder='0' onInput={amountHandler}/>
                </div>
                <div className={styles['amount-input-amount']}>${amount.toFixed(2)}</div>
            </div>
        </BridgeFormItem>
    );
}