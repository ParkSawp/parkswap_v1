'use client';

import styles from './ToggleSwitch.module.css';
import React, {useState} from "react";

export default function ToggleSwitch({ name, label, checked, onChange }) {

    const [isChecked, setIsChecked] = useState(checked);

    const handleInput = (event) => {
        const checked = event.target.checked;
        onChange(checked);
        setIsChecked(checked);
    }

    return (
        <div className={styles['toggle-wrapper']}>
            <div className={styles['toggle-switch']}>
                <input type="checkbox" className={styles['toggle-switch-checkbox']} name={name} id={name} checked={isChecked} onChange={handleInput} />
                <label className={styles['toggle-switch-label']} htmlFor={name}>
                    <span className={styles['toggle-switch-inner']}/>
                    <span className={styles['toggle-switch-switch']}/>
                </label>
            </div>
            {
                label
                &&
                <label className={styles['toggle-switch-label']} htmlFor={name}>
                    {label}
                </label>
            }
        </div>
    );
}