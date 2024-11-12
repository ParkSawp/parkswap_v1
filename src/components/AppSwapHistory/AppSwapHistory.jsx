import styles from './AppSwapHistory.module.css';
import ToggleSwitch from "@/src/components/Global/ToggleSwitch/ToggleSwitch";
import {useState} from "react";

export default function AppSwapHistory({ }) {
    const [displayHistory, setDisplayHistory] = useState(false);

    const [histories, setHistories] = useState([]);

    return (
        <div className={styles['app-swap-history']}>
            <ToggleSwitch name="swapHistory" label="Show swap history" onChange={setDisplayHistory} checked={displayHistory} />

            {
                displayHistory
                &&
                <div className={styles['app-swap-histories-container']}>
                    <div className={styles['app-swap-history-title']}>
                        By ParkChain
                    </div>
                    <table className={styles['app-swap-histories-table']} >
                        <thead>
                            <tr>
                                <th>Community</th>
                                <th>News</th>
                                <th>Resources</th>
                                <th>Links</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Discord</td>
                                <td>Twitter</td>
                                <td>Docs</td>
                                <td>Portal</td>
                            </tr>
                            <tr>
                                <td>Guild</td>
                                <td>Blog</td>
                                <td>Github</td>
                                <td>Block explorer</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}