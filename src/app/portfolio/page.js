"use client";

import styles from "../../../public/css/portfolio.module.css";

import {motion} from "framer-motion";
import React, {useState} from "react";
import ToggleSwitch from "@/src/components/Global/ToggleSwitch/ToggleSwitch";
import dynamic from "next/dynamic";
import AppLayout from "@/src/app/AppLayout";
import {useAccount} from "wagmi";

const StatsChart = dynamic(() => import("@/src/components/Global/StatsChart/StatsChart"), { ssr: false });

function HomeComponent() {
    const { address } = useAccount();
    // const [address, _] = useState('0xEczMZjMUo5QPCWa9vxZ6me2cjQhqgvFqVU4XBCgx2tSw');
    const [showNft, setShowNft] = useState(true);
    const [networks, __] = useState([
        { icon: 'eth' },
        { icon: 'usdt' },
        { icon: 'base' },
    ]);

    if(!address) {
        return (
            <motion.div className={styles["portfolio-wrapper"]} initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}}>
                Connect your wallet
            </motion.div>
        )
    }

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
                                            <span>Receive </span>
                                            <img src="/svg/icons/send.svg" alt="Send"/>
                                        </button>
                                        <button
                                            className={styles['transaction-option'] + ' ' + styles['transaction-option-receive']}>
                                            <img src="/svg/icons/receive.svg" alt="Receive"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["header-amount-details"]}>
                                <div className={styles["header-amount"]}>
                                    <div className={styles["header-amount-amount"]}>$32,093,90</div>
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
                                    networks.map((network) => (
                                        <div className={styles['wallet-network']}>
                                            <img src={`/svg/tokens/${network.icon}.svg`} alt={network.name}/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles["wallet-options"]}>
                                <div className={styles['wallet-option-item']}>Portfolio</div>
                                <div className={styles['wallet-option-item']}>History</div>
                                <div className={styles['wallet-option-item']}>Settings</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles["portfolio-container-body"]}>
                        <div className={styles["body-container-body"]}>
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Asset</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td scope="row">ETH</td>
                                        <td>$667</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">USDT</td>
                                        <td>$667</td>
                                        <td>9.2</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">USDC</td>
                                        <td>$667</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td scope="row">UNI</td>
                                        <td>$667</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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