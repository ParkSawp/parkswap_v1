import {createConfig, http} from "wagmi";
import {base, mainnet, polygon} from "wagmi/chains";


const config = createConfig({
    chains: [mainnet, polygon, base],
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [base.id]: http(),
    },
    appName: "ParkSwap",
    appDescription: "The aggregator of Aggregators"
});

export default config;