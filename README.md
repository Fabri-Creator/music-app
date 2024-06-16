# Project Execution Guide

This README provides instructions on how to run the project in both development and production modes.

---

## Development Mode

### Setup

1. **Clone Repository:**
git clone https://github.com/Fabri-Creator/music-app>

cd music-app

3. **Install Dependencies:**
npm install

4. **Start Development Server:**
npm run dev  

This command will start the development server. By default, it should open a new browser window/tab with the development version of your project running. Changes made to the code will trigger hot reloading, updating the application in real-time.

Open your web browser and navigate to http://localhost:5173 (or another specified port if configured differently). You should see the application running in development mode.


## Production Mode

### To run the project in production mode, follow these steps:

1. **Build the Project:**
npm run build
This command generates a production-ready build of the project in the dist directory.

2. **Serve the Build:**
Use a static server to serve the built files. You can use tools like serve for this purpose:

npm install -g serve
serve -s build

This serves the built project at http://localhost:3000 (or another specified port).

4. **Access the Production Application:**
Open your web browser and navigate to http://localhost:3000 (or the port specified). You should see the production version of your application.

