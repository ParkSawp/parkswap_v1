'use client'

import React from "react";
import TokenSelector from "@/src/components/Global/TokenSelector/TokenSelector";
import SwapTokenSelector from "@/src/components/Global/TokenSelector/SwapTokenSelector";


export default function AppSwapTokenBox({ token, amount, onTokenSelected, onAmountChange }) {
    return (
        <>
            <TokenSelector
                title={'Select a Token'}
                Template={SwapTokenSelector}
                networkOnly={false}
                tokenOnly={false}
                onNetworkSelected={() => { }}
                onTokenSelected={onTokenSelected}
                placeholder={'Select a token'}
                customProps={ { onAmountChange, token, amount } }
            />
        </>
    )
}