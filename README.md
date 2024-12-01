### Live Link
<a href='https://focusstube.netlify.app' target='_blank'>click here</a>

## Pulling and Running a Vite Project from GitHub

This guide outlines the steps to clone a Vite project from GitHub, install its dependencies, and run it locally.  It assumes you have Node.js, npm (or yarn), and Git installed.  If you don't have these, please install them before proceeding.  You can find installation instructions on their respective websites (nodejs.org, npmjs.com, git-scm.com).

### 1. Cloning the Repository

First, you need to clone the GitHub repository containing the Vite project. Replace `<github_repository_url>` with the actual URL of the repository.  You can find this URL by going to the GitHub repository and clicking on the green "Code" button.

**Step 1.1:** Open your terminal or command prompt.

**Step 1.2:** Execute the following Git command:

```bash
git clone https://github.com/USANJAY05/focusTube.git
```

This command will create a local copy of the repository in a new directory named `my-vite-project` (or the name of the repository).


### 2. Navigating to the Project Directory

After cloning, navigate to the project's directory using the `cd` command.

**Step 2.1:** In your terminal, type the following command, replacing `my-vite-project` with the actual name of the directory created in the previous step:

```bash
cd focusTube
```

### 3. Installing Dependencies

Most Vite projects use `npm` or `yarn` to manage dependencies. Check the project's `package.json` file (located in the project's root directory) to see which package manager is used.  This file will usually tell you which package manager the project was built with.

**Step 3.1:**  **Using npm:** If the `package.json` suggests using npm, or if you prefer npm, run the following command to install the dependencies:

```bash
npm install
```

**Step 3.2:** **Using yarn:** If the `package.json` suggests using yarn, or if you prefer yarn, run this command instead:

```bash
yarn install
```

This will install all the necessary packages listed in the `package.json` file.  This might take a few minutes depending on your internet connection and the size of the project's dependencies.


### 4. Running the Development Server

Once the dependencies are installed, start the development server. The command to start the server is usually defined in the `package.json` file under the `"scripts"` section.  Look for a script named `dev`, `serve`, `start`, or something similar.

**Step 4.1:** Find the correct command in your `package.json` file.  It will look something like this:  `"dev": "vite"` or `"start": "vite"`.

**Step 4.2:** Execute the appropriate command from your terminal:

```bash
npm run dev  // Or npm start, or yarn dev, or yarn start - depending on your package.json
```

This will start a development server, typically on `http://localhost:3000` (or a different port specified in the project's configuration or terminal output). Vite's hot module replacement (HMR) will automatically refresh the browser when you make changes to the code.


### 5. Building for Production

To build your project for production, you'll typically find a command like `build` in the `package.json`'s `scripts` section.

**Step 5.1:** Find the build command in your `package.json`.  It's usually `"build": "vite build"`.

**Step 5.2:** Run the appropriate command from your terminal:

```bash
npm run build  // Or yarn build
```

This creates an optimized `dist` folder containing the production-ready files.

