import React, { useState, useEffect } from 'react';
import styles from "../ModalTokenSelection/ModalTokenSelection.module.css"
import addStyles from "./ModalAddToken.module.css";
import TokenItem from "../ModalTokenSelection/tokenItem/tokenItem";
import axios from "axios";

const ModalAddToken = () => {
    const [tokens, setTokens] = useState([
        {
            "name": "RARE PEPE",
            "address": "0x42069cc15F5BEfb510430d22Ff1c9A1b3ae22CfE",
            "addressSymbol":"0x42069cc15F",
            "symbol": "$RARE",
            "logo": "/svg/icons/pepe-pepe-logo.svg",
            "imported":true
        }
    ]);

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
                        {/* <div className={styles["ContainerHeaderToken"]} >
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
                        </div> */}
                    </div>
                </div>
                <div className={styles["modalTokenContainerTokens"]}>
                    {tokens.length != 0 && (<ul>
                        {
                            tokens.map((token, index) => (
                                    <TokenItem
                                        key={index}
                                        onClick={() => {
                                         
                                        }}
                                        tokenSymbol={token.name}
                                        tokenName={token.symbol}
                                        tokenAddress={token.address}
                                        tokenLogo={token.logo}
                                        imported={token.imported}
                                    />
                                ))
                        }
                    </ul>)}
                    {tokens.length == 0 &&(<div className={addStyles["modalAddTokenContainerWarning"]}>
                        Disclaimer : Make sure you typed in the correct contract address.
                    </div>)}
                </div>
            </div>
        </>
    );
}

export default ModalAddToken