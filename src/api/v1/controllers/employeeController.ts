import { Request, Response } from "express";
import {
  getAllEmployees as getAllEmployeesService,
  createEmployee as createEmployeeService,
  getEmployeeById as getEmployeeByIdService,
  updateEmployee as updateEmployeeService,
  deleteEmployee as deleteEmployeeService,
  getAllEmployeesFromBranch as getAllEmployeesFromBranchService,
  getAllEmployeesFromDepartment as getAllEmployeesFromDepartmentService,
} from "../services/employeeService";

import { successResponse, errorResponse } from "../models/responseModel";

/**
 * Create Employee
 */
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, position, department, email, phone, branchId } = req.body;

    if (!name || !position || !department || !email || !phone || branchId == null) {
      res.status(400).json(errorResponse(null, "Missing field."));
      return;
    }

    const newEmployee = await createEmployeeService({
      name,
      position,
      department,
      email,
      phone,
      branchId,
    });

    res.status(201).json(successResponse(newEmployee, "Employee created successfully."));
  } catch (error) {
    res.status(500).json(errorResponse(null, "Failed to create employee."));
  }
};

/**
 * Get All Employees
 */
export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees = await getAllEmployeesService();
    res.status(200).json(successResponse(employees, "Retrieved all employees successfully."));
  } catch (error) {
    res.status(500).json(errorResponse(null, "Failed to retrieve employees."));
  }
};

/**
 * Get Employee by ID
 */
export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await getEmployeeByIdService(id);

    if (!employee) {
      res.status(404).json(errorResponse(null, "Employee not found."));
      return;
    }

    res.status(200).json(successResponse(employee, "Employee retrieved successfully."));
  } catch (error) {
    res.status(500).json(errorResponse(null, "Failed to retrieve employee."));
  }
};

/**
 * Update Employee
 */
export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, position, department, email, phone, branchId } = req.body;

    if (!name || !position || !department || !email || !phone || branchId == null) {
      res.status(400).json(errorResponse(null, "Missing field."));
      return;
    }

    await updateEmployeeService(id, { name, position, department, email, phone, branchId });

    res.status(200).json(successResponse(null, "Employee updated successfully."));
  } catch (error) {
    res.status(500).json(errorResponse(null, "Failed to update employee."));
  }
};

/**
 * Delete Employee
 */
export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteEmployeeService(id);
    res.status(200).json(successResponse(null, "Employee deleted successfully."));
  } catch (error) {
    res.status(500).json(errorResponse(null, "Failed to delete employee."));
  }
};

/**
 * Get Employees by Branch
 */
export const getAllEmployeesFromBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { branchId } = req.params;

    if (!branchId) {
      res.status(404).json(errorResponse(null, "Branch not found."));
      return;
    }

    const data = await getAllEmployeesFromBranchService(branchId);
    res.status(200).json(successResponse(data, "Employees retrieved successfully."));
  } catch (error) {
    res.status(500).json(errorResponse(null, "Failed to retrieve employees."));
  }
};

/**
 * Get Employees by Department
 */
export const getAllEmployeesFromDepartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { department } = req.params;

    if (!department) {
      res.status(404).json(errorResponse(null, "Department not found."));
      return;
    }

    const data = await getAllEmployeesFromDepartmentService(department);
    res.status(200).json(successResponse(data, "Employees retrieved successfully."));
  } catch (error) {
    res.status(500).json(errorResponse(null, "Failed to retrieve employees."));
  }
};
