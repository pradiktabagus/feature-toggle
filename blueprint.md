# Project Blueprint: Toggle Feature System

## Overview

This project aims to develop a custom toggle feature system using Next.js, serving as an alternative to Firebase Remote Config to address potential usage limits. The system will also include a simple dashboard for monitoring toggle usage. The project adopts the Feature-Sliced Design (FSD) architecture for better code organization.

## Project Details

*   **Purpose:**
    *   To create a self-hosted toggle feature management system.
    *   To provide a dashboard for monitoring toggle feature usage with basic visualizations (e.g., simple graphs).
*   **Technology Stack:**
    *   **Frontend:** Next.js (App Router), React
    *   **UI Components:** shadcn/ui
    *   **Form Management:** react-hook-form
    *   **Form Validation:** zod
    *   **API Communication (Future):** Axios, Tanstack React Query
    *   **Database (Future):** MongoDB
    *   **Authentication (Temporary):** Firebase Authentication
*   **Architecture:** Feature-Sliced Design (FSD)
*   **Key Features:**
    *   Creation, management, and toggling of features.
    *   Dashboard for monitoring toggle usage (including simple graphs).
    *   User authentication (initially via Firebase).
*   **Current Status:**
    *   Basic folder structure is set up.
    *   shadcn/ui is implemented.git
    *   Basic dashboard structure is in place.
    *   Toggle features page is being planned.

## Plan for Toggle Features Page (`/toggle-features`)

This section outlines the plan for creating the `/toggle-features` page, which will be the central hub for managing toggle features.

### Components

*   **Toggle List Table:** A data table component (using shadcn/ui's `Table`) to display existing toggle features with columns for name, description, current state, and actions (edit, delete).
*   **Create Toggle Form:** A form component (using `react-hook-form` and `zod`) for creating new toggle features. This form will include fields for toggle name, description, and initial state.
*   **Edit Toggle Form:** A form component similar to the create form, pre-populated with existing toggle data for editing.
*   **Toggle Row Actions:** Dropdown menu or buttons within each row of the table for triggering edit and delete actions.
*   **Modal/Dialog:** Used to display the create and edit toggle forms.

### API Endpoints (Planned)

*   `GET /api/toggles`: Fetch a list of all toggle features.
*   `POST /api/toggles`: Create a new toggle feature.
*   `PUT /api/toggles/:id`: Update an existing toggle feature.
*   `DELETE /api/toggles/:id`: Delete a toggle feature.

### Data Structures (Planned)

*   **Toggle Feature Object:**


## Future Considerations

*   Transitioning from temporary Firebase Authentication to a custom authentication system if needed.
*   Implementing MongoDB for persistent storage of toggle configurations and usage data.
*   Integrating Axios and Tanstack React Query for efficient API calls.
*   Implementing rate limiting to prevent DoS attacks (as discussed).

## Plan for Current Change

No specific change requested at this moment, but the blueprint is created to document the project's foundation and future direction.

### Actionable Steps for Current Change

*   Create the `blueprint.md` file with the documented project details.