import styles from "./empty-wallet.module.css";
import PortfolioAddressInput from "@/src/components/Portfolio/PortfolioAddressInput/PortfolioAddressInput";
import {LoadingIcon, SearchIcon, WalletIcon} from "@/src/components/Icon/Icon";
import CustomConnectButton from "@/src/components/Global/CustomConnectButton/CustomConnectButton";
import {motion} from "framer-motion";
import React, {useEffect} from "react";
import Translate from "@/src/components/Translate/Translate";
import {useGetWallets} from "@/src/hooks/useGetWallets";
import TrackedPortfolioItem from "@/src/components/Portfolio/TrackedPortfolioItem/TrackedPortfolioItem";


export default function EmptyWalletView({ connectedWalletAddress, watchNewAddress, address, setAddress}) {

    const useMyAddress  = () => watchNewAddress(connectedWalletAddress);
    const { wallets, loading, fetchWallets } = useGetWallets();

    let inputClassName = styles['portfolio-address-input'];
    if(connectedWalletAddress) {
        inputClassName += ' '+styles['connected-wallet'];
    }

    useEffect(() => {
        fetchWallets();
    }, []);

    return (
        <motion.div className={styles["empty-portfolio-wrapper"]} initial={{opacity: 0, scale: 0.5}}
                    animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}}>
            <div className={styles["empty-portfolio-container"]}>
                <h2 className={styles["empty-portfolio-title"]}>
                    <div>
                        <Translate>An intelligent overview of your digital assets.</Translate>
                    </div>
                    <div>
                        <Translate>Track, analyze, perform.</Translate>
                    </div>
                </h2>
                <div className={styles["empty-portfolio-header-image-wrapper"]} >
                    <img src="/img/portfolio-check-main.png" alt="Portfolio" height={250}/>
                </div>
                <div className={styles['portfolio-address-input-wrapper']}>
                    <PortfolioAddressInput className={inputClassName} value={address} onChange={setAddress} />
                    {
                        connectedWalletAddress ? (
                            <div className={styles['portfolio-address-search-button-wrapper']} >
                                <button onClick={useMyAddress} >
                                    <Translate>Track my address</Translate>
                                </button>
                            </div>
                        ) : (
                            <div className={styles['portfolio-address-search-icon-wrapper']} >
                                <SearchIcon />
                            </div>
                        )
                    }
                </div>
                {
                    !connectedWalletAddress ? (
                        <div className={styles["portfolio-custom-connect-btn"]}>
                            <CustomConnectButton />
                        </div>
                    ) : null
                }

                <div className={styles["portfolio-tracked-addresses-input-wrapper"]}>
                    {
                        loading
                            ? (<div className={styles['portfolio-tracked-addresses-loading']}><LoadingIcon /></div>)
                            : <div className={styles['portfolio-tracked-addresses-wrapper']} >
                                {
                                    wallets.map((wallet) => (
                                        <TrackedPortfolioItem key={wallet.address} wallet={wallet} watchNewAddress={watchNewAddress} />
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </motion.div>
    );
}