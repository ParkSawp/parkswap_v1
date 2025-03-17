import styles from './ParkSwapSocialNetworks.module.css';
import {SOCIALS_NETWORKS} from "@/src/config/constants";

export default function ParkSwapSocialNetworks({ }) {

    return (
        <div className={styles['parkswap-network-socials-container']}>
            {
                SOCIALS_NETWORKS.map((socialNetwork, index) => (
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