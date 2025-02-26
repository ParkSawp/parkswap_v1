'use client'

import React from "react";
import TokenSelector from "@/src/components/Global/TokenSelector/TokenSelector";
import SwapTokenSelector from "@/src/components/Global/TokenSelector/SwapTokenSelector";
import {useTranslation} from "react-i18next";


export default function AppSwapTokenBox({ token, amount, amountSlipper, onTokenSelected, onAmountChange }) {
    const { t } = useTranslation();
    return (
        <>
            <TokenSelector
                title={t('Select a token')}
                Template={SwapTokenSelector}
                networkOnly={false}
                tokenOnly={false}
                onNetworkSelected={() => { }}
                onTokenSelected={onTokenSelected}
                placeholder={t('Select a token')}
                customProps={ { onAmountChange, token, amount, amountSlipper } }
            />
        </>
    )
}