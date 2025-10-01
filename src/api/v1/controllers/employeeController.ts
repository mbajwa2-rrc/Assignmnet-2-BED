import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

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
            res.status(400).json({ message: "Missing field."});
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
        res.status(201).json({ 
            message: "Employee created successfully.", 
            data: newEmployee
        });
    }
    catch (error){
        res.status(500).json({ message: "Failed to create employee."});
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
        res.status(200).json({
            message: "Retrieved all employees successfully.",
            data: employees
        });
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve employees."});
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
            res.status(200).json({
                message: "Employee retrieved successfully.",
                data: employee
            });
        }
        else{
            res.status(400).json({message: "Employee not found."});
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve employee."});
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
        const updatedData = req.body;
        const updatedEmployee = 
            await employeeService.updateEmployee(Number(id), updatedData);
        if (updatedEmployee){
            res.status(200).json({
                message: "Employee updated successfully.", 
                data: updatedEmployee
            });
        }
        else{
            res.status(400).json({message: "Employee not found."});
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to update employee."});
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
            res.status(200).json({message: "Employee deleted successfully."});
        }
        else{
            res.status(400).json({message: "Employee not found"});
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to delete employee."});
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
            res.status(400).json({message: "Branch not found."});
            return;
        }
        const employeesFromBranch = await employeeService.getAllEmployeesFromBranch(Number(branchId));
        if (employeesFromBranch){
             res.status(200).json({
                message: "Employees retrieved successfully.",
                data: employeesFromBranch
             });
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve employees."});
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
            res.status(400).json({message: "Department not found."});
            return;
        }
        const employeesFromDepartment = await employeeService.getAllEmployeesFromDepartment(department);
        if (employeesFromDepartment){
             res.status(200).json({
                message: "Employees retrieved successfully.",
                data: employeesFromDepartment
             });
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve employees."});
    }
};