# Employee Register Application

Aplikasi ini adalah sistem registrasi karyawan sederhana yang terdiri dari backend API menggunakan .NET Core dan frontend menggunakan React. Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, dan menghapus data karyawan, termasuk mengunggah foto profil karyawan.

## Daftar Isi
- [Employee Register Application](#employee-register-application)
  - [Daftar Isi](#daftar-isi)
  - [Teknologi yang Digunakan](#teknologi-yang-digunakan)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Persyaratan Sistem](#persyaratan-sistem)
  - [Cara Menjalankan](#cara-menjalankan)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Alur Aplikasi](#alur-aplikasi)
    - [1. Frontend](#1-frontend)
    - [2. Backend](#2-backend)
    - [3. Database](#3-database)
  - [Fitur](#fitur)

## Teknologi yang Digunakan

### Backend
- .NET Core 8.0
- Entity Framework Core
- SQL Server
- Swagger
- CORS

### Frontend
- React 18.3.1
- Axios
- Bootstrap 4.5
- FontAwesome

## Persyaratan Sistem
- .NET Core SDK 8.0 atau lebih tinggi
- Node.js dan npm/pnpm
- SQL Server
  
## Cara Menjalankan
### Backend
1. Clone repository ini ke dalam direktori lokal Anda.
2. Navigasi ke folder `EmployeeRegisterAPI`
   ```bash
   cd EmployeeRegisterAPI
   ```
3. Restore dependencies dengan menggunakan `dotnet`:
   ```bash
   dotnet restore
   ```
4. Setup database:
- Edit string koneksi di `appsettings.json` sesuai dengan konfigurasi SQL Server Anda.
- Jalankan migrasi database:
  ```bash
  dotnet ef migrations add InitialCreate
  ```
  ```bash
  dotnet ef database update
  ```
5. Jalankan Aplikasi
   ```bash
   dotnet run
   ```
  
Aplikasi akan berjalan di `http://localhost:8000`.

### Frontend
1.  Navigasi ke folder `EmployeeRegisterClient`
    ```
     cd EmployeeRegisterClient
    ```
2. Install dependencies:
   ```
   pnpm install
   ```
3. Jalankan aplikasi frontend:
   ```
   pnpm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`.

## Alur Aplikasi 
### 1. Frontend
- Pengguna dapat menambahkan, mengedit, atau menghapus karyawan melalui antarmuka pengguna.
- Setelah form disubmit, data akan dikirim ke backend melalui API menggunakan Axios.
- Gambar profil karyawan diunggah dan pratinjau gambar ditampilkan.

### 2. Backend

- Backend menerima data dari frontend dan memprosesnya.
- Data karyawan disimpan di database SQL Server.
- Jika ada gambar yang diunggah, backend menyimpannya di folder Images.
- API menyediakan endpoint untuk CRUD (Create, Read, Update, Delete) operasi karyawan.
  
### 3. Database

- Aplikasi menggunakan Entity Framework Core untuk mengelola database.
- Setiap perubahan data karyawan (seperti menambah atau menghapus) di-backup ke dalam database.
  
## Fitur
- CRUD Operations: Menambahkan, mengedit, dan menghapus data karyawan.
- Image Upload: Mengunggah dan menyimpan gambar profil karyawan.
- Responsive Design: Antarmuka pengguna yang responsif dan mudah digunakan.
- Data Validation: Validasi input pengguna pada frontend dan backend.


