import styles from "@/src/components/Global/NetworkAndTokenSelector/NetworkAndTokenSelector.module.css";
import React from "react";
import {useAccount, useBalance} from "wagmi";
import {formatFromBalance} from "@/src/config/functions";


export default function TokenSelectorItem({ token, onSelectToken, isSelected }) {

    const { address } = useAccount();
    const { data: balance } = useBalance({
        address: address,
        token: token.address
    });

    return (
        <div key={token.name}
             className={styles['tokens-item-container'] + ' ' + (isSelected?.symbol && styles['active'])}
             onClick={() => onSelectToken(token)}>
            <div className={styles['tokens-description-container']}>
                <div className={styles['tokens-icon-container']}>
                    <img src={token.logo_uri} alt=""/>
                </div>
                <div className={styles['tokens-name-container']}>
                    <div className={styles['token-name']}>{token.name}</div>
                    <div className={styles['token-symbol']}>{token.symbol}</div>
                </div>
            </div>
            <div className={styles['tokens-balance-container']}>
                {
                    balance?.value
                    &&
                    (
                        <>
                            <div className={styles['tokens-balance-value']}>
                                {formatFromBalance(balance)}
                            </div>
                            <div className={styles['tokens-balance-amount']}>
                                0 $
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
};