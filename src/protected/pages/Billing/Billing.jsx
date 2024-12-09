import { useState, useEffect ,Fragment} from "react";
import styles from "./Billing.module.css";
import { markInvoiceAsPaid ,fetchUnpaidOrdersForRoom} from '../../api/bookingApi.js';




function Billing() {
    const [showInvoiceFilters, setShowInvoiceFilters] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal állapota
    const [selectedInvoice, setSelectedInvoice] = useState(null); // Kiválasztott számla
    const [selectedDetails, setSelectedDetails] = useState(null);
    const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);



    const toggleInvoiceFilters = () => {
        setShowInvoiceFilters(prevState => !prevState);
    };
    const handleDetailsClick = async (roomNumber) => {
        if (selectedDetails === roomNumber) {
            // Ha már nyitott, zárjuk be
            setSelectedDetails(null);
            setSelectedRoomDetails(null);
            return;
        }

        try {
            const details = await fetchUnpaidOrdersForRoom(roomNumber);
            setSelectedDetails(roomNumber);
            setSelectedRoomDetails(details);
        } catch (error) {
            alert("Nem sikerült lekérni a fogyasztási részleteket.");
        }
    };




    const fetchInvoices = async (filter) => {
        const response = await fetch("http://localhost:5086/api/Billing/rooms-total-billing");
        const data = await response.json();
        const filteredData = data.filter(invoice =>
            filter === "Nyitott" ? !invoice.isPaid : invoice.isPaid
        );
        setInvoices(filteredData);
        setSelectedFilter(filter);
    };

    const handlePayClick = (invoice) => {
        setSelectedInvoice(invoice); // Kiválasztott számla
        setShowModal(true);
    };

    const confirmPayment = async () => {
        try {
            // API hívás a számla fizetettként jelölésére
            await markInvoiceAsPaid(selectedInvoice.orderId);

            // Frissítés a frontenden
            setInvoices(prevInvoices =>
                prevInvoices.filter(invoice => invoice.orderId !== selectedInvoice.orderId)
            );

            setShowModal(false);
            setSelectedInvoice(null);
            alert(`Szoba ${selectedInvoice.roomNumber} számlája rendezve!`);
        } catch (error) {
            console.error("Hiba a fizetés során:", error.message);
            alert("Nem sikerült a számla státuszának frissítése.");
        }
    };



    const cancelPayment = () => {
        setShowModal(false); // Modal bezárása
        setSelectedInvoice(null); // Kiválasztott számla törlése
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

                    {showInvoiceFilters && (
                        <div className={styles.filterRow}>
                            <button
                                className={`${styles.filterButton} ${styles.openInvoices}`}
                                onClick={() => fetchInvoices("Nyitott")}
                            >
                                Nyitott
                            </button>
                            <button
                                className={`${styles.filterButton} ${styles.closedInvoices}`}
                                onClick={() => fetchInvoices("Fizetett")}
                            >
                                Fizetett
                            </button>
                        </div>
                    )}

                    <button className={`${styles.fetchButton} ${styles.createInvoice}`}>Számla kiállítása</button>
                    <button className={`${styles.fetchButton} ${styles.sendInvoice}`}>Számla küldése</button>
                </div>

                {/* Jobb oldali oszlop */}
                <div className={styles.rightColumn}>
                    <div className={styles.topSection}>
                        <h2>{selectedFilter || "Számlák"}</h2>
                        <table className={styles.invoiceTable}>
                            <thead>
                            <tr>
                                <th>Szobaszám</th>
                                <th>Vendég</th>
                                <th>Bejelentkezés</th>
                                <th>Kijelentkezés</th>
                                <th>Szobaár</th>
                                <th>Fogyasztás</th>
                                <th>Végösszeg</th>
                                <th>Műveletek</th>
                            </tr>
                            </thead>
                            <tbody>
                            {invoices.map((invoice) => (
                                <Fragment key={invoice.roomNumber}>
                                    {/* Fő sor a számla alapinformációival */}
                                    <tr>
                                        <td>{invoice.roomNumber}</td>
                                        <td>{invoice.guestName}</td>
                                        <td>{new Date(invoice.checkInDate).toLocaleDateString()}</td>
                                        <td>{new Date(invoice.checkOutDate).toLocaleDateString()}</td>
                                        <td>{invoice.totalRoomCost.toLocaleString()} Ft</td>
                                        <td>{invoice.totalOrderCost.toLocaleString()} Ft</td>
                                        <td>{invoice.grandTotal.toLocaleString()} Ft</td>
                                        <td>
                                            <button
                                                className={`${styles.tableButton} ${styles.detailsButton}`}
                                                onClick={() => handleDetailsClick(invoice.roomNumber)}
                                            >
                                                Részletezés
                                            </button>
                                            <button
                                                className={`${styles.tableButton} ${styles.payButton}`}
                                                disabled={invoice.isPaid}
                                                onClick={() => handlePayClick(invoice)}
                                            >
                                                Fizetve
                                            </button>
                                        </td>
                                    </tr>


                                </Fragment>
                            ))}

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

            <div className={styles.bottomSection}>
                <h2>Részletek</h2>
                {selectedRoomDetails ? (
                    <div className={styles.detailsSection}>
                        <h3>Fogyasztási részletek</h3>
                        {selectedRoomDetails.map((order) => (
                            <div key={order.orderId} className={styles.orderDetails}>
                                <p>
                                    <strong>Rendelésszám:</strong> {order.orderId}
                                </p>
                                <p>
                                    <strong>Rendelés dátuma:</strong>{" "}
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </p>

                                <ul>
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.quantity}x {item.itemName} -{" "}
                                            {item.price.toLocaleString()} Ft
                                        </li>
                                    ))}
                                </ul>
                                <p>
                                    <strong>Teljes összeg:</strong>{" "}
                                    {order.totalAmount.toLocaleString()} Ft
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nincs kiválasztott fogyasztási részlet.</p>
                )}
            </div>


            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2>Számla rendezése</h2>
                        <p>
                            Biztosan rendezettként szeretné megjelölni a(z){" "}
                            <strong>{selectedInvoice.roomNumber}</strong> szobaszámú számlát?
                        </p>
                        <div className={styles.modalButtons}>
                            <button className={styles.confirmButton} onClick={confirmPayment}>
                                Igen
                            </button>
                            <button className={styles.cancelButton} onClick={cancelPayment}>
                                Nem
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Billing;
