import styles from './tracked-portfolio.module.css';
import Address from "@/src/components/Global/Address/Address";
import Amount from "@/src/components/Global/Amount/Amount";
import Translate from "@/src/components/Translate/Translate";

export default function TrackedPortfolioItem({ wallet, watchNewAddress }) {

    const trackWallet = () => watchNewAddress(wallet.address);

    return (
        <div className={styles['tracked-portfolio-item']} onClick={trackWallet} >
            <div  className={styles['tracked-portfolio-wallet-description']} >
                <div  className={styles['tracked-portfolio-wallet-infos']} >
                    <div  className={styles['tracked-portfolio-wallet-image-wrapper']} >
                        <img src={wallet.image} alt={wallet.name}/>
                    </div>
                    <div  className={styles['tracked-portfolio-wallet-address-description']} >
                        <div  className={styles['tracked-portfolio-wallet-name']} >
                            { wallet.name }
                        </div>
                        <div  className={styles['tracked-portfolio-wallet-address']} >
                            <Address value={wallet.address} target={false} />
                        </div>
                    </div>
                </div>
                <div  className={styles['tracked-portfolio-wallet-amounts-description']} >
                    <div>
                        <Amount amount={wallet.description?.amount?.total || 100000}  />
                    </div>
                </div>
            </div>
            <div  className={styles['tracked-portfolio-wallet-assets-title']} >
                <Translate>Assets</Translate>
            </div>
            <div  className={styles['tracked-portfolio-wallet-assets-description']} >
                {
                    wallet.description?.assets?.slice(0, 7).map((asset) => (
                        <div className={styles['tracked-portfolio-wallet-asset-description']} key={asset.address}>
                            <img src={asset.logo_uri} alt={asset.name} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}