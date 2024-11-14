import React from 'react';
import styles from './BridgeFormItem.module.css';

export default function BridgeFormItem({ token, network, title, onClick, children }) {

    return (
        <div className={styles['bridge-form-item-container']} onClick={onClick}>
            <div className={styles['bridge-form-item-title']}>{title}</div>
            <div className={styles['bridge-form-item-token-description']}>
                <div className={styles['bridge-form-item-token']}>
                    <div className={styles['bridge-form-item-token-picture-container']}>
                        {token && <img src={token.logo} alt={token.name}/>}
                        {!token && network && <img src={network.logo} alt={network.name}/>}
                    </div>
                    <div className={styles['bridge-form-item-network-picture-container']}>
                        {network && <img src={network.logo} alt={network.name}/>}
                    </div>
                </div>
                <div className={styles['bridge-form-item-placeholder']}>
                    {children}
                </div>
            </div>
        </div>
    );
}