import React from 'react';
import {useChainId} from "wagmi";
import {base} from "@wagmi/core/chains";
import styles from "@/src/components/Modal/SwapResumeModal/SwapResumeModal.module.css";
import Translate from "@/src/components/Translate/Translate";

export default function SendTransactionNotification({ error, hash }) {
    const chainId = useChainId();
    let link = '#';

    if(chainId === base.id) {
        link = "https://basescan.org/tx/"+hash;
    }

    return (
        <>
            {
                error
                ? <div>{error}</div>
                : <div>
                        <div>
                            <Translate>Swap transaction sent with success</Translate>
                        </div>
                        <div className="swap-trx-link-container" >
                            <a href={link} className="swap-trx-link" target="_blank">
                                {hash}
                            </a>
                        </div>
                    </div>
            }
        </>
    )
}