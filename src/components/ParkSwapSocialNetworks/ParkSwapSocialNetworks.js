import styles from './ParkSwapSocialNetworks.module.css';

export default function ParkSwapSocialNetworks({ }) {

    return (
        <div className={styles['parkswap-network-socials-container']}>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']} >
                    <img src="/svg/socials/x.svg" alt="" className={styles['parkswap-network-icon']} height={30} />
                </a>
            </div>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']} >
                    <img src="/svg/socials/telegram.svg" alt="" className={styles['parkswap-network-icon']} height={30} />
                </a>
            </div>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']} >
                    <img src="/svg/socials/discord.svg" alt="" className={styles['parkswap-network-icon']} height={30} />
                </a>
            </div>
            <div className={styles['parkswap-network-container']} >
                <a href="" target="_blank" className={styles['parkswap-network-link']} >
                    <img src="/svg/socials/chat.svg" alt="" className={styles['parkswap-network-icon']} height={30} />
                </a>
            </div>
            {/*<div className={styles['parkswap-network-container']} >*/}
            {/*    <a href="" target="_blank" className={styles['parkswap-network-link']} >*/}
            {/*        <img src="/svg/socials" alt="" className={styles['parkswap-network-icon']} height={30} />*/}
            {/*    </a>*/}
            {/*</div>*/}
        </div>
    )
}