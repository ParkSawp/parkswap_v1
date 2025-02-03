import React, {useState} from "react";
import { SendIcon } from "@/src/components/Icon/Icon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RangeSlider from "react-range-slider-input";
import styles from "./AppSwapSettings.module.css";
import "react-range-slider-input/dist/style.css";
import "./style.css"
import useAppSettings from "@/src/hooks/useAppSettings";

export default function AppSwapSettings({ }) {
    const [currentSlippage, setCurrentSlippage] = useState(0);
    const settings = useAppSettings();
    const slippages = [
        { label: '5%', value: 5 },
        { label: '10%', value: 10 },
        { label: '25%', value: 25 },
        { label: '50%', value: 50 },
        { label: '75%', value: 75 },
        { label: '90%', value: 90 },
        { label: '100%', value: 100 },
    ];

    const updateSlippage = (value) => {
        setCurrentSlippage(value);
        settings.setSlippage && settings.setSlippage(value);
    }

    const handleSlippage = (range) => {
        updateSlippage(range[1]);
    };

    const selectSlippage = (item) => {
        updateSlippage(item.value)
    };

    return (
        <div className={styles['swap-settings-container']}>
            <div className={styles['swap-setting-container']} >
                <div className={styles['slippage-container']}>
                    <div className={styles['slippage-value-container']} >
                        <span>Slippage</span> <span>{currentSlippage}%</span>
                    </div>
                    {
                        slippages.map((slip => (
                            <div key={slip.label}
                                 className={[styles['slippage-item'] + ' ' + ((currentSlippage === slip.value) ? styles['active'] : '')]}
                                 onClick={() => selectSlippage(slip)}>
                                {slip.label}
                            </div>
                        )))
                    }
                </div>
                <RangeSlider
                    className="single-thumb"
                    min={0}
                    max={100}
                    value={[0, currentSlippage]}
                    thumbsDisabled={[true, false]}
                    rangeSlideDisabled={false}
                    onInput={handleSlippage}
                />
            </div>
        </div>
    )
}