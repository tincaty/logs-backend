import express from "express";
import { fetchAllLogs } from "../service/logService";
import { Protect } from "../middleware/protected";

// create express object
const router: express.Router = express.Router();

// router for get all logs
router.get("/get/logs", Protect, fetchAllLogs);

export { router };
