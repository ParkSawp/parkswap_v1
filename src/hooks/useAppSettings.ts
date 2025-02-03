import { useContext } from 'react';
import {APP_SETTINGS_DEFAULT, AppSettingContext} from "@/src/hooks/contexts";


export default function useAppSettings() {
    const settings = useContext(AppSettingContext);

    return {
        ...settings
    };
};