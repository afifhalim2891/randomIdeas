# RandomIdeas App
![screen](https://github.com/user-attachments/assets/361fded6-1b6d-4f09-b764-113ee96fc6dd)

## Usage

### Install Dependencies

Install dependencies on the front-end and back-end

```bash
npm install
cd client
npm install
```

### Back-end/Express Server

```bash
npm start
```

or

```bash
npm run dev (Nodemon)
```

Visit `http://localhost:5000`

### Front-end/Webpack Dev Server

```bash
cd client
npm run dev
```

Visit `http://localhost:3000`

To build front-end production files

```bash
cd client
npm run build
```

The production build will be put into the `public` folder, which is the Express static folder.

### Environment Variables

Rename `.env-example` to `.env` and add your MongoDB URI to the `.env` file.

```
MONGO_URI=your_mongodb_uri
```

### Notable Code For Reference
- Full stack file structure
- Setting up server using Express.js
- Setting up MongoDB and using it with Moongoose
- Using webpack to develope frontend
- Modules file system
- Dispatch custom event to communicate between modules
- How to stop propagation of event in event delegation
