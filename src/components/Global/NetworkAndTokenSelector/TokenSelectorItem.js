import styles from "@/src/components/Global/NetworkAndTokenSelector/NetworkAndTokenSelector.module.css";
import React, {useEffect} from "react";
import {useAccount, useBalance} from "wagmi";
import {formatFromBalance} from "@/src/config/functions";
import useGetUsdPrice from "@/src/hooks/useGetUsdPrice";
import {USD_PRICE_REFRESH_TIME} from "@/src/config/constants";
import Amount from "@/src/components/Global/Amount/Amount";


export default function TokenSelectorItem({ token, onSelectToken, isSelected }) {

    const { address } = useAccount();
    const { amount: usdAmount, updateAmount } = useGetUsdPrice();
    const { data: balance } = useBalance({
        address: address,
        token: token.address
    });

    useEffect(() => {
        updateAmount(token, balance?.value);
        // const update = () => updateAmount(token.name, balance.value);
        // setInterval(update, USD_PRICE_REFRESH_TIME)
        // return () => clearInterval(update);
    }, [balance]);

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
                                <Amount amount={usdAmount} />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
};