import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";
import styles from "./CustomConnectButton.module.css";

export default function CustomConnectButton({ children, className }) {
    const { address, isConnecting, isDisconnected } = useAccount();

    if(isDisconnected || !address) {
        return (
            <>
                <ConnectKitButton.Custom>
                    {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
                        return (
                            <button onClick={show} className={styles["connect-wallet-btn"]+' '+className}>
                                Connect Wallet
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
                        <div className={styles["connect-wallet-btn"]} >
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