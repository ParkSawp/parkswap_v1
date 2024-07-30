import React, { useEffect } from 'react';
import styles from "./ModalConnectWallet.module.css"

const ModalConnectWallet = ({ callbacks }) => {
    return (
        <>
            <div className={styles["connectWalletWrapper"]}>
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
                        <img width="40px" height="40px" src="svg/icons/coinbasewallet.svg"></img>
                        <span>Coinbase Wallet</span>
                    </li>
                    <li>
                        <img width="40px" height="40px" src="svg/icons/walletconnect.svg"></img>
                        <span>WalletConnect</span>
                    </li>
                    <li>
                        <img width="40px" height="40px" src="svg/icons/trustwallet.svg"></img>
                        <span>TrustWallet</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default ModalConnectWallet