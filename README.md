# Backend API - Autentikasi User + CRUD Items

Repositori ini merupakan **lanjutan dan pengembangan** dari tugas backend sebelumnya (repo: `user_management_api`).  
Pada versi ini dilakukan **penambahan fitur CRUD untuk data Items** yang nantinya digunakan oleh aplikasi **Frontend React CRUD Dashboard** pada repositori **latihan_frontend**

---

## 📌 Fitur Utama

| Fitur | Status | Keterangan |
|------|--------|------------|
| Register User | Menggunakan hashing password (bcrypt) |
| Login + JWT Auth | JWT disimpan di localStorage (di sisi frontend) |
| Get List Users | Hanya untuk role tertentu jika diperlukan |
| **CRUD Items** | Setiap user hanya dapat mengakses item miliknya sendiri |

---

## 🛠 Perubahan Dari Backend Sebelumnya

Backend ini **sama dengan yang ada pada tugas `user_management_api`**, namun terdapat **penambahan fitur** berikut:

### 1. Menambahkan Tabel `items` di PostgreSQL

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
````

### 2. Menambah Controller Baru

`/src/controllers/itemController.js`

Berisi fungsi:

* `getItems`
* `createItem`
* `updateItem`
* `deleteItem`

(Setiap request item **menggunakan user_id dari token** agar user hanya dapat mengelola datanya sendiri.)

### 3. Menambahkan Routing Baru

`/src/routes/itemRoutes.js`

Dengan proteksi token:

```
GET    /api/items
POST   /api/items
PUT    /api/items/:id
DELETE /api/items/:id
```

### 4. Register Route di `index.js`

```js
import itemRoutes from "./src/routes/itemRoutes.js";
...
app.use("/api/items", itemRoutes);
```

---

## 🚀 Cara Menjalankan Project

### 1. Clone Repo

```bash
git clone https://github.com/USERNAME/backend-user-items.git
cd backend-user-items-api
```

### 2. Install Dependency

```bash
npm install
```

### 3. Buat file `.env`

```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/nama_database
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

### 4. Jalankan Server

```bash
npm run dev
```

Server berjalan di:

```
http://localhost:5000
```

---

## 🔗 Repo Frontend Yang Menggunakan Backend Ini

Frontend yang terhubung dengan API ini:

➡️ **[https://github.com/anisamalia2/latihan_frontend](https://github.com/anisamalia2/latihan_frontend)** 

---

## 👩‍💻 Teknologi yang Digunakan

* Node.js + Express.js,
* PostgreSQL (pg),
* Cloudinary (upload avatar),
* JWT (jsonwebtoken),
* bcryptjs (hash password),
* Helmet + CORS (keamanan),
* Multer + Streamifier (upload handler),
* Nodemon (development mode).

---
