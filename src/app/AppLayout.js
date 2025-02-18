import React, {useEffect, useState} from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiConfig, createConfig, http } from "wagmi";
import { mainnet, base, polygon   } from 'wagmi/chains'
import { ConnectKitProvider } from "connectkit";
import Head from "next/head";
import styles from "@/public/css/app.module.css";
import AppSettingsModal from "@/src/components/AppSettingsModal/AppSettingsModal";
import Menu from "@/src/components/Menu/Menu";
import AppStyles from "@/public/css/app.module.css";
import {APP_SETTINGS_DEFAULT, AppSettingContext, getDefaultColorScheme} from "@/src/hooks/contexts";
import connectKitConfig from '../config/connectKitConfig';
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
        },
        setColorScheme: (mode) => {
            setSettings({ ...settings, colorScheme: mode })
        }
    };

    connectKitConfig.subscribe(
        (state) => settings.selectedChainId,
        (chainId) => {
            setSettings({ ...settings, selectedChainId: chainId });
        },
    )

    useEffect(() => {
        setters.setColorScheme(getDefaultColorScheme());
    }, []);

    return (
        <AppSettingContext.Provider value={{ ...settings, ...setters }}>
            <WagmiConfig config={connectKitConfig} >
                <QueryClientProvider client={queryClient}>
                    <ConnectKitProvider>
                        <body className={settings.colorScheme} >
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
                        </body>
                    </ConnectKitProvider>
                </QueryClientProvider>
            </WagmiConfig>
        </AppSettingContext.Provider>
)
}