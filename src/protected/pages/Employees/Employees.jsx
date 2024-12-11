import {useState, useEffect} from "react";
import employeeStyles from "./Employees.module.css";
import {fetchEmployeesData} from "../../api/employeeApi.js";
import {filterEmployees} from "../../utils/filters/filterEmployees";
import SalaryModal from "../../components/modals/employee/SalaryModal.jsx";
import ScheduleModal from "../../components/modals/employee/ScheduleModal.jsx";
import DismissalModal from "../../components/modals/employee/DismissalModal.jsx";
import OtherModal from "../../components/modals/employee/OtherModal.jsx";
import StatusButtons from "../../components/modals/employee/StatusButtons.jsx";
import CircleSegment from "../../components/modals/employee/CircleSegment.jsx";

/**
 * Employees Komponens
 *
 * Ez a komponens felelős az alkalmazottak kezelőfelületének megjelenítéséért, beleértve:
 * - Keresősávot, amely lehetővé teszi az alkalmazottak szűrését név, pozíció vagy státusz szerint.
 * - Státusz szűrő gombokat (pl. Szabadság, Szabadnap, Munkában).
 * - Interaktív kör szegmenseket, amelyekkel különböző műveletek végezhetők, mint például Bér, Beosztás, Elbocsátás és Egyéb.
 * - Egy táblázatot, amely a szűrt alkalmazottak listáját jeleníti meg.
 *
 * Funkciók:
 * - Az alkalmazottak adatainak API-n keresztüli lekérése és feldolgozása (`fetchEmployeesData`).
 * - Szűrés keresési input és státusz alapján (`filterEmployees`).
 * - Moduláris felépítés: újrafelhasználható komponensek a felhasználói felület különböző elemeihez (modálok, gombok, kör szegmensek).
 * - Hibakezelés az API-hívások sikertelensége esetén.
 *
 * SOLID elvek alkalmazása:
 * - Egyetlen felelősség elve: Külön komponensek kezelik az egyes UI elemeket vagy logikát (pl. `StatusButtons`, `CircleSegment`, modálok).
 * - Nyitott/Zárt elv: Új modálok vagy funkciók könnyen hozzáadhatók a meglévő logika módosítása nélkül.
 * - Függőségek inverziója: A logika (API-hívások, szűrés) és az UI komponensek szétválasztása jobb karbantarthatóságot biztosít.
 */


function Employees() {
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [filters, setFilters] = useState({searchTerm: "", status: ""});
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchEmployees = async () => {
            try {
                const enrichedEmployees = await fetchEmployeesData();
                setEmployees(enrichedEmployees);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError("Nem sikerült lekérni az alkalmazottak adatait.");
            }
        };

        fetchEmployees();
    }, []);

    const toggleStatusMenu = () => {
        setIsStatusOpen((prev) => !prev); // Állapot gomb lenyitás/zárás
        if (isStatusOpen) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                status: "", // Állapot szűrő visszaállítása
            }));
        }
    };

    const handleStatusClick = (status) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            status: status,
        }));
    };
    const openModal = (modalId) => {
        setActiveModal(modalId); // Modális ablak megnyitása
    };

    const closeModal = () => {
        setActiveModal(null); // Modális ablak bezárása
    };

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredEmployees = filterEmployees(employees, filters);

    return (
        <div className={employeeStyles.pageContainer}>
            {/* Bal oldali oszlop */}
            <div className={employeeStyles.leftColumn}>
                <input
                    type="text"
                    placeholder="Keresés (név, pozíció)"
                    name="searchTerm"
                    value={filters.searchTerm}
                    onChange={handleFilterChange}
                    className={employeeStyles.searchInput}
                />

                {/* Állapot gomb */}
                <button
                    className={employeeStyles.statusButton}
                    onClick={toggleStatusMenu}
                >
                    Állapot
                </button>

                {isStatusOpen && <StatusButtons onStatusClick={handleStatusClick}/>}

                {/* Kör és szegmensek */}
                <div className={employeeStyles.circleContainer}>
                    <CircleSegment
                        segmentClass={employeeStyles.segment1}
                        label="Bér"
                        onClick={() => openModal("ber")}
                    />
                    <CircleSegment
                        segmentClass={employeeStyles.segment2}
                        label="Beosztás"
                        onClick={() => openModal("beosztas")}
                    />
                    <CircleSegment
                        segmentClass={employeeStyles.segment3}
                        label="Elbocsátás"
                        onClick={() => openModal("elbocsatas")}
                    />
                    <CircleSegment
                        segmentClass={employeeStyles.segment4}
                        label="Egyéb"
                        onClick={() => openModal("egyeb")}
                    />
                </div>
            </div>

            {/* Jobb oldali oszlop */}
            <div className={employeeStyles.rightColumn}>
                <h2>Dolgozói lista</h2>
                {error && <p className={employeeStyles.error}>{error}</p>}
                <table className={employeeStyles.employeeTable}>
                    <thead>
                    <tr>
                        <th>Vezetéknév</th>
                        <th>Keresztnév</th>
                        <th>Pozíció</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.lastName}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.positionName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modálok */}

            {activeModal === "ber" && <SalaryModal onClose={closeModal}/>}
            {activeModal === "beosztas" && <ScheduleModal onClose={closeModal}/>}
            {activeModal === "elbocsatas" && <DismissalModal onClose={closeModal}/>}
            {activeModal === "egyeb" && <OtherModal onClose={closeModal}/>}


        </div>
    );
}

export default Employees;