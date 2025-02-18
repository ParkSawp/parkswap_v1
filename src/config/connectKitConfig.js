import {createConfig, http} from "wagmi";
import {base, mainnet, polygon} from "wagmi/chains";


const connectKitConfig = createConfig({
    chains: [base],
    transports: {
        // [mainnet.id]: http(),
        // [polygon.id]: http(),
        [base.id]: http(),
    },
    appName: "ParkSwap",
    appDescription: "The aggregator of Aggregators"
});

export default connectKitConfig;