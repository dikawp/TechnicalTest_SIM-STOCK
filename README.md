# Technical Test - Simulasi Manajemen Stok (SIM-STOCK)

Ini adalah aplikasi web untuk *technical test*:
* **Backend:** Laravel 12 (sebagai API)
* **Frontend:** React + TypeScript (sebagai Admin Dashboard)
* **Database:** MySQL
* **Connector:** Inertia.js
* **Auth:** Laravel Fortify
* **UI:** Tailwind CSS & Lucide Icons
* **Routing Frontend:** Wayfinder (Type-safe routes)

---

## Requirement:
* PHP >= 8.2
* Composer 2
* Node.js >= 18.x
* NPM (atau Yarn/PNPM)
* Laragon / XAMPP (MySQL)

---

## Cara Setup: 

### 1. Clone 
```bash
git clone [https://github.com/dikawp/TechnicalTest_SIM-STOCK.git](https://github.com/dikawp/TechnicalTest_SIM-STOCK.git)
```

### 2. Instal Dependensi 
```bash
composer install
npm install
```


### 3. Konfigurasi 
```bash
cp .env.example .env
php artisan key:generate
```

### === SETUP ENV ===
#### Buka file .env 
#### Atur koneksi database (DB_DATABASE, DB_USERNAME, DB_PASSWORD). Pastikan database tersebut sudah ada di MySQL.
### ==============


### 4. Migrasi Database 
```bash
php artisan migrate
```

### 5. Generate Rute Type-Safe 
```bash
php artisan wayfinder:generate
```

### 6. Jalankan Aplikasi 
```bash
composer run dev
```
