'use client'

import React, {useEffect} from 'react';
import styles from "@/src/components/Global/NetworkAndTokenSelector/NetworkAndTokenSelector.module.css";
import TokenSelectorItem from "@/src/components/Global/NetworkAndTokenSelector/TokenSelectorItem";
import useRecentToken from "@/src/hooks/useRecentToken";
import Translate from "@/src/components/Translate/Translate";
import {useTranslation} from "react-i18next";
import {CoinIcon, HistoryIcon, LoadingIcon, WalletIcon} from "@/src/components/Icon/Icon";

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
                            {
                                typeof icon === 'string'
                                    ? <img src={icon} alt={title} height={20}/>
                                    : icon
                            }
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

export default function TokenList({loading, tokens, onSelectToken, address, selectedToken}) {
    const { t } = useTranslation();
    const {tokens: recentTokens} = useRecentToken();

    const defaultTokens = tokens ? tokens.filter((token) => token.is_default).splice(0, 6) : [];

    if (loading) {
        return (
            <div className={styles['tokens-loading-container']}>
                <LoadingIcon height={20} />
                <Translate>Loading</Translate>...
            </div>
        );
    }

    const userTokens = tokens.filter((token) => token.balance);
    const otherTokens = tokens.filter((token) => !token.balance);

    return (
        <div className={styles['tokens-list-container']}>
            <QuickTokens recentTokens={defaultTokens} onSelectToken={onSelectToken}  />
            <QuickTokens recentTokens={recentTokens} onSelectToken={onSelectToken} icon={<HistoryIcon />} title={t('Recent Tokens')} />
            {
                (userTokens.length > 0)
                &&
                (
                    <>
                        <div className={styles['token-list-sub-title-container']}>
                            <div className={styles['token-list-sub-title-icon-container']}>
                                <WalletIcon />
                            </div>
                            <div className={styles['token-list-sub-title']}>
                                <Translate>Your Tokens</Translate>
                            </div>
                        </div>
                        {
                            userTokens.map((token) => <TokenSelectorItem key={token.address} address={address}
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
                            <CoinIcon />
                        </div>
                        <div className={styles['token-list-sub-title']}>
                            <Translate>Tokens</Translate>
                        </div>
                    </div>
                )
            }
            {
                otherTokens?.map((token) => <TokenSelectorItem
                    key={token.address}
                    address={address}
                    isSelected={token.symbol === selectedToken}
                    token={token} onSelectToken={onSelectToken}
                />)
            }
        </div>
    )
}