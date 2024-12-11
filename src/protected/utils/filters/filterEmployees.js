/**
 * Alkalmazottak szűrése keresési feltételek és státusz alapján.
 *
 * @param {Array} employees - Az alkalmazottak listája.
 * @param {Object} filters - A szűrési feltételek (searchTerm, status).
 * @returns {Array} - A szűrt alkalmazottak listája.
 */

export const filterEmployees = (employees, filters) => {
    return employees.filter((employee) => {
        const matchesSearchTerm =
            employee.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            employee.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            employee.positionName.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesStatus =
            filters.status === "" || employee.scheduleStatus === filters.status;

        return matchesSearchTerm && matchesStatus;
    });
};