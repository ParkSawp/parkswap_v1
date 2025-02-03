import React, {useState} from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet, base, polygon   } from 'wagmi/chains'
import { ConnectKitProvider } from "connectkit";
import Head from "next/head";
import styles from "@/public/css/app.module.css";
import AppSettingsModal from "@/src/components/AppSettingsModal/AppSettingsModal";
import Menu from "@/src/components/Menu/Menu";
import AppStyles from "@/public/css/app.module.css";
import {APP_SETTINGS_DEFAULT, AppSettingContext} from "@/src/hooks/contexts";
import config from './config';
import { ToastContainer } from 'react-toastify';
import ParkSwapSocialNetworks from "@/src/components/ParkSwapSocialNetworks/ParkSwapSocialNetworks";

const queryClient = new QueryClient();


export default function AppLayout({ children, header = {} }) {
    const [settingsButtonVal, setSettingsButtonVal] = useState("...");
    const [isSettingsOpen, setIsSettingOpen] = useState(false);
    const [settings, setSettings] = useState(APP_SETTINGS_DEFAULT);
    const closeSettings = () => {
        setIsSettingOpen(false);
        setSettingsButtonVal("...");
    };
    const openSettings = () => {
        setIsSettingOpen(true);
        setSettingsButtonVal("");
    };


    const setters = {
        setSlippage: (slippage) => {
            setSettings({ ...settings, slippage });
        }
    };

    config.subscribe(
        (state) => settings.selectedChainId,
        (chainId) => {
            setSettings({ ...settings, selectedChainId: chainId });
            console.log(`Chain ID changed to ${chainId}`);
        },
    )

    return (
        <AppSettingContext.Provider value={{ ...settings, ...setters }}>
            <WagmiConfig config={config} >
                <QueryClientProvider client={queryClient}>
                    <ConnectKitProvider>
                        <>
                            <Head>
                                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                                <title>{header?.title || 'Parkswap | App'}</title>
                            </Head>
                            <div className={styles["site-wrapper"]}>
                                <AppSettingsModal isOpen={isSettingsOpen} closeModal={closeSettings}/>
                                <Menu openSettings={openSettings} settingsButtonVal={settingsButtonVal}/>
                                {children}
                            </div>
                            <div className={AppStyles["app-footer"]}>© 2024 ParkSwap</div>
                            <ToastContainer />
                            <ParkSwapSocialNetworks />
                        </>
                    </ConnectKitProvider>
                </QueryClientProvider>
            </WagmiConfig>
        </AppSettingContext.Provider>
)
}