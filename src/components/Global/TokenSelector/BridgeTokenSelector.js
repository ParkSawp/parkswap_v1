'use client'

import TokenSelector from "@/src/components/Global/TokenSelector/TokenSelector";
import styles from "@/src/components/Global/TokenSelector/TokenSelector.module.css";
import BridgeFormItem from "@/src/components/BridgeFormItem/BridgeFormItem";
import React from "react";


export default function BridgeTokenSelector({ title, openModal, selectedToken, elementToDisplay, placeholder, selectedNetwork }) {

    return (
        <BridgeFormItem title={title} onClick={openModal} token={selectedToken} network={selectedNetwork}>
            {
                elementToDisplay
                &&
                <div className={styles['selected-element-container']}>
                    <div className={styles['selected-element-symbol']}>
                        {elementToDisplay.symbol}
                    </div>
                    <div className={styles['selected-element-name']}>
                        {elementToDisplay.name}
                    </div>
                </div>
            }
            {!elementToDisplay && placeholder}
        </BridgeFormItem>
    )
}