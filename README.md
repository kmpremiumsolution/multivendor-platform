# Multi-Vendor Platform (Hotel + Restaurant + Mart)

Stack: Node.js + Express (backend), React + Vite (frontend), MongoDB (database)

## Structure
```
multivendor-platform/
├── backend/          # Express API
│   ├── models/        (User, Vendor, Product, Order)
│   ├── controllers/
│   ├── routes/
│   ├── middleware/    (JWT auth)
│   └── server.js
└── frontend/          # React app
    └── src/
        ├── pages/      (Home, VendorDetail, Login, Register, MyOrders)
        ├── components/ (Navbar)
        └── context/    (AuthContext)
```

## Local mein chalane ka tareeqa

### 1. Database (MongoDB Atlas - free)
1. mongodb.com/cloud/atlas par free account banayein
2. Free cluster create karein
3. Connection string copy karein (mongodb+srv://...)

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# .env file mein MONGO_URI aur JWT_SECRET daalein
npm run dev
```
Server `http://localhost:5000` par chalega.

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
App `http://localhost:3000` par khulega.

## Kya kaam karta hai (abhi tak)
- User register/login (customer ya vendor role ke sath) — JWT authentication
- Vendor listing (restaurant/hotel/mart type se filter)
- Har vendor ke products/rooms dekhna
- Cart mein add karke order place karna
- "Mere Orders" page par apne orders dekhna
- Role-based access: sirf vendor/admin hi apna vendor profile aur products manage kar sakte hain

## Hostinger par Deploy karne ka tareeqa

### Agar Hostinger VPS hai:
1. VPS par Node.js install karein (`nvm install --lts`)
2. GitHub repo ko VPS par clone karein
3. Backend: `npm install`, `.env` set karein, phir `pm2 start server.js` se background mein chalayein
4. Frontend: `npm run build` karein, `dist/` folder ko Nginx se serve karein
5. Nginx reverse proxy set karein: `/api` requests backend (port 5000) ko forward karein
6. Domain point karke SSL (Let's Encrypt / Hostinger SSL) activate karein

### Agar Hostinger Shared Hosting hai (Node.js support ke sath):
1. hPanel → Advanced → Node.js app create karein
2. Backend folder upload karein, `.env` set karein, startup file `server.js` set karein
3. Frontend: `npm run build` se `dist/` banayein, us folder ka content `public_html` mein upload karein
4. `.htaccess` mein `/api` ko Node app ke port par proxy karein

**Note:** Shared hosting par MongoDB nahi chalta — MongoDB Atlas (cloud, free tier) use karna hoga jo already upar mention kiya hai.

## Agla step (jab ap ready hon)
- Payment gateway integration (JazzCash/Easypaisa/Stripe)
- Vendor dashboard (order accept/reject, product add/edit UI)
- Admin panel (vendor approval, commission tracking)
- Image upload (Cloudinary ya multer+local storage)
- Real-time order tracking (Socket.io)
- Hotel booking ke liye date-range availability check
