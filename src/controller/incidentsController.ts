// controller for incident
// controller for comment
import express from "express";
import {
  createIncident,
  updateIncident,
  getAllIncidentBasedOnUsers,
  assignIncident,
} from "../service/incidentService";
import { Protect } from "../middleware/protected";

// create express object
const router: express.Router = express.Router();

// router createincident
router.post("/create/incident", Protect, createIncident);
// router for update incident
router.patch("/update/incident/:id", Protect, updateIncident);
//router for get
router.get("/get/incident", Protect, getAllIncidentBasedOnUsers);
// router for assign  incident
router.post("/assign/incident", Protect, assignIncident);

export {router}