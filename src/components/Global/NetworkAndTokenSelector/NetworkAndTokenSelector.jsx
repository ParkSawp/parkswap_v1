import React, {useEffect, useState} from 'react';
import styles from './NetworkAndTokenSelector.module.css';
import axios from "axios";

export default function NetworkAndTokenSelector({ networkOnly = false, tokenOnly=false, defaultNetwork, defaultToken, onTokenSelected, onNetworkSelected }) {

    const [networks, setNetworks] = useState([
        {
            name: 'Ethereum',
            symbol: 'ETH',
            logo: '/svg/icons/eth_icon.svg'
        },
        {
            name: 'Dai',
            symbol: 'DAI',
            logo: '/svg/icons/dai-logo.svg'
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            logo: '/svg/icons/sol-logo.svg'
        },
        {
            name: 'StarkNet',
            symbol: 'STRK',
            logo: '/svg/icons/strk-logo.svg'
        }
    ]);
    const [tokens, setTokens] = useState([]);

    const [selectedToken, setSelectedToken] = useState();
    const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);


    useEffect(() => {
        axios.get('/api/tokens')
            .then(response => {
                setTokens(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the tokens!", error);
            });
    }, []);

    const selectToken = (token) => {
        setSelectedToken(token);
        onTokenSelected && onTokenSelected(token, selectedNetwork);
    };

    const selectNetwork = (network) => {
        setSelectedNetwork(network);
        onNetworkSelected && onNetworkSelected(network);
    };

    let displayType = '';
    if(networkOnly) {
        displayType = 'network-only';
    }
    else if(tokenOnly) {
        displayType = 'token-only';
    }


    return (
        <div className={styles['networks-token-selector-container'] +' '+ styles[displayType]} >
            <div className={styles['networks-list-wrapper']}>
                <div className={styles['networks-token-search-container']}>
                    <input type="text" placeholder="Search network" />
                </div>
                <div className={styles['networks-list-container']}>
                    {
                        networks.map((network) => (
                            <div key={network.name} className={styles['network-item-container'] +' '+ (network.symbol === selectedNetwork.symbol && styles['active'])} onClick={() => selectNetwork(network)}>
                                <div className={styles['network-icon-container']} >
                                    <img src={network.logo} alt=""/>
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
            <div className={styles['tokens-list-wrapper']}>
                <div className={styles['networks-token-search-container']}>
                    <input type="text" placeholder='Search by token name or address' />
                </div>
                <div className={styles['tokens-list-container']}>
                    {tokens.map((token) => (
                        <div key={token.name} className={styles['tokens-item-container'] +' '+ (token.symbol === selectedToken?.symbol && styles['active'])} onClick={() => selectToken(token)}>
                            <div className={styles['tokens-icon-container']} >
                                <img src={token.logo} alt=""/>
                            </div>
                            <div className={styles['tokens-name-container']} >
                                <div className={styles['token-name']} >{token.name}</div>
                                <div className={styles['token-symbol']}>{token.symbol}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}