# GameKart Frontend 🎮

This is the frontend for **GameKart**, a full-stack e-commerce platform for gaming consoles and accessories. It is built using **React.js** and styled with **TailwindCSS**. The application supports **Google OAuth** login (only for approved users), displays product listings, and enables order tracking.

## 🚀 Live Demo

🔗 [Live Demo](https://gamekart-app.netlify.app)

## ✨ Features

- Google Sign-In (only pre-approved users can log in)
- Product listing with color and size variants
- Product detail page with size and color selectors
- Add to cart and view cart
- Checkout page (mock payment)
- Role-based navigation for Admin and Rider
- Mobile-responsive PWA Rider view

## 🛠 Tech Stack

- React.js
- Tailwind CSS
- Axios
- React Router

## 🔐 Login Access

Only users whose emails have been added to the backend’s approved list can log in. You must be added manually via `seed.js` in the backend repo to gain access.

## 📦 Setup Instructions

```bash
git clone https://github.com/akashtripathi1/gamekart-frontend.git
cd gamekart-frontend
npm install
npm run dev
```

🔑 Make sure your email is added in the backend’s approved_emails before attempting login.

## 🧩 Related Repositories

Backend: [GameKart Backend](https://github.com/akashtripathi1/gamekart-backend)
