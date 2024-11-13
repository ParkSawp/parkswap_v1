import React, {useState} from 'react';
import styles from './TradFiObligations.module.css';
import TradFinanceWidgetWrapper from "@/src/components/Global/TradFinanceWidgetWrapper/TradFinanceWidgetWrapper";


export default function TradFiObligations({ }) {

    const [items, _] = useState([
        {
            logo: '/img/tradfi/flag.american.jpg',
            name: 'United States of America',
            rate: 4.5,
            date: '11/25',
            price: 102.36,
            currency: '$',
            performance: 4.251
        },
        {
            logo: '/img/tradfi/flag.europe.png',
            name: 'European Union',
            rate: 0.8,
            date: '07/25',
            price: 0.9907,
            currency: '€',
            performance: 2.653
        },
        {
            logo: '/img/tradfi/flag.france.png',
            name: 'France',
            rate: 6,
            date: '10/25',
            price: 1.04,
            currency: '€',
            performance: 4.491
        }
    ])

    return (
        <TradFinanceWidgetWrapper title='Obligations populaires' >
            <div className={styles['trad-fi-obligations-container']}>
                {
                    items.map((item, index) => (
                        <div className={styles['trad-fi-obligation-row']}  key={index} >
                            <div className={styles['trad-fi-obligation-picture-container']} >
                                <img src={item.logo} alt={item.name}/>
                            </div>
                            <div className={styles['trad-fi-obligation-description']} >
                                <div className={styles['trad-fi-obligation-name']} >
                                    {item.name} {item.rate}% {item.date}
                                </div>
                                <div className={styles['trad-fi-obligation-performance']} >
                                    Rendement {item.performance}%
                                </div>
                            </div>
                            <div className={styles['trad-fi-obligation-price']}  >
                                { item.price} { item.currency}
                            </div>
                        </div>
                    ))
                }
            </div>
        </TradFinanceWidgetWrapper>
    );
}