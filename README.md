# Ilustracja Obliczeń Światłowodowych (Fiber Optic Calculations Illustration)

This is a React application built to illustrate calculations for fiber optic transmissions. It helps students and engineers understand and visualize various parameters involved in fiber optic communication systems.

## Features

- **Interactive Inputs**: Configure input variables such as Route Length, Attenuation Coefficients, Splice Distances, Connector Losses, Dispersion, Wavelength, Bandwidths, and more.
- **Real-time Calculations**: Automatically computes results for Segment Attenuation, Splice Count, Total Attenuation (FDCF & DCF), Dispersion Length (LDCF), Transmitter Power, and Sensitivity.
- **Visualizations**: Visual feedback with distinct highlighting for FDCF (Fiber Dispersion Compensation Fiber) and DCF (Dispersion Compensation Fiber) components.
- **Dual Layout Modes**: Switch between a standard **List view** and a **Grid (Kafelki) view** for different visualization preferences.
- **Responsive Design**: Modern, responsive UI with a custom dark theme (Cyan/Red/Yellow palette).
- **Tooltips**: Integrated educational tooltips with diagrams (where applicable) to explain how to find or calculate specific input values.

## Technologies Used

- **React**: UI Library.
- **Styled Components**: CSS-in-JS for styling and theming.
- **FontAwesome**: For icons.
- **Glegoo Font**: Providing a distinctive typography.
- **GitHub Pages**: For deployment.

## Color Theme

The application currently uses a high-contrast dark theme:

- **Background**: Very Dark Cyan/Black (`#000c0d`)
- **Text**: Light Cyan (`#d8f9fe`)
- **Primary**: Bright Cyan (`#7aecfc`)
- **Secondary**: Deep Red (`#9a0427`)
- **Accent**: Yellow/Orange (`#fab332`)

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- npm (Node Package Manager).

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run deploy`

Builds the app for production and deploys it to GitHub Pages.

## Deployment

The application is deployed at: [https://frogalo.github.io/transmision](https://frogalo.github.io/transmision)
