import React, { useRef } from 'react';
import styles from "../ModalTokenSelection.module.css";

const tokenItem = ({tokenName,tokenSymbol,tokenAddress,tokenLogo,key}) => {
    return (
        <li key={key}>
            <span className={styles["ContainerTokensIcon"]}>
                <svg width="40px" height="40px">
                                <title>{tokenName}</title>
                                <image width="40px" height="40px" href={tokenLogo}/>
                </svg>
            </span>
            <span className={styles["ContainerTokensName"]}>
                <span className={styles["TokenName"]}>{tokenName}</span>
                <span className={styles["TokenAddress"]}>{tokenSymbol} <i>{tokenAddress}</i></span>
            </span>
        </li>
    )
}

export default tokenItem