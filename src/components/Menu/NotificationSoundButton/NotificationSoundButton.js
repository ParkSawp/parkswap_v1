import React from 'react';
import styles from './NotificationSoundButton.module.css';
import {SoundEnableIcon, SoundDisableIcon} from "@/src/components/Icon/Icon";

export default function NotificationSoundButton({ className }) {

    const [soundEnabled, setSoundEnabled] = React.useState(false);

    const toggleNotificationSound = () => {
        setSoundEnabled(!soundEnabled);
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