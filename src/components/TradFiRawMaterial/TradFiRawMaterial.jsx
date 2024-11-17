'use client';

import React, {useState} from 'react';
import styles from './TradFiRawMaterial.module.css';
import TradFinanceWidgetWrapper from "@/src/components/Global/TradFinanceWidgetWrapper/TradFinanceWidgetWrapper";
import Link from "next/link";
import TradFiElement from "@/src/components/Global/TradFIElement/TradFiElement";


export default function TradFiRawMaterial({ }) {

    const [items, _] = useState([
        {
            name: 'Or (Gold)',
            color: 'black',
            logo: '/img/tradfi/gold.png',
            move: {
                up: true,
                value: 0.00
            }
        },
        {
            name: 'Argent (Sliver)',
            color: 'black',
            logo: '/img/tradfi/sliver.webp',
            move: {
                up: true,
                value: 0.00
            }
        },
        {
            name: 'Palladium',
            color: 'black',
            logo: '/img/tradfi/palladium.jpg',
            move: {
                up: true,
                value: 0.00
            }
        },
        {
            name: 'Platine',
            color: 'black',
            logo: '/img/tradfi/platin.png',
            move: {
                up: true,
                value: 0.00
            }
        }
    ])

    return (
        <TradFinanceWidgetWrapper title='Matières Premières'>
            <div className={styles['trad-fi-raw-material-container']}>
                {
                    items.map((item, index) => (
                        <TradFiElement element={item} key={index} />
                    ))
                }
            </div>
            <div className={styles['trad-fi-raw-material-note']}>
                Les services de trading de matières premières sont fourni par RevolutLtd.
                Voir les <Link href = ''>Divulgations des risques sur les matières premières</Link>
            </div>
        </TradFinanceWidgetWrapper>
);
}