'use client';

import React, { useState } from 'react';
import Modal from "@/src/components/Modal/Modal";
import NetworkAndTokenSelector from "@/src/components/Global/NetworkAndTokenSelector/NetworkAndTokenSelector";
import BridgeTokenSelector from "@/src/components/Global/TokenSelector/BridgeTokenSelector";


export default function TokenSelector({ title, placeholder, networkOnly, tokenOnly, onNetworkSelected, onTokenSelected, customProps, Template }) {

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
    const TemplateComponentName = Template || BridgeTokenSelector;

    return (
        <>
            <TemplateComponentName
                title={title}
                openModal={openModal}
                selectedToken={selectedToken}
                elementToDisplay={elementToDisplay}
                placeholder={placeholder}
                selectedNetwork={selectedNetwork}
                customProps={customProps}
            />

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