import React from 'react';
import styles from './NotificationSoundButton.module.css';
import {SoundEnableIcon, SoundDisableIcon} from "@/src/components/Icon/Icon";
import useAppSettings from "@/src/hooks/useAppSettings";

export default function NotificationSoundButton({ className }) {
    const settings = useAppSettings();
    const [soundEnabled, setSoundEnabled] = React.useState(settings.notificationSound);

    const toggleNotificationSound = () => {
        setSoundEnabled(!soundEnabled);
        settings.setNotificationSound(!soundEnabled);
    };

    return (
        <div className={className} onClick={toggleNotificationSound} >
            {
                soundEnabled
                    ? <SoundEnableIcon />
                    : <SoundDisableIcon />
            }
        </div>
    );
}