# Favourite Restaurants Pins

Favourite Restaurants Pins is a map-based application where users can create pins for restaurants and other establishments. Only signed-in user can create pins. Each pin allows users to add details like the name, description, location, Google link (for navigation and reviews), and an Instagram link to showcase their visit. The application is built with modern tools like React, TypeScript, and Firebase, and leverages Leaflet for the map interface.

## Table of Contents

- [Favourite Restaurants Pins](#favourite-restaurants-pins)
  - [Table of Contents](#table-of-contents)
  - [Live Preview](#live-preview)
  - [Tech Stack](#tech-stack)
  - [Features](#features)
  - [Installation](#installation)
  - [Running the application](#running-the-application)
  - [Enviroment variables](#enviroment-variables)
  - [Roadmap / To do](#roadmap--to-do)

## Live Preview

https://my-favourite-restaurants.netlify.app/

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Shadcn
- **Maps**: Leaflet, React Leaflet, React Leaflet Cluster
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Validation**: Zod (Planned)
- **Build Tool**: Vite
- **Linting**: ESLint, TypeScript ESLint

## Features

- Create map pins with custom information:
  - Name
  - Description
  - Location
  - Google link (for navigation and reviews)
  - Instagram link (to showcase the visit)
- Mobile-responsive design using TailwindCSS
- Clustered map markers for better performance on larger datasets
- Firebase integration for backend storage and authentication
- (Planned) Editing and deleting markers
- (Planned) Uploading images for each establishment
- (Planned) Support for multiple establishment types (restaurant, coffee shop, bistro, etc.)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/bara-mapa.git
cd bara-mapa
```

2. Install dependencies

```bash
npm install
```

3. Set up your environment variables by copying .env.example to .env and filling in the Firebase credentials:

```bash
cp .env.example .env
```

## Running the application

```bash
npm run dev
```

## Enviroment variables

Create a .env file in the root directory of your project and add your Firebase credentials. These credentials can be obtained from your Firebase project settings.

```bash
API_KEY=<your-firebase-api-key>
AUTH_DOMAIN=<your-firebase-auth-domain>
PROJECT_ID=<your-firebase-project-id>
STORAGE_BUCKET=<your-firebase-storage-bucket>
MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
APP_ID=<your-firebase-app-id>
MEASUREMENT_ID=<your-firebase-measurement-id>

```

## Roadmap / To do

- [x] **Phase 1: Core Features**

  - [x] Implement map with Leaflet and React Leaflet
  - [x] Add the ability to create pins with details (name, description, location, etc.)
  - [x] Implement Firebase for backend and storage
  - [x] Make the map responsive for mobile

- [ ] **Phase 2: Enhancements**

  - [ ] Implement Zod for form validation
  - [ ] Add edit and delete functionality for markers
  - [ ] Allow users to upload images for each pin
  - [ ] Categorize establishments (restaurant, coffee shop, bistro, etc.)

- [ ] **Phase 3: Optimization & Refactoring**
  - [ ] Optimize code for performance
  - [ ] Refactor code for better readability and maintainability
  - [ ] Improve user interface with advanced animations and transitions
  - [ ] Implement additional security measures for Firebase
