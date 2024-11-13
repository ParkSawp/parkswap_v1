import React, {useState} from 'react';
import styles from './TradFiActions.module.css';
import TradFinanceWidgetWrapper from "@/src/components/Global/TradFinanceWidgetWrapper/TradFinanceWidgetWrapper";
import TradFiElement from "@/src/components/Global/TradFIElement/TradFiElement";


export default function TradFiActions({ }) {
    const [items, _] = useState([
        {
            name: 'NVDA',
            color: 'black',
            logo: '/img/tradfi/nvidia.svg',
            move: {
                up: true,
                value: 4.93
            }
        },
        {
            name: 'TSLA',
            color: 'red',
            logo: '/img/tradfi/tesla.jpg',
            move: {
                up: false,
                value: .23
            }
        },
        {
            name: 'AAPL',
            color: 'white',
            logo: '/img/tradfi/apple.png',
            move: {
                up: false,
                value: 1.41
            }
        },
        {
            name: 'EXI2',
            color: '#00A7DC',
            logo: '/img/tradfi/ishare.jpg',
            move: {
                up: true,
                value: 0.75
            }
        },
        {
            name: 'IS3Q',
            color: '#00A7DC',
            logo: '/img/tradfi/ishare.jpg',
            move: {
                up: true,
                value: 0.28
            }
        },
        {
            name: 'IS3K',
            color: '#00A7DC',
            logo: '/img/tradfi/ishare.jpg',
            move: {
                up: false,
                value: 0.58
            }
        },
        {
            name: 'QDVY',
            color: '#00A7DC',
            logo: '/img/tradfi/ishare.jpg',
            move: {
                up: true,
                value: 0.42
            }
        },
        {
            name: 'IBCD',
            color: '#00A7DC',
            logo: '/img/tradfi/ishare.jpg',
            move: {
                up: false,
                value: 0.75
            }
        },
    ])

    return (
        <TradFinanceWidgetWrapper title='Actions populaires' >
            <div className={styles['trad-fi-actions-container']}>
                {
                    items.map((item, index) => (
                        <TradFiElement element={item} key={index} />
                    ))
                }
            </div>
        </TradFinanceWidgetWrapper>
    );
}