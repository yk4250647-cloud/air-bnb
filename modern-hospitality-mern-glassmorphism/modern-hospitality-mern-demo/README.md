# Modern Hospitality — MERN Demo

A UI-first, inquiry-based vacation-rental marketplace demo built with:
- MongoDB + Mongoose (optional; falls back to local JSON storage for demo)
- Express + Node.js
- React + Vite
- Tailwind CSS v4

## Demo features
- Premium, responsive homepage with glassmorphism navigation and hero search panel
- Property discovery and filters with destination search
- Frosted-glass surfaces, translucent image labels, and responsive search controls
- Property detail pages
- Contact Us form
- Booking inquiry form
- Property-owner / retailer partnership form
- Admin inquiry dashboard
- Inquiry statuses and internal notes
- No payment gateway or automated booking confirmation

## Requirements
- Node.js 20.19+ recommended
- npm
- MongoDB is optional for a quick local demo

## Run locally

### 1. Start the backend
```bash
cd server
npm install
copy .env.example .env
npm run dev
```
On macOS/Linux, use `cp .env.example .env` instead of `copy`.

The server runs at `http://localhost:5000`.

If `MONGODB_URI` is empty, inquiries are saved to `server/data/inquiries.json` for local demo use.

### 2. Start the frontend in a second terminal
```bash
cd client
npm install
npm run dev
```
Open the URL printed by Vite, usually `http://localhost:5173`.

## Admin demo
Open `/admin` in the frontend. This is a demo-only dashboard without production authentication. Do not expose it publicly or use it with real customer data.

## Visual direction
- Warm ivory (`#F4F0E8`), forest green (`#173B32`), charcoal, and muted sage
- Reusable glass-like surfaces with translucent backgrounds, subtle borders, and backdrop blur
- Reduced-motion support and visible keyboard focus states

## Important demo behavior
- Property listings are illustrative sample data.
- Submitting an inquiry does not confirm a reservation.
- No payments, payouts, or live availability are implemented.
- Email notifications are not configured in this starter.
- Before production, add proper admin authentication, rate limiting, email delivery, privacy controls, and operational monitoring.

## Project structure
```text
modern-hospitality-mern-demo/
  client/
    src/
      components/
      data/
      pages/
      App.jsx
      main.jsx
      index.css
  server/
    src/
      models/
      routes/
      index.js
    data/
```
