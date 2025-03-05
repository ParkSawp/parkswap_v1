import styles from "@/src/components/Global/NetworkAndTokenSelector/NetworkAndTokenSelector.module.css";
import React, {useEffect} from "react";
import {formatFromBalance} from "@/src/config/functions";
import Amount from "@/src/components/Global/Amount/Amount";


export default function TokenSelectorItem({ token, onSelectToken, address, isSelected, }) {

    const balance = token.balance && formatFromBalance({value:token.balance, decimals: token.decimals});

    return (
        <div key={token.name}
             className={styles['tokens-item-container'] + ' ' + (isSelected?.symbol && styles['active'])}
             onClick={() => onSelectToken(token)}>
            <div className={styles['tokens-description-container']}>
                <div className={styles['tokens-icon-container']}>
                    <img src={token.logo_uri || '/svg/tokens/icon.404.svg'} alt=""/>
                </div>
                <div className={styles['tokens-name-container']}>
                    <div className={styles['token-name']}>{token.name}</div>
                    <div className={styles['token-symbol']}>{token.symbol}</div>
                </div>
            </div>
            <div className={styles['tokens-balance-container']}>
                {
                    token.balance
                    &&
                    (
                        <>
                            <div className={styles['tokens-balance-value']}>
                                {balance}
                            </div>
                            <div className={styles['tokens-balance-amount']}>
                                { (token.usd > 0) && <Amount amount={parseFloat(balance) * token.usd} /> }
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
};