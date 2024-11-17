'use client';

import React, { useState } from 'react';
import styles from './TokenSelector.module.css';
import ModalTokenSelection from "@/src/components/Modal/ModalTokenSelection/ModalTokenSelection";
import Modal from "@/src/components/Modal/Modal";
import NetworkAndTokenSelector from "@/src/components/Global/NetworkAndTokenSelector/NetworkAndTokenSelector";
import BridgeFormItem from "@/src/components/BridgeFormItem/BridgeFormItem";


export default function TokenSelector({ title, placeholder, networkOnly, tokenOnly, onNetworkSelected, onTokenSelected }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState(null);
    const [selectedNetwork, setSelectedNetwork] = useState(null);

    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const selectNetwork = (network) => {
        if(networkOnly) {
            closeModal();
        }
        setSelectedNetwork(network);
        onNetworkSelected && onNetworkSelected(network);
    }
    const selectToken = (token, network) => {
        closeModal();
        setSelectedToken(token);
        setSelectedNetwork(network);
        onTokenSelected && onTokenSelected(token, network);
    }

    const elementToDisplay = networkOnly ? selectedNetwork : selectedToken;

    return (
        <>
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
            <Modal
                className={''}
                isOpen={isModalOpen}
                closeModal={closeModal}
                modalTitle={'Select'}
                modalContent={
                    <NetworkAndTokenSelector
                        networkOnly={networkOnly}
                        tokenOnly={tokenOnly}
                        onNetworkSelected={selectNetwork}
                        onTokenSelected={selectToken} />
                }
                modalWidth={400}
                modalHeight={620}
            />
        </>
    );
}