# Insure Board

A backend service to upload, process, and manage insurance policy data from CSV/XLSX files using Node.js, MongoDB & worker threads.

---

## Tech Stack

- Node.js(Version-16) + Express
- MongoDB (Mongoose)
- Worker Threads
- Multer, XLSX, CSV Parser
- node-schedule (timed DB inserts)

---

## How to Run

1. **Clone & Install**
   git clone <repo_url>
   cd insure-board
   npm install

2. **.env Setup**
PORT=3000
MONGO_URI=<your_mongo_uri>

3. **Start Server**
npm start
   or
npm run dev- if nodemon is installed

**API Summary**
| Method | Endpoint                             | Description                       |
| ------ | ------------------------------------ | --------------------------------- |
| POST   | `/api/policy/upload`                 | Upload .csv/.xlsx (worker thread) |
| GET    | `/api/policy/search?name=Abc`        | Get policy info by username       |
| GET    | `/api/policy/userPolicyStats`        | Aggregated policy stats by user   |
| POST   | `/api/scheduler/message`             | Schedule DB insert on date/time   |

**Author**
Ayush Kashyap – Sr. Backend Developer