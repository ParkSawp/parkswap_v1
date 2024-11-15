import React from 'react';
import styles from './BridgeSettingItem.module.css';

export default function BridgeSettingItem({ logo, title, note, showContent, children, onClick }) {

    return (
        <div className={styles['bridge-setting-item-container']} >
            <div className={styles['bridge-setting-item-header']} onClick={onClick}>
                <div className={styles['bridge-setting-item-icon-container']}>
                    <img src={logo} alt={title} />
                </div>
                <div className={styles['bridge-setting-item-header-title']}>
                    {title}
                </div>
                <div className={styles['bridge-setting-item-header-indication-container']}>
                    {note}
                </div>
            </div>
            {
                showContent
                &&
                <div className={styles['bridge-setting-item-body']}>
                    {children}
                </div>
            }
        </div>
    )
}