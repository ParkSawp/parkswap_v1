import React, { useEffect } from 'react';
import styles from "./ModalConnectWallet.module.css"

const ModalConnectWallet = ({ callbacks }) => {
    return (
        <>
            <div className={styles["connectWalletWrapper"]}>
                <div className={styles["connectWalletSearchContainer"]}>
                    <div className={styles["connectWalletSearch"]}>
                            {/* <svg width="21px" height="21px">
                                <title>Search</title>
                                <image width="21px" height="21px" href="/svg/icons/search.svg" />
                            </svg> */}
                            <input type="text" placeholder="Search wallet by name" />
                    </div>
                </div>
                <div className={styles["connectWalletWalletLists"]}>
                    <div className={styles["connectWalletFirstList"]}>
                        <h3 className={styles["connectWalletListTitle"]}>Wallet Options</h3>
                        <ul className={styles["connectWalletList"]}>
                            <li onClick={() => {
                                callbacks.closeModal();
                                /*
                                    Mettre ici le code pour connecter le wallet
                                */
                                callbacks.setIsWalletConnected(true);
                            }}>
                                <img width="40px" height="40px" src="/svg/icons/metamask.svg"></img>
                                <span>Metamask</span>
                            </li>
                            <li>
                                <img width="40px" height="40px" src="svg/icons/braavos_logo.svg"></img>
                                <span>Braavos</span>
                            </li>
                            <li>
                                <img width="35px" height="35px" src="svg/icons/argentx_logo.svg"></img>
                                <span>ArgentX</span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles["connectWalletSecondList"]}>
                        <h3 className={styles["connectWalletListTitle"]}>More Options</h3>
                        <ul className={styles["connectWalletList"]}>
                            <li onClick={() => {
                                callbacks.closeModal();
                                /*
                                    Mettre ici le code pour connecter le wallet
                                */
                                callbacks.setIsWalletConnected(true);
                            }}>
                                <img width="40px" height="40px" src="/svg/icons/okx_logo.svg"></img>
                                <span>OKX Wallet</span>
                            </li>
                            <li>
                                <img width="40px" height="40px" src="svg/icons/walletconnect.svg"></img>
                                <span>WalletConnect</span>
                            </li>
                            <li>
                                <img width="40px" height="40px" src="svg/icons/bitget_logo.svg"></img>
                                <span>Bitget Wallet</span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles["connectWalletThirdList"]}>
                        <h3 className={styles["connectWalletListTitle"]}>Mobile Wallet</h3>
                        <ul className={styles["connectWalletList"]}>
                            <li>
                                <img width="35px" height="35px" src="svg/icons/argentx_logo.svg"></img>
                                <span>ArgentX</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalConnectWallet