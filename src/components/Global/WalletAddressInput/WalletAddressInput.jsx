import React, {useState} from 'react';
import styles from './WalletAddressInput.module.css';
import BridgeFormItem from "@/src/components/BridgeFormItem/BridgeFormItem";


export default function WalletAddressInput({ title, token, onChange }) {

    const [address, setAddress] = useState('');

    const onInputHandler = (event) => {
        setAddress(event.target.value);
        onChange && onChange(event.target.value);
    };

    return (
        <BridgeFormItem title={title} token={token} >
            <div className={styles['address-input-wrapper']}>
                <div className={styles['address-input-container']}>
                    <input type="text" placeholder='Enter wallet address' onInput={onInputHandler} />
                </div>
            </div>
        </BridgeFormItem>
    )
}