import React, { useState, useEffect } from 'react';
import styles from "./ModalTokenSelection.module.css";
import TokenItem from "./tokenItem/tokenItem"; // Assurez-vous que le chemin et le nom du fichier sont corrects
import axios from "axios";

const ModalTokenSelection = ({ isOpen, closeModal, modalTitle, modalContent }) => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        axios.get('/api/tokens')
        .then(response => {
            setTokens(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the tokens!", error);
        });
    }, []);

    return (
        <>
            <div className={styles["modalTokenContainer"]}>
                <div className={styles["modalTokenContainerHeader"]}>
                    <div className={styles["ContainerHeaderSearchContainer"]}>
                        {/* <svg width="21px" height="21px">
                            <title>Search</title>
                            <image width="21px" height="21px" href="/svg/icons/search.svg" />
                        </svg> */}
                        <input type="text" placeholder="Search name or address" />
                    </div>
                    <div className={styles["ContainerHeaderTokensContainer"]}>
                        <div className={styles["ContainerHeaderToken"]}>
                            <svg width="25px" height="25px">
                                <title>Ether</title>
                                <image width="25px" height="25px" href="/svg/icons/eth_icon.svg" />
                            </svg>
                            <span>ETH</span>
                        </div>
                        <div className={styles["ContainerHeaderToken"]}>
                            <svg width="25px" height="25px">
                                <title>DAI</title>
                                <image width="25px" height="25px" href="/svg/icons/dai-logo.svg" />
                            </svg>
                            <span>DAI</span>
                        </div>
                        <div className={styles["ContainerHeaderToken"]}>
                            <svg width="25px" height="25px">
                                <title>SOL</title>
                                <image width="25px" height="25px" href="/svg/icons/sol-logo.svg" />
                            </svg>
                            <span>SOL</span>
                        </div>
                        <div className={styles["ContainerHeaderToken"]}>
                            <svg width="25px" height="25px">
                                <title>STRK</title>
                                <image width="25px" height="25px" href="/svg/icons/strk-logo.svg" />
                            </svg>
                            <span>STRK</span>
                        </div>
                    </div>
                </div>
                <div className={styles["modalTokenContainerTokens"]}>
                    <ul>
                        {tokens.map((token, index) => (
                            <TokenItem
                                key={index}
                                tokenSymbol={token.name}
                                tokenName={token.symbol}
                                tokenAddress={token.address}
                                tokenLogo={token.logo}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ModalTokenSelection;
