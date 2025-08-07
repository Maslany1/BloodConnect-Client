![App Screenshot](https://i.ibb.co/r2YDdhpr/blood-connect-white-logo-nobg.png)

# Blood Donation Application - (Blood Connect)

A web application that helps users find and manage blood donors efficiently through a smart, location-based search and admin-controlled dashboard.

## Live Link

- Please Visit [Blood Connect](https://bloodconnect-3e8aa.web.app/) !

## ✅ Features of Blood Connect App

- 🔐 **Authentication & Authorization**  
  Secure login via Firebase with JWT-based API access and role-based control.

- 🩸 **Find Blood Donors Easily**  
  Filter donors by blood group, district, and upazila with responsive search.

- 📍 **Smart Location Filtering**  
  Upazila options dynamically appear based on district selection.

- 🧑‍🤝‍🧑 **Role-Based Dashboards**  
  Separate dashboards for Admin, Volunteer, and Donor with custom privileges.

- 💾 **CRUD for Donation Requests**  
  Donors can create/edit/delete requests. Admins manage all requests with status updates.

- 📝 **Blog Publishing System (CMS)**  
  Volunteers/Admins can create, update, and delete formatted blog posts with Jodit Editor.

- 📊 **Dashboard Statistics**  
  Admin dashboard includes: total users, total requests, and funds raised.

- 🚦 **Donation Status Workflow**  
  Statuses like pending, inprogress, done, and canceled are managed by Admin/Volunteers.

- 🧪 **Optimized API Requests**  
  All GET endpoints use TanStack Query with caching and refetching.

- 📂 **Pagination and Filtering**  
  Efficient list management with pagination and filters (status, role).

- 🔔 **Smart Notifications**  
  All interactions are confirmed using SweetAlert2 instead of native alerts.

- 🔒 **JWT-Protected Routes**  
  User sessions persist with secure localStorage and auto re-authentication.

- 💳 **Donation Page with Stripe**  
  Secure funding and payment processing via Stripe; donation history is saved.

- 📱 **Responsive UI**  
  Fully responsive design using Tailwind CSS and daisyUI, optimized for all screen sizes.

- 🌐 **Environment Variables & Secure Deployment**  
  All credentials are secured via .env files. Hosted using Netlify & Render.

## npm packages in Client Side

- Use [Babel](https://babeljs.io/) for Fast Refresh
- Uses [SWC](https://swc.rs/) for Fast Refresh
- Uses [Tailwind](https://tailwindcss.com/) for building custom user interfaces.
- Uses [daisyUI](https://daisyui.com/) for building web pages quickly and easily
- Uses [React Icons](https://react-icons.github.io/react-icons/) to easily add and customize icons from popular libraries
- Uses [React Router](https://reactrouter.com/) for handling routing and navigation within React applications
- Uses [React Hook Form](https://react-hook-form.com/) to manage form state, validation, and submission efficiently
- Uses [TanStack Query](https://tanstack.com/query/latest) for efficient data fetching, caching, synchronizing server state, and background updates
- Uses [Firebase](https://firebase.google.com/) for backend services: auth, database, storage, hosting, functions.
- Uses [lottie-react](https://lottiereact.com/) for renders lightweight, interactive animations in React web apps.
- Uses [SweetAlert2](https://sweetalert2.github.io/) for creating beautiful, customizable, and responsive alert popups in web applications easily.
- Uses [Jodit Editor](https://xdsoft.net/jodit/) to integrate a rich text editor in React apps for creating and editing formatted content easily.
- Uses [stripe](https://stripe.com/) to easily integrate secure payment processing and manage transactions
- Uses [Axios](https://axios-http.com/) for making HTTP requests from client to server. 
- Uses [Firebase](https://firebase.google.com/) for deploys, hosts websites. 

## Technologies Used

- ![React](https://img.shields.io/badge/React-v19.1.0-155dfc?logo=react&logoColor=%2361DAFB)
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1.11-155dfc?logo=tailwindcss)
- ![Axios](https://img.shields.io/badge/axios-v1.10.0-155dfc?logo=axios&logoColor=%235A29E4)
- ![React Router](https://img.shields.io/badge/React_Router-v7.6.3-155dfc?logo=reactrouter&logoColor=%23CA4245)
- ![Lottiefiles](https://img.shields.io/badge/Lottiefiles-v2.4.1-155dfc?logo=lottiefiles&logoColor=%2300DDB3)
- ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-v7.60.0-155dfc?logo=reacthookform&logoColor=%23EC5990)
- ![TanStackQuery](https://img.shields.io/badge/TanStack_Query-v5.83.0-155dfc?logo=reactquery&logoColor=%23FF4154)
- ![Stripe](https://img.shields.io/badge/Stripe-v7.5.0-155dfc?logo=stripe&logoColor=%23635BFF)
- ![Firebase](https://img.shields.io/badge/Firebase-v11.10.0-155dfc?logo=firebase&logoColor=%23DD2C00)


## 🛠️ Installation & Setup Instructions

Follow the steps below to set up the **Blood Connect** application locally:

---

### 1. Clone the Repositories

```bash
git clone https://github.com/Arman3747/BloodConnect-Client.git
git clone https://github.com/Arman3747/BloodConnect-Server.git
```

---

### 2. Client Setup

```bash
cd BloodConnect-Client
npm install
```

Create a `.env.local` file in the root of the client folder and add the following:

```env
VITE_apiKey=your_firebase_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_image_upload_key=your_imbb_image_upload_key
VITE_PAYMENT_KEY=your_stripe_payment_key
```

Then start the client:

```bash
npm run dev
```

---

### 3. Server Setup

```bash
cd BloodConnect-Server
npm install
```

Create a `.env` file in the root of the server folder and add the following:

```env

BloodConnect_DB_USER=your_mongodb_admin_username
BloodConnect_DB_PASS=your_mongodb_admin_password
PAYMENT_GATEWAY_KEY=your_stripe_payment_key
FB_SERVICE_KEY=your_FireBase_service_key

```

Then start the server:

```bash
nodemon index.js
```

### Thank you for Reading!