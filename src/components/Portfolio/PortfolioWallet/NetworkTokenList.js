import styles from "@/src/components/Portfolio/PortfolioWallet/portfolio-wallet.module.css";
import Amount from "@/src/components/Global/Amount/Amount";
import {ChartIcon, SwapIcon, Transactions} from "@/src/components/Icon/Icon";
import React from "react";
import {useTranslation} from "react-i18next";
import TokenType from "@/src/components/Portfolio/PortfolioWallet/TokenType";


export default function NetworkTokenList({ tokens, chainId }) {
    const { t } = useTranslation();

    return (
        <>
            {
                tokens.map((token, index) => (
                    <tr key={index} className={styles["token-row"]}>
                        <td className={styles['portfolio-wallet-table-column']} scope="row">
                            <div className={styles['token-details-container']}>
                                <div className={styles['token-image-container']}>
                                    <img src={token.logo_uri ?? '/svg/tokens/icon.404.svg'} alt="Token Logo" width={25} className={styles['token-image']}/>
                                    <span className={styles['token-network-image-container']}>
                                        <img src={'/img/chains/'+token.chainId+'.svg'} alt="Token Logo" width={25}/>
                                    </span>
                                </div>
                                <div>
                                    <div>{token.symbol}</div>
                                    <div className={styles['token-address-container']}>
                                        {token.shortAddress}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className={styles['portfolio-wallet-table-column']}>
                            <div className={styles['token-type-container']} >
                                <TokenType token={token} />
                            </div>
                        </td>
                        <td className={styles['portfolio-wallet-table-column']}>{token.price.balance}</td>
                        <td className={styles['portfolio-wallet-table-column']}><Amount amount={token.price.value}/></td>
                        <td className={styles['portfolio-wallet-table-column']}><Amount amount={token.price.total}/></td>
                        <td className={styles['portfolio-wallet-table-column']}>
                            <div className={styles['portfolio-wallet-table-options']} >
                                <button title={t('Swap')} className={styles['token-option-button']+' '+styles['swap-button']} onClick={() => console.log('swap')}>
                                    <SwapIcon />
                                </button>
                                <button title={t('Swap')} className={styles['token-option-button']+' '+styles['transaction-button']} onClick={() => console.log('transactions')}>
                                    <Transactions />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))
            }
        </>
    );
}