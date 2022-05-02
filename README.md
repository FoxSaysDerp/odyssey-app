# Odyssey App 📷
Odyssey is an Instagram clone which resolves around sharing images within community.


![Nodejs](https://img.shields.io/badge/nodejs-17.8.0-brightgreen)
![Express](https://img.shields.io/badge/express-4.17.3-silver)
![React](https://img.shields.io/badge/React-18.0.0-blue)
---

## 💻 Launching in local enviroment 

### 🛠 Install
To install dependencies for both client and server:
```bash
npm run bootstrap:install
```
For separate instances:
```
npm run client:install
npm run server:install
```

### 🔑 Launch
Before launching, make sure to create `.env` files in both `server` and `client` directories using provided `.env.template` templates.

To launch both server and client parallely:
```
npm run bootstrap:start
```
For separate instances:
```
npm run client:start
npm run server:start
```

---

## 🌳 Project Structure 
This repository is a monorepo - it contains both server and client source files.

### 👔 Client 
```
client/
┣ public/
┣ src/
┃ ┣ common/
┃ ┃ ┣ components/ <- a shared components directory
┃ ┃ ┣ context/ <- directory for context API usages
┃ ┃ ┃ ┣ auth-context.js
┃ ┃ ┃ ┗ theme-context.js
┃ ┃ ┗ hooks/ <- custom hooks directory
┃ ┃   ┣ useAuth.js
┃ ┃   ┣ useForm.js
┃ ┃   ┗ useHttpClient.js
┃ ┣ constant/
┃ ┣ styles/
┃ ┃ ┣ app.scss
┃ ┃ ┣ Main.js
┃ ┃ ┗ theme.js
┃ ┣ util/
┃ ┃ ┗ validators.js
┃ ┃ 
┃ ┃ // Main application functionalities with their respective pages and componenets are stored in separte directories.
┃ ┃ 
┃ ┣ memories/
┃ ┃ ┣ components/
┃ ┃ ┗ pages/
┃ ┣ user/
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ UserItem.js
┃ ┃ ┃ ┗ UserList.js
┃ ┃ ┗ pages/
┃ ┃   ┣ Auth.js
┃ ┃   ┣ Logout.js
┃ ┃   ┗ Users.js
┃ ┣ App.js
┃ ┗ index.js
┣ .env <- Enviromental variables file
┣ .eslintrc.json
┗ .nvmrc <- node version used to compile client
```

### 🥼 Server 
```
server/
┣ controllers/ <- HTTP request controllers
┃ ┣ memories.js
┃ ┗ users.js
┣ middleware/
┃ ┣ check-auth.js
┃ ┗ file-upload.js
┣ misc/
┃ ┗ loading.js
┣ models/ <- MongoDB collection items' models
┃ ┣ http-error.js
┃ ┣ memory.js
┃ ┗ user.js
┣ routes/ <- Express routes
┃ ┣ memories.js
┃ ┗ users.js
┣ uploads/
┃ ┗ images/ <- directory which contains uploaded images
┣ util/
┃ ┗ path-to-unix.js
┣ .env <- Enviromental variables file
┗ app.js <- server launcher
```

## 📌 TODO:
 - Better styling and RWD
 - Liking and commenting specific photo
 - Image fetching optimization