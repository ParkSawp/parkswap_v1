'use client'

import React, {useEffect} from 'react';
import styles from "@/src/components/Global/NetworkAndTokenSelector/NetworkAndTokenSelector.module.css";
import TokenSelectorItem from "@/src/components/Global/NetworkAndTokenSelector/TokenSelectorItem";
import useGetWalletTokens from "@/src/hooks/useGetWalletTokens";
import useRecentToken from "@/src/hooks/useRecentToken";

const QuickTokens = function({ icon, title, recentTokens, onSelectToken }) {

    if(recentTokens.length === 0) {
        return;
    }

    return (
        <>
            {
                icon
                &&
                (
                    <div className={styles['token-list-sub-title-container']}>
                        <div className={styles['token-list-sub-title-icon-container']}>
                            <img src={icon} alt={title} height={20}/>
                        </div>
                        <div className={styles['token-list-sub-title']}>{title}</div>
                    </div>
                )
            }
            <div className={styles['recent-tokens-container']} >
                {
                    recentTokens.map((token) => (
                        <div key={token.address} className={styles['recent-token-item-container']} onClick={() => onSelectToken(token)}>
                            <img src={token.logo_uri} alt={token.name} height={20}/>
                            <div>{token.symbol}</div>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

export default function TokenList({loading, tokens, onSelectToken, selectedToken}) {

    const {userTokens, userTokensAddress} = useGetWalletTokens(tokens);
    const {tokens: recentTokens} = useRecentToken();

    const defaultTokens = tokens ? tokens.filter((token) => token.is_default).splice(0, 6) : [];

    if (loading) {
        return (
            <div className={styles['tokens-loading-container']}>
                <img src="/img/w-loading.gif" alt="Token loading" height={20}/>
                Loading...
            </div>
        );
    }

    const otherTokens = (!userTokensAddress.length ? tokens : tokens.filter((token) => !userTokensAddress.includes(token.address)));

    return (
        <div className={styles['tokens-list-container']}>
            <QuickTokens recentTokens={defaultTokens} onSelectToken={onSelectToken}  />
            <QuickTokens recentTokens={recentTokens} onSelectToken={onSelectToken} icon="/img/main_logo_white.png" title="Recent Tokens" />
            {
                (userTokens.length > 0)
                &&
                (
                    <>
                        <div className={styles['token-list-sub-title-container']}>
                            <div className={styles['token-list-sub-title-icon-container']}>
                                <img src="/img/main_logo_white.png" alt="Tokens" height={20} />
                            </div>
                            <div className={styles['token-list-sub-title']}>Your Tokens</div>
                        </div>
                        {
                            userTokens.map((token) => <TokenSelectorItem key={token.address}
                                                                         isSelected={token.symbol === selectedToken}
                                                                         token={token} onSelectToken={onSelectToken}/>)
                        }
                    </>
                )
            }
            {
                ((recentTokens.length > 0 || userTokens.length > 0) && otherTokens.length > 0)
                &&
                (
                    <div className={styles['token-list-sub-title-container']+' '+styles['other-tokens']}>
                        <div className={styles['token-list-sub-title-icon-container']}>
                            <img src="/svg/icons/walletconnect.svg" alt="Tokens" height={20} />
                        </div>
                        <div className={styles['token-list-sub-title']}>Tokens</div>
                    </div>
                )
            }
            {
                otherTokens?.map((token) => <TokenSelectorItem
                    key={token.address}
                    isSelected={token.symbol === selectedToken}
                    token={token} onSelectToken={onSelectToken}
                />)
            }
        </div>
    )
}