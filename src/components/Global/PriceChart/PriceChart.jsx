'use client';

import React, {useState, useEffect, useRef, memo} from 'react';
import { SymbolOverview } from "react-ts-tradingview-widgets";
import useAppSettings from "@/src/hooks/useAppSettings";

export default function PriceChart({ symbol, width, height }) {
    const settings = useAppSettings();
    console.log({ symbol, settings })

    return (
        <>
            <SymbolOverview
                colorTheme={settings.colorScheme}
                width={width}
                height={height}
                autosize={!width && !height}
                symbols={[symbol]}
                chartType="area"
                downColor="#800080"
                borderDownColor="#800080"
                wickDownColor="#800080"
                lineColor="#27ae60"
                topColor="#c0f4cf"
                bottomColor="#fff"
                dateFormat="YYYY-MM-DD"
                chartOnly={false}
                isTransparent={true}
            />
            {/*<CanvasJSReact.CanvasJSChart options={options} />*/}
        </>
    );
}