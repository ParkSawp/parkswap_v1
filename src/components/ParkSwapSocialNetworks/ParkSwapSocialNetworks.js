import styles from './ParkSwapSocialNetworks.module.css';
import {ChatIcon, DiscordIcon, TelegramIcon, XTwitterIcon} from "@/src/components/Icon/Icon";

export default function ParkSwapSocialNetworks({ }) {

    const socialNetworks = [
        { icon: XTwitterIcon, href: '', className: 'is-twitterX' },
        // { icon: TelegramIcon, href: '', className: 'is-telegram' },
        { icon: DiscordIcon, href: '', className: 'is-discord' },
        { icon: ChatIcon, href: '', className: 'is-chat' },
    ]

    return (
        <div className={styles['parkswap-network-socials-container']}>
            {
                socialNetworks.map((socialNetwork, index) => (
                    <div key={'network-container-'+index} className={styles['parkswap-network-container']}>
                        <a href={socialNetwork.href} target="_blank"
                           className={styles['parkswap-network-link'] + ' ' + styles[socialNetwork.className]}>
                            <socialNetwork.icon />
                        </a>
                    </div>
                ))
            }
        </div>
    )
}