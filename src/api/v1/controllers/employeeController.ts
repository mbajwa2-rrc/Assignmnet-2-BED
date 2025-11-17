import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { successResponse, errorResponse } from "../models/responseModel";

/**
 * Creates a new employee after validation
 * @param req - Express request object
 * @param res - Express response object
 */
export const createEmployee = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {name, position, department, email, phone, branchId} = req.body;
        if (!name || ! position || !department || !email ||  !phone || branchId == null){
            res.status(400).json(errorResponse(
                null, 
                "Missing field."
            ));
            return;
        }
        const newEmployee = await employeeService.createEmployee({
            name,
            position,
            department,
            email,
            phone,
            branchId
        });
        res.status(201).json(successResponse(
            newEmployee, 
            "Employee created successfully."
        ));
    }
    catch (error){
        res.status(500).json(errorResponse(
            null, 
            "Failed to create employee."
        ));
    }
};

/**
 * Retrieves all employees
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllEmployees = async (req: Request, res: Response
): Promise<void> => {
    try{
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(successResponse(
            employees, 
            "Retrieved all employees successfully."
        ));
    }
    catch (error){
        res.status(500).json(errorResponse(
            null, 
            "Failed to retrieve employees."
        ));
    }
};

/**
 * Retrieves an employee by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getEmployeeById = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const employee = await employeeService.getEmployeeById(Number(id));
        if (employee){
            res.status(200).json(successResponse(
                employee,
                "Employee retrieved successfully."
            ));
        }
        else{
            res.status(404).json(errorResponse(
                null, 
                "Employee not found."
            ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to retrieve employee."
        ));
    }
};

/**
 * Updates the employee specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const updateEmployee = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const {name, position, department, email, phone, branchId} = req.body;
        if (!name || ! position || !department || !email ||  !phone || branchId == null){
            res.status(400).json(errorResponse(
                null, 
                "Missing field."
            ));
            return;
        }
        const updatedEmployee = 
            await employeeService.updateEmployee(Number(id), 
            {name, position, department, email, phone, branchId});
        if (updatedEmployee){
            res.status(200).json(successResponse(
                updatedEmployee,
                "Employee updated successfully."
            ));
        }
        else{
            res.status(404).json(errorResponse(
                null,
                "Employee not found."
            ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to update employee."
        ));
    }
};

/**
 * Deletes the employee specified
 * @param req - Express request object
 * @param res - Express response object
 */
export const deleteEmployee = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const deletedEmployee = await employeeService.deleteEmployee(Number(id));
        if (deletedEmployee){
            res.status(200).json(successResponse(
                null,
                "Employee deleted successfully."
            ));
        }
        else{
            res.status(404).json(errorResponse(
                null,
                "Employee not found"
            ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to delete employee."
        ));
    }
};

/**
 * Retrieves all employees from a branch
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllEmployeesFromBranch = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {branchId} = req.params;

        if (!branchId){
            res.status(404).json(errorResponse(
                null,
                "Branch not found."
            ));
            return;
        }
        const employeesFromBranch = await employeeService.getAllEmployeesFromBranch(Number(branchId));
        if (employeesFromBranch){
             res.status(200).json(successResponse(
                employeesFromBranch,
                "Employees retrieved successfully."
             ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to retrieve employees."
        ));
    }
};

/**
 * Retrieves all employees from a department
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllEmployeesFromDepartment = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {department} = req.params;

        if (!department){
            res.status(404).json(errorResponse(
                null,
                "Department not found."
            ));
            return;
        }
        const employeesFromDepartment = await employeeService.getAllEmployeesFromDepartment(department);
        if (employeesFromDepartment){
             res.status(200).json(successResponse(
                employeesFromDepartment,
                "Employees retrieved successfully."
             ));
        }
    }
    catch (error){
        res.status(500).json(errorResponse(
            null,
            "Failed to retrieve employees."
        ));
    }
};