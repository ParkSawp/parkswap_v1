"use client";

import styles from "../../../public/css/portfolio.module.css";

import {motion} from "framer-motion";
import React, {useEffect, useState} from "react";
import ToggleSwitch from "@/src/components/Global/ToggleSwitch/ToggleSwitch";
import dynamic from "next/dynamic";
import AppLayout from "@/src/app/AppLayout";
import {LoadingIcon, ReloadIcon, WalletIcon} from "@/src/components/Icon/Icon";
import {useAccount} from "wagmi";
import { isAddress } from "ethers";
import CustomConnectButton from "@/src/components/Global/CustomConnectButton/CustomConnectButton";
import PortfolioWallet from "@/src/components/Portfolio/PortfolioWallet/PortfolioWallet";
import PortfolioTransactions from "@/src/components/Portfolio/PortfolioTransactions/PortfolioTransactions";
import Translate from "@/src/components/Translate/Translate";
import Amount from "@/src/components/Global/Amount/Amount";
import useGetPortfolio from "@/src/hooks/useGetPortfolio";
import {PORTFOLIO} from "@/src/config/constants";
import {useTranslation} from "react-i18next";
import { useRouter } from "next/navigation";
import PortfolioAddressInput from "@/src/components/Portfolio/PortfolioAddressInput/PortfolioAddressInput";
import { formatDistance } from "date-fns";

const StatsChart = dynamic(() => import("@/src/components/Global/StatsChart/StatsChart"), { ssr: false });

const VIEWS = {
    TOKEN: 'token',
    HISTORY: 'history',
};

function HomeComponent({ params }) {
    const { address: connectedWalletAddress } = useAccount();
    const { t } = useTranslation();
    const [showNft, setShowNft] = useState(true);
    const [currentView, setCurrentView] = useState(VIEWS.TOKEN);
    const [address, setAddress] = useState((params?.address) ? params.address : connectedWalletAddress);
    const [otherAddressToWatch, setOtherAddressToWatch] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date());
    const { data: portfolioData, lastUpdate, loading: portfolioLoading, error, fetchPortfolio } = useGetPortfolio();
    const router = useRouter()

    useEffect(() => {
        if(!address) return;
        fetchPortfolio({ address });
        // const intervalId = setInterval(() => {
        //     fetchPortfolio({ address });
        // },  PORTFOLIO.REFRESH_INTERVAL);
        // return () => clearInterval(intervalId);
    }, [address, fetchPortfolio]);

    // useEffect(() => {
    //     setAddress(connectedWalletAddress);
    // }, [connectedWalletAddress]);

    useEffect(() => {
        const updateCurrentDate = () => setCurrentDate(new Date());
        const timeIntervalId = setInterval(updateCurrentDate, PORTFOLIO.REFRESH_INTERVAL);
        return () => clearInterval(timeIntervalId);
    }, [currentDate]);

    if(!address || !isAddress(address)) {
        return (
            <motion.div className={styles["portfolio-wrapper"]} initial={{opacity: 0, scale: 0.5}}
                        animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}}>
                <div>
                    <PortfolioAddressInput value={address} onChange={setAddress} />
                </div>
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

    const reloadCurrentAddress = () => fetchPortfolio({ address });
    const watchNewAddress = (address) => {
        if(isAddress(address)) {
            router.push(`/portfolio/address/${address}`);
            return;
        }
        setOtherAddressToWatch(address);
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
                                    <div className={styles["header-title-title"]}>
                                        {
                                            address === connectedWalletAddress
                                            ? <Translate>My Account</Translate> : null
                                        }
                                    </div>
                                    <div className={styles["header-title-address"]}>
                                        <span className={styles['address-container']}>{address}</span>
                                        <span className={styles["address-copy-button"]}>
                                            <img src="/svg/icons/copy.svg" alt="Copy"/>
                                        </span>
                                    </div>
                                    <div className={styles["header-amount-amount"]}>
                                        <Amount amount={portfolioData?.amount.total ?? 0} />
                                    </div>
                                    <div className={styles['transactions-options-container']}>
                                        {
                                            (address === connectedWalletAddress)
                                            && (
                                                <>
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
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles["header-amount-details"]}>
                                {/*<div className={styles["header-amount"]}>*/}
                                {/*    <div className={styles["header-amount-amount"]}>*/}
                                {/*        /!*<Amount amount={portfolioData?.amount.total ?? 0} />*!/*/}
                                {/*    </div>*/}
                                {/*    /!*<div className={styles["header-amount-percent"]}>-3.98%</div>*!/*/}
                                {/*</div>*/}
                                {/*<div className={styles['nft-amount-details']}>
                                    <span className={styles['nft-amount']}>$0,00</span>
                                    <ToggleSwitch checked={showNft} onChange={setShowNft} name='showNft'/>
                                    <span className={styles['nft-amount-label']}> NFT</span>
                                </div>*/}
                            </div>
                        </div>
                        <div className={styles["portfolio-networks-options"]}>
                            <div className={styles['wallet-address-input-container']}>
                                <PortfolioAddressInput value={otherAddressToWatch} onChange={watchNewAddress} />
                                {
                                    portfolioLoading ? <LoadingIcon size={25} /> : null
                                }
                            </div>
                            <div className={styles["wallet-options"]}>
                                <div className={styles['wallet-option-item']} >
                                    <button  className={styles['wallet-option-item-button']} onClick={reloadCurrentAddress} >
                                        <ReloadIcon />
                                    </button>
                                    <span>{formatDistance(currentDate, lastUpdate, { addSuffix: true })}</span>
                                </div>
                                <div className={styles['wallet-option-item']} onClick={showTokens}>
                                    <span>Portfolio</span>
                                </div>
                                <div className={styles['wallet-option-item']} onClick={showHistory} >
                                    <span>History</span>
                                </div>
                                {/*<div className={styles['wallet-option-item']} onClick={showSettings}>Settings</div>*/}
                            </div>
                        </div>
                    </div>
                    <div className={styles["portfolio-container-body"]}>
                        { currentView === VIEWS.TOKEN && <PortfolioWallet tokens={portfolioData?.tokens} amount={portfolioData?.amount} chains={portfolioData?.chains} /> }
                        { currentView === VIEWS.HISTORY && <PortfolioTransactions address={address} lastUpdate={lastUpdate} /> }
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

export default function PortfolioPage({ params }) {

    return (<AppLayout bodyClassName="portfolio-page" >
        <HomeComponent params={params} />
    </AppLayout>)
}