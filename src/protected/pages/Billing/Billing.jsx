import { useState } from "react";
import styles from "./Billing.module.css";

function Billing() {
    const [showInvoiceFilters, setShowInvoiceFilters] = useState(false); // Állapot a "Nyitott" és "Fizetett" gombokhoz

    const toggleInvoiceFilters = () => {
        setShowInvoiceFilters(prevState => !prevState); // Állapot váltása (mutat/rejt)
    };

    return (
        <div className="setting-content">
            <div className={styles.billingContainer}>
                {/* Bal oldali oszlop */}
                <div className={styles.leftColumn}>
                    <h2>Számlák</h2>
                    <button
                        className={`${styles.fetchButton} ${styles.fetchInvoice}`}
                        onClick={toggleInvoiceFilters}
                    >
                        Számlák lekérése
                    </button>

                    {/* Dinamikusan megjelenő gombok */}
                    {showInvoiceFilters && (
                        <div className={styles.filterRow}>
                            <button className={`${styles.filterButton} ${styles.openInvoices}`}>
                                Nyitott
                            </button>
                            <button className={`${styles.filterButton} ${styles.closedInvoices}`}>
                                Fizetett
                            </button>
                        </div>
                    )}

                    <button className={`${styles.fetchButton} ${styles.createInvoice}`}>Számla kiállítása</button>
                    <button className={`${styles.fetchButton} ${styles.sendInvoice}`}>Számla küldése</button>
                </div>

                {/* Jobb oldali oszlop */}
                <div className={styles.rightColumn}>
                    {/* Felső rész: Rendezett számlák */}
                    <div className={styles.topSection}>
                        <h2>Rendezett számlák</h2>
                        <table className={styles.invoiceTable}>
                            <thead>
                            <tr>
                                <th>Szobaszám</th>
                                <th>Vendég</th>
                                <th>Dátum</th>
                                <th>Összeg</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>103</td>
                                <td>Szabó Péter</td>
                                <td>2024.12.01 - 2024.12.04</td>
                                <td>45 000 Ft</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Alsó rész: Számlarészletek */}
                    <div className={styles.bottomSection}>
                        <h2>Számla részletei</h2>
                        <div className={styles.invoiceDetails}>
                            <p>Szobaszám: 101</p>
                            <p>Vendég: Kovács János</p>
                            <p>Foglalás időtartama: 2024.12.10 - 2024.12.15</p>
                            <p>Szobaár: 120 000 Ft</p>
                            <p>Fogyasztás: 30 000 Ft</p>
                            <p>Végösszeg: 150 000 Ft</p>
                            <button className={styles.payButton}>Fizetett</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Billing;
