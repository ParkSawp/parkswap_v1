import React from 'react';
import styles from './address.module.css';
import {CopyIcon} from "@/src/components/Icon/Icon";
import {Toast} from "@/src/config/functions";

export default function Address({ value, target = true, network, isHash = false, copy = true }) {

    const href = network ? network.explorerUrl+`/${isHash ? 'tx' : 'address'}/${value}` : '/portfolio/address/'+value;

    const copyToClipboard = (event) => {
        event.stopPropagation();
        navigator.clipboard.writeText(value).then(function() {
            Toast.success('Copying to clipboard was successful!', true);
        }, function(err) {
            console.error(err);
            Toast.error('Could not copy text', true);
        });
    };

    return (
        <>
            <div className={styles['address-container']} title={value} >
                <a href={href} target={target ? "_blank" : "_parent"} className={styles['address-container-link']} onClick={(e) => e.stopPropagation()} >
                    {value.slice(0, isHash ? 10 : 7)}...{value.slice(-4)}
                </a>
                {
                    copy && (
                        <span className={styles['copy-address']} onClick={copyToClipboard} >
                            <CopyIcon />
                        </span>
                    )
                }
            </div>
        </>
    )
}