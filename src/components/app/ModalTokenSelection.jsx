
import React, { useEffect } from 'react';
import styles from "./ModalTokenSelection.module.css"

const ModalTokenSelection = ({ isOpen, closeModal, modalTitle, modalContent }) => {
   
    return (
      <>
        <div className={styles["modalTokenContainer"]}>
            <div className={styles["modalTokenContainerHeader"]}>
                <div className={styles["ContainerHeaderSearchContainer"]}>
                    <svg width="21px" height="21px">
                        <title>Search</title>
                        <image width="21px" height="21px" href="/svg/icons/search.svg" />
                    </svg>
                    <input type="text" placeholder="Search name or address"></input>
                </div>
            </div>
            <div className={styles["modalTokenContainerTokens"]}>
                <ul>
                    <li>
                        <span className={styles["ContainerTokensIcon"]}>
                            <svg width="40px" height="40px">
                                            <title>Ether</title>
                                            <image width="40px" height="40px" href="/svg/icons/eth_icon.svg"/>
                            </svg>
                        </span>
                        <span className={styles["ContainerTokensName"]}>
                            <span className={styles["TokenName"]}>Ether</span>
                            <span className={styles["TokenAddress"]}>ETHER <i>0xc999999999</i></span>
                        </span>
                    </li>
                    <li>
                        <span className={styles["ContainerTokensIcon"]}>
                            <svg width="40px" height="40px">
                                            <title>DAI</title>
                                            <image width="40px" height="40px" href="/svg/icons/dai-logo.svg"/>
                            </svg>
                        </span>
                        <span className={styles["ContainerTokensName"]}>
                            <span className={styles["TokenName"]}>DAI</span>
                            <span className={styles["TokenAddress"]}>DAI STABLECOIN <i>0xb839382</i></span>
                        </span>
                    </li><li>
                        <span className={styles["ContainerTokensIcon"]}>
                            <svg width="40px" height="40px">
                                            <title>SOL</title>
                                            <image width="40px" height="40px" href="/svg/icons/sol-logo.svg"/>
                            </svg>
                        </span>
                        <span className={styles["ContainerTokensName"]}>
                            <span className={styles["TokenName"]}>SOL</span>
                            <span className={styles["TokenAddress"]}>SOLANA <i>0xb83ef83921092</i></span>
                        </span>
                    </li><li>
                        <span className={styles["ContainerTokensIcon"]}>
                            <svg width="40px" height="40px">
                                            <title>Tether USDT</title>
                                            <image width="40px" height="40px" href="/svg/icons/theter-logo.svg"/>
                            </svg>
                        </span>
                        <span className={styles["ContainerTokensName"]}>
                            <span className={styles["TokenName"]}>Tether</span>
                            <span className={styles["TokenAddress"]}>Tether USDT <i>0xc999e999999</i></span>
                        </span>
                    </li><li>
                        <span className={styles["ContainerTokensIcon"]}>
                            <svg width="40px" height="40px">
                                            <title>STRK</title>
                                            <image width="40px" height="40px" href="/svg/icons/strk-logo.svg"/>
                            </svg>
                        </span>
                        <span className={styles["ContainerTokensName"]}>
                            <span className={styles["TokenName"]}>STRK</span>
                            <span className={styles["TokenAddress"]}>STARKNET TOKEN<i>0xc999999999</i></span>
                        </span>
                    </li><li>
                        <span className={styles["ContainerTokensIcon"]}>
                            <svg width="40px" height="40px">
                                            <title>Ether</title>
                                            <image width="40px" height="40px" href="/svg/icons/uni-logo.svg"/>
                            </svg>
                        </span>
                        <span className={styles["ContainerTokensName"]}>
                            <span className={styles["TokenName"]}>UNI</span>
                            <span className={styles["TokenAddress"]}>UNISWAP <i>0xc999999999</i></span>
                        </span>
                    </li><li>
                        <span className={styles["ContainerTokensIcon"]}>
                            <svg width="40px" height="40px">
                                            <title>LTC</title>
                                            <image width="40px" height="40px" href="/svg/icons/ltc-logo.svg"/>
                            </svg>
                        </span>
                        <span className={styles["ContainerTokensName"]}>
                            <span className={styles["TokenName"]}>LTC</span>
                            <span className={styles["TokenAddress"]}>LITECOIN <i>0xc37279999999</i></span>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
      </>
    );
  }
  
  export default ModalTokenSelection;
  