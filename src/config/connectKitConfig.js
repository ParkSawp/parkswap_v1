import {createConfig, http} from "wagmi";
import {base} from "wagmi/chains";
import { getDefaultConfig } from "connectkit";
import { injected, metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors";
import {PUBLIC_WALLETCONNECT_PROJECT_ID} from "@/src/config/constants";


const connectKitConfig = createConfig(getDefaultConfig({
    chains: [base],
    autoConnect: false,
    transports: {
        [base.id]: http(),
    },
    appName: "ParkSwap",
    appDescription: "The aggregator of Aggregators",
    connectors: [
        injected(),
        walletConnect({
            projectId: PUBLIC_WALLETCONNECT_PROJECT_ID,
            qrcode: false,
            showQrModal: false
        }),
        metaMask(),
        coinbaseWallet()
    ],
}));

console.log({ projectId: PUBLIC_WALLETCONNECT_PROJECT_ID })

export default connectKitConfig;