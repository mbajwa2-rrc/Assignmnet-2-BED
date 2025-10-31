import express, { Router } from "express";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployeesFromBranch,
    getAllEmployeesFromDepartment
} from "../controllers/employeeController";

const router: Router = express.Router();

router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.get("/employees/branch/:branchId", getAllEmployeesFromBranch);
router.get("/employees/department/:department", getAllEmployeesFromDepartment);

export default router;