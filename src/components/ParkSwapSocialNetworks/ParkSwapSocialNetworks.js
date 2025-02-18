import styles from './ParkSwapSocialNetworks.module.css';
import {ChatIcon, DiscordIcon, TelegramIcon, XTwitterIcon} from "@/src/components/Icon/Icon";

export default function ParkSwapSocialNetworks({ }) {

    return (
        <div className={styles['parkswap-network-socials-container']}>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']+' '+styles['is-twitterX']} >
                    <XTwitterIcon />
                </a>
            </div>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']+' '+styles['is-telegram']} >
                    <TelegramIcon />
                </a>
            </div>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']+' '+styles['is-discord']} >
                    <DiscordIcon />
                </a>
            </div>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']+' '+styles['is-chat']} >
                    <ChatIcon />
                </a>
            </div>
        </div>
    )
}