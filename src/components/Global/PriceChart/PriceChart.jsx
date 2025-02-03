'use client';

import React, {useState} from 'react';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";


export default function PriceChart({ symbol, width, height }) {

    return (
        <>
            <AdvancedRealTimeChart
                theme="light"
                width={width}
                height={height}
                autosize={!width && !height}
                symbol={symbol} />
            {/*<CanvasJSReact.CanvasJSChart options={options} />*/}
        </>
    );
}