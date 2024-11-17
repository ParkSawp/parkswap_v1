'use client';

import React, {useState} from 'react';
import styles from './ListSelector.module.css';


export default function ListSelector({ data, placeholder }) {

    const [filtered, setFiltered] = useState(data);

    const toggleChecked = (item) => {
        item.checked = !item.checked;
        setFiltered([ ...filtered ]);
    };
    const filter = (event) => {
        const key = event.target.value;
        setFiltered(data.filter((item) => item.name.toLowerCase().includes(key.toLowerCase())));
    }


    return (
        <div className={styles['list-selector-container']} >
            <div className={styles['list-selector-search-container']} >
                <input type="text" placeholder={placeholder} onInput={filter}/>
            </div>
            <div className={styles['list-selector-container']}  >
                {
                    filtered.map((item, index) => (
                        <div className={styles['list-selector-item']} key={index} onClick={()=> toggleChecked(item)} >
                            <div className={styles['list-selector-item-logo-container']}  >
                                <img src={item.logo} alt={item.name} />
                            </div>
                            <div className={styles['list-selector-item-name']}  >
                                {item.name}
                            </div>
                            <div className={styles['list-selector-item-checked-state']}  >
                                { item.checked && <img src="/svg/icons/check.svg" alt="Checked"/>}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}