import Amount from "@/src/components/Global/Amount/Amount";
import styles from "./portfolio-wallet.module.css";


export default function WalletNetwork({ chain, amount, tokens, onClick, active }) {

    const networkTotalAmount = amount ?? tokens.reduce((total, token) => {
        if(token.chainId === chain.id) {
            return total + token.price.total;
        }
        return total;
    }, 0);

    const selectNetwork = () => onClick(chain.id)

    return (
        <>
            <div className={styles['wallet-network-container']+ ' '+ (active ? styles['wallet-network-active'] :  '')} onClick={selectNetwork}  >
                <div className={styles['wallet-network-description']} >
                    <div  className={styles['wallet-network-description-name']}  >
                        {chain.name}
                    </div>
                    <div className={styles['wallet-network-description-icon']} >
                        <img src={'/img/chains/'+chain.id+'.svg' } alt={chain.name} />
                    </div>
                </div>
                <div className={styles['wallet-network-amount']} >
                    <Amount amount={networkTotalAmount} />
                </div>
            </div>
        </>
    )
}