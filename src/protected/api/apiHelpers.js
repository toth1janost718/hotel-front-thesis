import config from "../../../config.js";

/**
 * Általános API hívás kezelése.
 * @param {string} endpoint - Az API végpont URL-je.
 * @param {Object} options - Opcionális beállítások (method, headers, body, baseUrl, stb.).
 * @returns {Promise<any>} - Az API válasz JSON objektuma.
 * @throws - Hiba esetén dobja a hibát.
 */
export const fetchApiData = async (endpoint, { baseUrl = "hrApiBaseUrl", ...options } = {}) => {
    try {
        // Az adott baseUrl érték alapján készítjük el a teljes URL-t
        const fullUrl = `${config[baseUrl]}${endpoint}`;
        const response = await fetch(fullUrl, options);
        if (!response.ok) {
            const message = `Hiba történt az API hívás során: ${response.statusText}`;
            console.error(message);
            throw new Error(message);
        }
        return await response.json();
    } catch (error) {
        console.error(`API hívási hiba: ${endpoint}`, error);
        throw error;
    }
};
