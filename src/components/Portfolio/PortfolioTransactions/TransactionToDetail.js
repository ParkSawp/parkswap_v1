import styles from "@/src/components/Portfolio/PortfolioTransactions/portfolio-transactions-list.module.css";
import Translate from "@/src/components/Translate/Translate";
import React from "react";
import Address from "@/src/components/Global/Address/Address";


export default function TransactionToDetail({ transaction }) {

    if(transaction.type === 'send') {
        return (
            <>
                <div className={styles['history-transaction-second-part-label']}>
                    <Translate>To</Translate>
                </div>
                <div className={styles['history-transaction-second-part-label-details']}>
                    <Address value={transaction.to} network={transaction.network} />
                </div>
            </>
        );
    }
    if(transaction.type === 'receive') {
        return (
            <>
                <div className={styles['history-transaction-second-part-label']}>
                    <Translate>From</Translate>
                </div>
                <div className={styles['history-transaction-second-part-label-details']}>
                    <Address value={transaction.from} network={transaction.network}   />
                </div>
            </>
        );
    }
    return (
        <>
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
                    <Address value={transaction.contract} network={transaction.network}  />
                </div>
            </div>
        </>
    )
}