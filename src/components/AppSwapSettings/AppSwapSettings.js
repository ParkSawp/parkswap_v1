import React, {useState} from "react";
import { SendIcon } from "@/src/components/Icon/Icon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RangeSlider from "react-range-slider-input";
import styles from "./AppSwapSettings.module.css";
import "react-range-slider-input/dist/style.css";
import "./style.css"
import useAppSettings from "@/src/hooks/useAppSettings";

export default function AppSwapSettings({ }) {
    const [currentSlippage, setCurrentSlippage] = useState(0.5);
    const settings = useAppSettings();
    const slippages = [
        { label: 'Auto', value: 0 },
        { label: '0.1%', value: .1 },
        { label: '0.5%', value: .5 },
        { label: '1%', value: 1 },
        { label: '5%', value: 5 },
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

    const handleCustomSlippage = (event) => {
        const targetValue = event.target.value.replace(',', '.');
        setCurrentSlippage(targetValue);
        if(/\.$/.test(targetValue)) {
            return;
        }
        const value = parseFloat(targetValue);
        if(value < 0 || value > 100 || isNaN(value)) {
            return;
        }
        updateSlippage(value);
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
                    step={0.1}
                    value={[0, currentSlippage]}
                    thumbsDisabled={[true, false]}
                    rangeSlideDisabled={false}
                    onInput={handleSlippage}
                />
            </div>
            <div className={styles['slippage-custom-input-container']} >
                <input type="text" value={currentSlippage} onChange={handleCustomSlippage} className={styles['slippage-custom-input']}  />
            </div>
        </div>
    )
}