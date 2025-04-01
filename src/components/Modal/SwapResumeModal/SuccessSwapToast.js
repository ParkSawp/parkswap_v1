import {useChainId} from "wagmi";
import {base} from "wagmi/chains";
import Translate from "@/src/components/Translate/Translate";
import React from "react";
import styles from "@/src/components/Modal/SwapResumeModal/SwapResumeModal.module.css";

export default function SuccessSwapToast({ hash }) {
    const chainId = useChainId();
    let link = '#';

    if(chainId === base.id) {
        link = "https://basescan.org/tx/"+hash;
    }


    return (
        <div>
            <div><Translate>Swap transaction sent with success</Translate></div>
            <div className="swap-trx-link-container" >
                <a href={link} className="swap-trx-link" target="_blank">
                    {hash}
                </a>
            </div>
        </div>
    );
};