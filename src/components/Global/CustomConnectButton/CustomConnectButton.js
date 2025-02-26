import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import styles from "./CustomConnectButton.module.css";
import Translate from "@/src/components/Translate/Translate";

export default function CustomConnectButton({ children, className }) {
    const { address, isConnecting, isDisconnected } = useAccount();

    if(isDisconnected || !address) {
        return (
            <>
                <ConnectKitButton.Custom>
                    {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                        return (
                            <button onClick={show} className={styles["connect-wallet-btn"]+' primary-button '+className}>
                                <Translate>Connect Wallet</Translate>
                            </button>
                        );
                    }}
                </ConnectKitButton.Custom>
            </>
        )
    }

    return (
        <>
            {
                !children
                    ? (
                        <div className={styles["connect-wallet-btn"]+' primary-button'} >
                            {address.substring(0, 6)}...{address.substring(address.length - 4)}
                        </div>
                    )
                    : (
                        <>
                            {children}
                        </>
                    )
            }
        </>
    )
}