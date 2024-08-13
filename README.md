This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Car Dealer App

## Overview

This application allows users to select a car brand and model from dropdown menus on the main page. After selecting the car brand and model, users are redirected to a new page where they can view all available versions of the selected model along with their IDs.

## Features

-   **Car Make and Model Selection**: Users can choose a car brand and model from dropdown lists.
-   **Display Versions**: After selecting a model, users are redirected to a page displaying all versions of the chosen model, including their IDs.

## Architecture

-   **Frontend**: Built with [Next.js](https://nextjs.org/) and React.
    -   **Next.js**: Utilizes Next.js for server-side rendering (SSR) and static site generation (SSG) to enhance performance and SEO.
    -   **React**: Uses React for building user interfaces and handling state management.
-   **Routing**: Managed by Next.js's file-based routing system, which provides automatic routing based on the file structure.
-   **State Management**: Uses React state to manage selections and data flow between pages.

## Installation

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/get-npm) installed.

### Steps

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ferdeolazabal/DevelopsToday-chanllenge.git
    cd ferdeolazabal
    ```

2. **Run the following command to install necessary dependencies**

```
npm install
```

3. **Run the development server**

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
