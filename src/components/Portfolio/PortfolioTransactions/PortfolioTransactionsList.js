import React, { useState } from 'react';
import styles from "@/src/components/Portfolio/PortfolioTransactions/portfolio-transactions-list.module.css";
import {AngleRightIcon, SendIcon} from "@/src/components/Icon/Icon";
import Amount from "@/src/components/Global/Amount/Amount";
import Translate from "@/src/components/Translate/Translate";
import { motion } from "framer-motion";


export default function PortfolioTransactionsList({ transactions = [], showMoreHash, setShowMoreHash }) {

    const showMore = (hash) => {
        setShowMoreHash((hash === showMoreHash) ? null : hash);
    };

    return (
        <div  className={styles['history-transactions-list-container']} >
            {
                transactions.map((transaction, index) => (
                    <div key={transaction.hash} className={styles['history-transaction-container']+' '+((showMoreHash === transaction.hash) ? styles['active'] : '')}>
                        <div key={transaction.hash} onClick={() => showMore(transaction.hash)} className={styles['history-transaction-row-container']}>
                            <div className={styles['history-transaction-type-container']}>
                                <div className={styles['history-transaction-type']}>
                                    <div className={styles['history-transaction-type-operation']}>
                                        <SendIcon/>
                                        <div className={styles['history-transaction-type-network']}>
                                            <img src="/svg/icons/base-logo.svg" alt="Network logo" width={15}/>
                                        </div>
                                    </div>
                                    <div className={styles['history-transaction-type-details']}>
                                        <div className={styles['history-transaction-type-name']}>Trade</div>
                                        <div className={styles['history-transaction-type-time']}>01:50 PM</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['history-transaction-assets-container']}>
                                <div className={styles['history-transaction-asset-container']}>
                                    <div className={styles['history-transaction-asset-logo-container']}>
                                        <img src={'/svg/icons/' + (transaction.assets?.main?.logo || 'theter-logo.svg')}
                                             alt="Network logo" width={40}/>
                                    </div>
                                    <div className={styles['history-transaction-asset-details-container']}>
                                        <div
                                            className={styles['history-transaction-asset-balance-container'] + ' ' + styles['decrease']}>
                                            - 2 USDT
                                        </div>
                                        <div className={styles['history-transaction-asset-amount-container']}>
                                            <Amount amount={150}/>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['history-transaction-asset-container']}>
                                    <div className={styles['history-transaction-asset-direction-logo-container']}>
                                        <AngleRightIcon/>
                                    </div>
                                    <div className={styles['history-transaction-asset-logo-container']}>
                                        <img src={'/svg/icons/' + (transaction.assets?.main?.logo || 'eth_icon.svg')}
                                             alt="Network logo" width={40}/>
                                    </div>
                                    <div className={styles['history-transaction-asset-details-container']}>
                                        <div
                                            className={styles['history-transaction-asset-balance-container'] + ' ' + styles['increase']}>
                                            + 150 ETH
                                        </div>
                                        <div className={styles['history-transaction-asset-amount-container']}>
                                            <Amount amount={150}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['history-transaction-second-part-container']}>
                                <div className={styles['history-transaction-second-part-label']}>
                                    <Translate>Application</Translate>
                                </div>
                                <div className={styles['history-transaction-second-part-label-details']}>
                                    <div className={styles['history-transaction-second-part-icon']}>
                                        <img
                                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADh0lEQVR4Xu3dLXIWQRSF4fk0S8DH4rIDNAIfg02hqGINsalYDB6RpUTBRtAQi8y8U3XTzBN/5+f02+eenm/Sc/lydfdnG/z7dPth8Ozzp/728Dh6ERcAjOq/AYADjBLIAUbl3ziADCADDM/B2dPLADLAKIEywKj8MsAmA8gAw3Nw9vQygAwwSqAMMCq/DCAD+C3Aj0GTJqQFTKr/fG4hUAgcRZADjMrPAYRAIVAInDQhLWBSfSFw0wK0AC1g0oS0gEn1tQAtwIMgD4JGPUgLGJXfgyCrAKsAq4BJE9ICJtW3CrAKsAqwChj1IC1gVP5XsAp4//Y67Q9w//X7qISf725Gz7/6/V8A0PgBAAdoBMXq6oAcIA4AB+AAEaFWzgGEwESQFpDk2zYtQAuICLVyLUALSARpAUk+LWD5HhjHf/n75wCRACFQCIwItXIhUAhMBGkBST4hcPkQFMd/+ftf/oWQ6Veq6j6H09cPgGgBADi5gAAAQFJAC4hvBU8LyAES//3/AgDQBkAIbPrl/22cBhgAAFj7u4HTM0gGOPkMAgAAkgLTDiYDpOFbfxUDAAAIgYUBGaCo91y7uoCrX78WcHKALz/vf6X9AaZT7NPvH3EIW/m7Nx/bAWJ1dSAAxAEAwPA+dxygbbPHATiADFAY0AK0gMJPrhUCrQISRDJAkm/btAAtICLUyrUALSARpAUk+bSA8Y8fexDkQVCcw61cCBQCG0GxWggUAhNCQmCS7z8IgXW7+Kjf+AYL9fprfd3jp54/bxFTL2B6l616/bUeAMO7jNUBrPUAAEBlKNVrAUm+XswBOECnKByBAwTxjijlABzgCI52H4MD7JbumEIOwAGOIWnnUTjATuGOKuMAHOAolnYdhwPsku24Ig7AAY6jaceROMAO0Y4s4QAc4EieXnys7ADTP+dOz6DV7x8AL54z/xYAYNjCOcBNQpgDJPl8NGr8nT4OwAHiHG7lMoAM0AiK1dUBZYA4AByAA0SEWjkH8O3gRJAWkOSzDLQMXLwFcgAOcJ02i149BcfxX94BOUAkYPUJAICzA1C/FxD1y5tM1S1Szn79eYeQswtYP5gxDTAAIsEAOLmAAABAUkALiPsMTgvIARL/m1XAbdvqNcq/CYFRQQ5wcgEBAICkwHSG0QLS8K2fYQAAgPbdwKifVYBVwGNiaLqHCoFp+NbvoQAAQFJg2sH+AvOTiv4qfcVCAAAAAElFTkSuQmCC"
                                            alt="Figure"
                                            width={15}
                                        />
                                    </div>
                                    <div className={styles['history-transaction-second-part-info']}>
                                        0x5c9b...4cc9
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            (showMoreHash === transaction.hash) ? (
                                <div className={styles['history-transaction-more-container']} >
                                    <div className={styles['history-transaction-more-item']} >
                                        <div className={styles['history-transaction-more-item-label']} >
                                            <Translate>Network Fee</Translate>
                                        </div>
                                        <div className={styles['history-transaction-more-item-value']} >
                                            0.00000043 ETH ($0.00)
                                        </div>
                                    </div>
                                    <div className={styles['history-transaction-more-item']} >
                                        <div className={styles['history-transaction-more-item-label']} >
                                            <Translate>Rate</Translate>
                                        </div>
                                        <div className={styles['history-transaction-more-item-value']} >
                                            1 ETH = 1,632.653 USDC
                                        </div>
                                    </div>
                                    <div className={styles['history-transaction-more-item']} >
                                        <div className={styles['history-transaction-more-item-label']} >
                                            <Translate>Transaction Hash</Translate>
                                        </div>
                                        <div className={styles['history-transaction-more-item-value']} >
                                            <a href="#">0xe7e74e749...d819c7f</a>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                ))
            }
        </div>
    )
}