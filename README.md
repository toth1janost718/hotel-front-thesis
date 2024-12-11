# CheckInn szállásfoglaló rendszer

Ez a projekt egy **hotelmenedzsment alkalmazás**, amelyet a modern szállodák napi működésének támogatására fejlesztettek ki.
Az alkalmazás célja, hogy megkönnyítse a szállodai műveleteket, mint például a foglalások kezelése, számlázás, éttermi rendeléskezelés és az adminisztratív folyamatok. A rendszer moduláris felépítése és a **SOLID elvek** mentén történő fejlesztése rugalmas és könnyen bővíthető alapot biztosít.

## Fő funkciók

### 1. **Foglaláskezelés**
- Szobafoglalások időpont alapú kezelése.
- Szobák státuszainak vizualizálása (pl. szabad, foglalt, karbantartás alatt).
- Vendégkapacitás kezelése szobatípusok alapján.
- Rugalmas dátumválasztás integrált naptárkomponenssel.

### 2. **Számlázás**
- Szobaszám alapú számlagenerálás (PDF formátumban).
- Nyitott és fizetett számlák szűrése.
- Számlák állapotának (pl. fizetve) frissítése.
- Részletes fogyasztási lista megtekintése.

### 3. **Éttermi rendeléskezelés**
- Vendégek éttermi rendeléseinek kezelése szobaszám alapján.
- Dinamikusan generált étlap képekkel és kategóriaszűrőkkel.
- Kosár funkció, amely lehetővé teszi több tétel egyidejű hozzáadását.
- Éttermi számlák generálása és rendelési státuszok kezelése.

### 4. **Adminisztratív modulok**
- Szobatípusok és árak dinamikus kezelése.
- HR modul, amely támogatja a munkatársak időbeosztásának és szabadságkérelmeinek kezelését.

## Technológiai háttér

- **Frontend**: React.js
    - Moduláris komponensstruktúra.
    - Stílusok: CSS modulok.
    - Külső könyvtárak: React Pro Sidebar, React Datepicker, React Bootstrap.

- **Backend**: ASP.NET Core Web API
    - RESTful API-k a backend logika és adatbázis kezeléséhez.
    - DTO (Data Transfer Object) alapú adatátvitel a hatékonyság érdekében.
    - Számlák generálása PDF formátumban.

- **Adatbázis**: MySQL
    - Relációs adatbázis a szállodai adatok kezelésére.
    - Táblakapcsolatok (pl. szobák, foglalások, vendégek, rendelési tételek).

## Moduláris felépítés

### Frontend
- **Foglaláskezelés** (`Booking.jsx`):
    - Szobák és státuszok megjelenítése.
    - Vendégek adataihoz kapcsolódó foglalási logika.
- **Számlázás** (`Billing.jsx`):
    - Számlák szűrése és állapotfrissítése.
    - PDF számlák generálása.
- **Étterem** (`Restaurant.jsx`):
    - Menük és rendelési tételek kezelése.
    - Kosár logika és rendelési felugró értesítések.

### Backend
- **Foglalások kezelése**:
    - API végpontok a foglalási adatok lekérésére és kezelésére.
- **Számlák kezelése**:
    - Számlák generálása és státuszfrissítések.
- **Éttermi rendeléskezelés**:
    - Rendelési adatok API alapú feldolgozása.

## API Végpontok

### Foglalások
- `GET /api/RoomTypes`: Szobatípusok és kapacitások lekérése.
- `POST /api/BookingManage/create`: Új foglalás mentése.

### Számlázás
- `GET /api/Billing/rooms-total-billing`: Számlák listázása.
- `GET /api/Billing/generate-invoice/{roomNumber}`: Számlagenerálás adott szobaszám alapján.
- `PUT /api/Order/mark-as-paid/{orderId}`: Számla státuszának frissítése (fizetve).

### Éttermi rendeléskezelés
- `GET /api/Restaurant/menu-items`: Menüelemek lekérése.
- `POST /api/Restaurant/order`: Új rendelés rögzítése.

## Használat

1. **Előkészületek**:
    - Adatbázis inicializálása (MySQL) a megfelelő táblákkal és relációkkal.
    - Backend indítása ASP.NET Core alkalmazásként.
    - Frontend telepítése (`npm install`) és indítása (`npm start`).

2. **Foglalás kezelése**:
    - Navigálj a "Foglalás" menüpontra, válassz egy dátumot, majd kattints a szobára.

3. **Számlázás**:
    - Válaszd ki a "Számlák" menüpontot, szűrd a számlákat "Nyitott" vagy "Fizetett" státusz alapján.
    - Generálj új számlát szobaszám alapján.

4. **Éttermi rendelések**:
    - Válaszd az "Étterem" menüpontot, válassz ételt, majd add hozzá a kosárhoz.
    - Válaszd ki a szobaszámot és véglegesítsd a rendelést.

## Jellemzők

- **Reszponzív felület**: Minden modul optimalizált asztali és mobil nézetre.
- **Automatikus validáció**: Dátumok és szobaszámok ellenőrzése minden tranzakció előtt.
- **Felhasználóbarát dizájn**: Könnyen navigálható felület, modern vizuális megjelenéssel.

## Jövőbeli fejlesztési lehetőségek

- **Többnyelvű támogatás**: Az alkalmazás nyelvi bővítése további lokalizációs opciókkal.
- **Statisztikai modul**: Elemzések a foglaltsági adatok és bevételek alapján.
- **Automatizált értesítések**: E-mail alapú értesítések a vendégek számára foglaláskor vagy számla kifizetésekor.

## Fejlesztői környezet

- **Node.js**: 16.14+
- **React**: 18.2.0
- **ASP.NET Core**: 6.0+
- **MySQL Server**: 8.0+

---

Ezt a rendszert a szállodai műveletek egyszerűsítése és hatékonyabbá tétele érdekében fejlesztettük. Használata csökkenti az adminisztratív terheket és javítja a vendégek elégedettségét.
