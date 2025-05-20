"use client"
import {createConfig, http} from "wagmi";
import {base} from "@wagmi/core/chains";
import { getDefaultConfig } from "connectkit";
import { injected, metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors";
import {PUBLIC_WALLETCONNECT_PROJECT_ID} from "@/src/config/constants";


const connectors = [];

if(typeof window !== "undefined") {
    connectors.push(injected());
    connectors.push(walletConnect({
        projectId: PUBLIC_WALLETCONNECT_PROJECT_ID,
        qrcode: false,
        showQrModal: false
    }));
    connectors.push(metaMask());
    connectors.push(coinbaseWallet());
}

const connectKitConfig = createConfig(getDefaultConfig({
    chains: [base],
    autoConnect: false,
    transports: {
        [base.id]: http(),
    },
    appName: "ParkSwap",
    appDescription: "The aggregator of Aggregators",
    connectors,
}));

export default connectKitConfig;