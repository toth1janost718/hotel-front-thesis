import underMainstyles from "../UnderMaintance/UnderMaintance.module.css";

/**
 * UnderMaintance Component
 *
 * Ez a komponens egy karbantartási üzenetet jelenít meg, amely jelzi, hogy az adott funkció fejlesztés alatt áll.
 *
 * Megjelenítés:
 * - Animált háttér.
 * - Hotel ikon és "Hamarosan" cím.
 * - Tájékoztató szöveg a fejlesztés állapotáról.
 * - Betöltő animáció a vizuális hatás fokozására.
 */


function UnderMaintance() {
    return (
        <div className={underMainstyles['create-booking-content']}>
            <div className={underMainstyles['animated-wrapper']}>
                <div className={underMainstyles['logo-container']}>
                    <div className={underMainstyles['hotel-icon']}></div>
                </div>
                <h1 className={underMainstyles['maintenance-title']}>Hamarosan</h1>
                <p className={underMainstyles['maintenance-text']}>
                    Az oldal ezen része fejlesztés alatt.
                </p>
                <div className={underMainstyles['loader']}></div>
            </div>
        </div>
    )
}


export default UnderMaintance;
