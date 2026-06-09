// incident service module
import { Incident } from "../model/Incidents";
import { UserModel } from "../model/users";
import express from "express";
import debug from "debug";
import { validateUser } from "../helper/validateUser";
import { Log } from "../model/logs";
import mongoose from "mongoose";
import { IncidentUpdate } from "../model/IncidentUpdates";
const log: any = debug("app:incidentservice");
// method for creating incident
export async function createIncident(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    // get request body
    const { title, description, severity, status } = req.body;
    // checkinh if all required data are entered
    if (!title || !description || !severity || !status) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    //valide user
    const userId: string = await validateUser(req);
    // checking the role of the user reporter
    const user: any = await UserModel.findOne({ _id: userId });
    // valide the role
    if (user.role === "Reporter") {
      // allowed to create incident
      await Incident.create({
        userId: userId,
        title,
        description,
        severity,
        status,
      });
      return res.status(201).json({
        success: true,
        message: "Incident creeted successfully",
      });
    }
    if (user.role !== "Reporter") {
      return res.status(403).json({
        success: false,
        message: "Only reporters can create incidents",
      });
    }
  } catch (err: any) {
    log(`There is error occurs during incident creation ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// method for creating incident
export async function updateIncident(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    // get request body
    const { id } = req.params;
    // check if it is valid id
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid id",
      });
    }
    const { status } = req.body;
    log(`The incoming id is  ${id}  and the icoming status is  ${status}`);
    // checking if status is present
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Incident status is required",
      });
    }

    const transitions: any = {
      open: "investigating",
      investigating: "resolved",
      resolved: "closed",
    };

    //valide user
    const userId: mongoose.Types.ObjectId = await validateUser(req);
    // checking the role of the user reporter
    const user: any = await UserModel.findOne({ _id: userId });
    // find the incident
    const incident: any = await Incident.findById(id);
    // checks if exists
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }
    if (transitions[incident.status] !== status) {
      return res.status(400).json({
        success: false,
        message: "Invalid status transition",
      });
    }
    // valide the role
    if (
      (user.role === "Operator" &&
        incident.assignedTo?.toString() === userId.toString()) ||
      user.role === "Admin"
    ) {
      // for step one status update
      if (status === "open") {
        await Incident.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              status: status,
            },
          },
        );

        // create log
        await Log.create({
          userId: userId,
          incidentId: incident._id,
          action: "Open",
          description: `User with role ${user.role} Updated the status of the incident to open`,
        });

        await IncidentUpdate.create({
          incidentId: incident._id,
          old_status: incident.status,
          new_status: status,
          updated_by: userId,
        });

        return res.status(200).json({
          success: true,
          message: "Incident status is updated successfully",
        });
      }

      // for step two status update  , update status to investigating
      else if (status === "investigating") {
        await Incident.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              status: status,
            },
          },
        );

        // create log
        await Log.create({
          userId: userId,
          incidentId: incident._id,
          action: "investigating",
          description: `User with role ${user.role} Updated the status of the incident to investigating`,
        });

        await IncidentUpdate.create({
          incidentId: incident._id,
          old_status: incident.status,
          new_status: status,
          updated_by: userId,
        });
        return res.status(200).json({
          success: true,
          message: "Incident status is updated successfully",
        });
      }
      // update status to close
      else if (status === "resolved") {
        await Incident.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              status: status,
            },
          },
        );

        // create log
        await Log.create({
          userId: userId,
          incidentId: incident._id,
          action: "resolved",
          description: `User with role ${user.role} Updated the status of the incident to resolved,`,
        });

        await IncidentUpdate.create({
          incidentId: incident._id,
          old_status: incident.status,
          new_status: status,
          updated_by: userId,
        });
        return res.status(200).json({
          success: true,
          message: "Incident status is updated successfully",
        });

        // update status to close
      } else if (status === "closed") {
        await Incident.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              status: status,
            },
          },
        );

        // create log
        await Log.create({
          userId: userId,
          incidentId: incident._id,
          action: "closed",
          description: `User with role ${user.role} Updated the status of the incident to closed,`,
        });

        await IncidentUpdate.create({
          incidentId: incident._id,
          old_status: incident.status,
          new_status: status,
          updated_by: userId,
        });

        return res.status(200).json({
          success: true,
          message: "Incident status is updated successfully",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid status transition or unauthorized action",
      });
    }
  } catch (err: any) {
    log(`There is error occurs during incident updating ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//method for fetching  all incident
export async function getAllIncidentBasedOnUsers(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    //valide user
    const userId: string = await validateUser(req);
    // checking the role of the user reporter
    const user: any = await UserModel.findOne({ _id: userId });
    // valide the role
    if (user.role === "Admin") {
      // allowed to update  incident
      const data = await Incident.find();
      return res.status(200).json({
        success: true,
        message: "Incident are fetched  successfully",
        data: data,
      });
    } else if (user.role === "Operator") {
      // allowed to update  incident
      const data = await Incident.find({ assignedTo: user._id });
      return res.status(200).json({
        success: true,
        message: "Incident are fetched  successfully",
        data: data,
      });
    } else if (user.role === "Reporter") {
      // allowed to update  incident
      const data = await Incident.find({ userId: user._id });
      return res.status(200).json({
        success: true,
        message: "Incident are fetched  successfully",
        data: data,
      });
    }
    return res.status(403).json({
      success: false,
      message: "Invalid role",
    });
  } catch (err: any) {
    log(`There is error occurs during incident  fetching  ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// method for admin to assign incidence to the
export async function assignIncident(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    const { incidentId, operatorId } = req.body;

    log(`incidentid is ${incidentId}  and operator id is ${operatorId}`);
    log(
      `incidentId: ${incidentId}, operatorId: ${operatorId}, type: ${typeof operatorId}`,
    );
    // validate ids
    if (
      !mongoose.isValidObjectId(incidentId) ||
      !mongoose.isValidObjectId(operatorId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid incident or operator id",
      });
    }

    // validate current user
    const userId = await validateUser(req);
    // checks if user is admin
    const admin: any = await UserModel.findById(userId);

    // only admin can assign
    if (admin.role !== "Admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can assign incidents",
      });
    }

    // check incident exists
    const incident: any = await Incident.findById(incidentId);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    // check operator exists
    const operator: any = await UserModel.findById(operatorId);

    if (!operator || operator.role !== "Operator") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not an operator",
      });
    }

    // assign incident
    await Incident.findByIdAndUpdate(
      incidentId,
      {
        $set: {
          assignedTo: operatorId,
        },
      },
      { new: true },
    );

    // create log
    await Log.create({
      userId,
      incidentId: incident._id,
      action: "assign",
      description: `Admin assigned incident to operator ${operator.name}`,
    });

    return res.status(200).json({
      success: true,
      message: "Incident assigned successfully",
    });
  } catch (err: any) {
    log(`Error assigning incident ${err.message}`);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
