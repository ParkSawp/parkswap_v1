'use client';

import React, {useState, useEffect, useRef, memo} from 'react';
import { SymbolOverview } from "react-ts-tradingview-widgets";
import useAppSettings from "@/src/hooks/useAppSettings";

export default function PriceChart({ symbol, width, height }) {
    const settings = useAppSettings();

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
                wickDownColor="#c0392b"
                lineColor="#27ae60"
                topColor="transparent"
                bottomColor="transparent"
                dateFormat="YYYY-MM-DD"
                chartOnly={false}
                isTransparent={false}
                showFloatingTooltip={true}
                showVolume={false}
                scalePosition="right"
                valuesTracking="0"
            />
            {/*<CanvasJSReact.CanvasJSChart options={options} />*/}
        </>
    );
}