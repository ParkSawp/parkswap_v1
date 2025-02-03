import { createContext } from 'react';

export const APP_SETTINGS_DEFAULT = {
    selectedChainId: '8453',
    slippage: 0,

    setSlippage: () => {}
};

export const AppSettingContext = createContext(APP_SETTINGS_DEFAULT);