'use client';

import React, {useState} from 'react';
import styles from './BridgeSettings.module.css';
import BridgeFormItem from "@/src/components/BridgeFormItem/BridgeFormItem";
import BridgeSettingItem from "@/src/components/Global/BridgeSettingItem/BridgeSettingItem";
import ListSelector from "@/src/components/Global/ListSelector/ListSelector";

export default function BridgeSettings({ onClose }) {

    const [currentContent, setCurrentContent] = useState(null);
    const [settings, setSettings] = useState({
        route: 'best',
        gas: 'slow',
        slippage: null
    });

    const bridges = [
        { logo: '/img/bridges/acrossv2.png', name: 'Across', checked: true },
        { logo: '/img/bridges/arbitrum.png', name: 'Arbitrum', checked: true },
        { logo: '/img/bridges/cbridge.svg', name: 'CBridge', checked: true },
        { logo: '/img/bridges/circle.png', name: 'Circle', checked: true },
        { logo: '/img/bridges/hop.png', name: 'Hope', checked: true },
        { logo: '/img/bridges/omni.png', name: 'Omni', checked: true },
        { logo: '/img/bridges/optimism.png', name: 'Optimism', checked: true },
        { logo: '/img/bridges/stargate.png', name: 'Stargate', checked: true },
    ];

    const exchanges = [
        { logo: '/img/exchanges/dodo.png', name: 'Dodo', checked: true },
        { logo: '/img/exchanges/favicon.ico', name: 'Gorgogo', checked: true },
        { logo: '/img/exchanges/kyberswap.png', name: 'KyberSwap', checked: true },
        { logo: '/img/exchanges/oneinch.png', name: 'One inch', checked: true },
        { logo: '/img/exchanges/pancake.png', name: 'Pancake swap', checked: true },
        { logo: '/img/exchanges/paraswap.png', name: 'Paraswap', checked: true },
        { logo: '/img/exchanges/quick.png', name: 'Quick', checked: true },
        { logo: '/img/exchanges/stellaswap.png', name: 'Stella swap', checked: true },
        { logo: '/img/exchanges/sushi.png', name: 'Suchi', checked: true },
        { logo: '/img/exchanges/uniswap.png', name: 'Uniswap', checked: true },
    ];

    const displayItem = (key) => {
        setCurrentContent((currentContent === key) ? null : key);
    }
    const showRoute = () => displayItem('route');
    const showGas = () => displayItem('gas');
    const showSlippage = () => displayItem('slippage');
    const showBridges = () => displayItem('bridges');
    const showExchanges = () => displayItem('exchanges');

    const setBestRoute = () => setSettings({ ...settings, route: 'best' });
    const setFastRoute = () => setSettings({ ...settings, route: 'fast' });
    const setFastGas = () => setSettings({ ...settings, gas: 'fast' });
    const setNormalGas = () => setSettings({ ...settings , gas: 'normal' });
    const setSlowGas = () => setSettings({ ...settings, gas: 'slow' });
    const setDefaultSlippage = () => setSettings({ ...settings, slippage: null });
    const setCustomSlippage = () => setSettings({ ...settings, slippage: '' });

    return (
        <div className={styles['bridge-settings-container']} >
            <div className={styles['bridge-settings-header']}>
                <div className={styles['bridge-settings-icon-container']} onClick={onClose} >
                    <img src="/svg/icons/arrow_back.svg" alt="Arrow back" />
                </div>
                <div className={styles['bridge-settings-header-title']} >Settings</div>
            </div>
            <div className={styles['bridge-settings-body-container']}>
                <BridgeSettingItem onClick={showRoute} logo='/svg/icons/settings.svg' title='Route priority' note='Best return' showContent={currentContent==='route'} >
                    <div className={styles["options-list-container"]} >
                        <div className={styles['options-list-option'] +' '+ ((settings.route === 'best') && styles['is_active'])} onClick={setBestRoute} >Best return</div>
                        <div className={styles['options-list-option'] +' '+ ((settings.route === 'fast') && styles['is_active'])} onClick={setFastRoute} >Fastest</div>
                    </div>
                </BridgeSettingItem>
                <BridgeSettingItem onClick={showGas} logo='/img/gas.png' title='Route priority' note='Gas price' showContent={currentContent === 'gas'}>
                    <div className={styles["options-list-container"]}>
                        <div className={styles['options-list-option'] +' '+ ((settings.gas === 'slow') && styles['is_active'])} onClick={setSlowGas}>Slow</div>
                        <div className={styles['options-list-option'] +' '+ ((settings.gas === 'normal') && styles['is_active'])} onClick={setNormalGas}>Normal</div>
                        <div className={styles['options-list-option'] +' '+ ((settings.gas === 'fast') && styles['is_active'])} onClick={setFastGas}>Fast</div>
                    </div>
                </BridgeSettingItem>
                <BridgeSettingItem onClick={showSlippage} logo='/svg/icons/settings.svg' title='Max. slippage' note='0.5%' showContent={currentContent === 'slippage'}>
                    <div className={styles["options-list-container"]}>
                        <div className={styles['options-list-option'] +' '+ ((!settings.slippage) && styles['is_active'])} onClick={setDefaultSlippage}>0.5</div>
                        <div className={styles['options-list-option'] +' '+ (settings.slippage && styles['is_active'])} onClick={setCustomSlippage}>
                            <input type="text" placeholder='Custom'  />
                        </div>
                    </div>
                </BridgeSettingItem>
                <BridgeSettingItem onClick={showBridges} logo='/svg/icons/settings.svg' title='Bridges' note='19/19'
                                   showContent={currentContent === 'bridges'}>
                    <ListSelector placeholder='Search by bride name' data={bridges} />
                </BridgeSettingItem>
                <BridgeSettingItem onClick={showExchanges} logo='/svg/icons/settings.svg' title='Exhanges' note='32/32'
                                   showContent={currentContent==='exchanges'} >
                    <ListSelector placeholder='Search by exchange name' data={exchanges} />
                </BridgeSettingItem>
            </div>
        </div>
    );
}