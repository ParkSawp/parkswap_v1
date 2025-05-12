"use client";

import styles from "../../../public/css/portfolio.module.css";

import {motion} from "framer-motion";
import React, {useState} from "react";
import ToggleSwitch from "@/src/components/Global/ToggleSwitch/ToggleSwitch";
import dynamic from "next/dynamic";
import AppLayout from "@/src/app/AppLayout";
import { WalletIcon } from "@/src/components/Icon/Icon";
import {useAccount} from "wagmi";
import CustomConnectButton from "@/src/components/Global/CustomConnectButton/CustomConnectButton";
import PortfolioWallet from "@/src/components/Portfolio/PortfolioWallet/PortfolioWallet";
import PortfolioTransactions from "@/src/components/Portfolio/PortfolioTransactions/PortfolioTransactions";
import Translate from "@/src/components/Translate/Translate";
import Amount from "@/src/components/Global/Amount/Amount";

const StatsChart = dynamic(() => import("@/src/components/Global/StatsChart/StatsChart"), { ssr: false });

const VIEWS = {
    TOKEN: 'token',
    HISTORY: 'history',
}

function HomeComponent() {
    const { address } = useAccount();
    // const [address, _] = useState('0xEczMZjMUo5QPCWa9vxZ6me2cjQhqgvFqVU4XBCgx2tSw');
    const [showNft, setShowNft] = useState(true);
    const [currentView, setCurrentView] = useState(VIEWS.TOKEN);
    const [networks, __] = useState([
        { icon: 'eth' },
        { icon: 'usdt' },
        { icon: 'base' },
    ]);

    if(!address) {
        return (
            <motion.div className={styles["portfolio-wrapper"]} initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}}>
                <div className={styles["portfolio-no-address-icon-container"]}>
                    <WalletIcon />
                </div>
                <div>Connect your wallet</div>
                <div className={styles["portfolio-custom-connect-btn"]}>
                    <CustomConnectButton />
                </div>
            </motion.div>
        )
    }

    const showTokens = () => setCurrentView(VIEWS.TOKEN);
    const showHistory = () => setCurrentView(VIEWS.HISTORY);

    return (
        <>
            <motion.div
                className={styles["portfolio-wrapper"]}
                initial={{opacity: 0, scale: 0.5}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
            >
                <div className={styles["portfolio-container"]}>
                    <div className={styles['portfolio-wallet-description']}>
                        <div className={styles["portfolio-container-header"]}>
                            <div className={styles['portfolio-wallet-details']}>
                                <div className={styles["header-picture-container"]}>
                                    <img src='/svg/icons/user-white.svg' alt=''
                                         className={styles["header-picture"]}/>
                                </div>
                                <div className={styles["header-title"]}>
                                    <div className={styles["header-title-title"]}>My Account</div>
                                    <div className={styles["header-title-address"]}>
                                        <span className={styles['address-container']}>{address}</span>
                                        <span className={styles["address-copy-button"]}>
                                            <img src="/svg/icons/copy.svg" alt="Copy"/>
                                        </span>
                                    </div>
                                    <div className={styles['transactions-options-container']}>
                                        <button
                                            className={styles['transaction-option'] + ' ' + styles['transaction-option-send']}>
                                            <span><Translate>Send</Translate></span>
                                            <img src="/svg/icons/send.svg" alt="Send"/>
                                        </button>
                                        <button
                                            className={styles['transaction-option'] + ' ' + styles['transaction-option-receive']}>
                                            <span><Translate>Receive</Translate></span>
                                            <img src="/svg/icons/receive.svg" alt="Receive"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["header-amount-details"]}>
                                <div className={styles["header-amount"]}>
                                    <div className={styles["header-amount-amount"]}>
                                        <Amount amount={32093} />
                                    </div>
                                    <div className={styles["header-amount-percent"]}>-3.98%</div>
                                </div>
                                <div className={styles['nft-amount-details']}>
                                    <span className={styles['nft-amount']}>$0,00</span>
                                    <ToggleSwitch checked={showNft} onChange={setShowNft} name='showNft'/>
                                    <span className={styles['nft-amount-label']}> NFT</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles["portfolio-networks-options"]}>
                            <div className={styles['wallet-networks-container']}>
                                {
                                    networks.map((network, index) => (
                                        <div key={index} className={styles['wallet-network']}>
                                            <img src={`/svg/tokens/${network.icon}.svg`} alt={network.name}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles["wallet-options"]}>
                                <div className={styles['wallet-option-item']} onClick={showTokens}>Portfolio</div>
                                <div className={styles['wallet-option-item']} onClick={showHistory} >History</div>
                                {/*<div className={styles['wallet-option-item']} onClick={showSettings}>Settings</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={styles["portfolio-container-body"]}>
                        { currentView === VIEWS.TOKEN && <PortfolioWallet /> }
                        { currentView === VIEWS.HISTORY && <PortfolioTransactions /> }
                    </div>
                </div>
            </motion.div>
            <motion.div className={styles["portfolio-graphics-wrapper"]}>
                <div className={styles['graphics-container']}>
                    <div className={styles['graphic-container']}>
                        <StatsChart title='Protocol Exposure'/>
                    </div>
                    <div className={styles['graphic-container']}>
                        <StatsChart title='Token Exposure'/>
                    </div>
                    <div className={styles['graphic-container']}>
                        <img src="/img/nft.jpg" alt="NFT"/>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default function Home() {

    return (<AppLayout>
        <HomeComponent/>
    </AppLayout>)
}