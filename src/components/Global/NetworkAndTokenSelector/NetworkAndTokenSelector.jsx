'use client';

import React, {useEffect, useState} from 'react';
import styles from './NetworkAndTokenSelector.module.css';
import useGetTokens from "@/src/hooks/useGetTokens";
import useGetNetworks from "@/src/hooks/useGetNetworks";
import TokenSelectorItem from "@/src/components/Global/NetworkAndTokenSelector/TokenSelectorItem";
import { useAccount, useBalance } from 'wagmi';
import TokenList from "@/src/components/Global/NetworkAndTokenSelector/TokenList";
import {useTranslation} from "react-i18next";
import { CloseIcon } from '@/src/components/Icon/Icon';

export default function NetworkAndTokenSelector({ networkOnly = false, tokenOnly=false, defaultNetwork, defaultToken, onTokenSelected, onNetworkSelected }) {

    const { address, addresses } = useAccount();
    const { t } = useTranslation();
    const { networks } = useGetNetworks();

    const [selectedToken, setSelectedToken] = useState();
    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
    const [searchKey, setSearchKey] = useState('');
    const [selectNetworkOnly, setSelectNetworkOnly] = useState(networkOnly);

    const { tokens, isLoading } = useGetTokens(searchKey);

    const selectToken = (token) => {
        setSelectedToken(token);
        onTokenSelected && onTokenSelected(token, selectedNetwork);
    };

    const selectNetwork = (network) => {
        setSelectedNetwork(network);
        onNetworkSelected && onNetworkSelected(network);
    };

    const filterToken = (event) => {
        setSearchKey(event.target.value);
    };

    const cleanInput = () => setSearchKey('');

    const displayType = (networkOnly ? 'network-only' : (tokenOnly ? 'token-only' : ''));

    const handleSelectNetwork = () => {
        setSelectNetworkOnly(true);
    };


    return (
        <div className={styles['networks-token-selector-container'] +' '+ styles[displayType]} >
            {
                selectNetworkOnly
                    ? (
                        <div className={styles['networks-list-wrapper']}>
                            <div className={styles['networks-list-container']}>
                                {
                                    networks.map((network) => (
                                        <div key={network.name} className={styles['network-item-container'] +' '+ (network.symbol === selectedNetwork.symbol && styles['active'])} onClick={() => selectNetwork(network)}>
                                            <div className={styles['network-icon-container']} >
                                                <img src={network.logo_uri} alt="" />
                                            </div>
                                            <div className={styles['network-name-container']}>
                                                <div className={styles['network-name']}>{network.name}</div>
                                                <div className={styles['network-symbol']}>{network.symbol}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                    : (
                        <div className={styles['tokens-list-wrapper']}>
                            <div className={styles['networks-token-search-container']}>
                                {/*<div className={styles['token-networks-list-container']}>*/}
                                {/*    {*/}
                                {/*        networks.map((network) => (*/}
                                {/*            <div key={network.name}*/}
                                {/*                 className={styles['network-list-item-container'] + ' ' + (network.symbol === selectedNetwork.symbol && styles['active'])}*/}
                                {/*                 onClick={handleSelectNetwork}>*/}
                                {/*                <div className={styles['network-list-icon-container']}>*/}
                                {/*                    <img src={network.logo_uri} alt=""/>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        ))*/}
                                {/*    }*/}
                                {/*</div>*/}
                                <div className={styles['token-search-input-container']}>
                                    <input value={searchKey} type="text" placeholder={t('Search by token name or address')} onInput={filterToken}/>
                                    {
                                        searchKey
                                        && (
                                            <button className={styles['erase-input-button']} type='button'
                                                    onClick={cleanInput}>
                                                <CloseIcon/>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                            <TokenList loading={isLoading} tokens={tokens || []} onSelectToken={selectToken} selectedToken={selectedToken} />

                        </div>
                    )
            }
        </div>
    );
}