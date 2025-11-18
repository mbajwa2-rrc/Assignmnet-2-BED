import { Employee } from "../models/employeeModel";
import firestoreRepo from "../repositories/firestoreRepository";

const EMPLOYEES_COLLECTION = "employees";

/**
 * Retrieves all employees
 * @returns Array of all employees
 * @throws {Error} - If an error occurs during retrieval of employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(EMPLOYEES_COLLECTION);
        const employees: Employee[] = snapshot.docs.map(doc => ({
            id: Number(doc.id), 
            ...(doc.data() as Omit<Employee, "id">)
        }));
        return employees;
    }
    catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get employees: ${errorMessage}`
        );
    }
};

/**
 * Retrieves employee by ID
 * @param id - The id of the employee to retrieve
 * @returns The employee that was retrieved or null if not found
 * @throws {Error} - If an error occurs during the employee retrieval
 */
export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }
        return {id, ...(doc.data() as Omit<Employee, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get employee ${id}: ${errorMessage}`);
    }
};

/**
 * Creates a new employee
 * @param employeeData - Only the fields needed to create an employee
 * @returns The created employee
 * @throws {Error} - If an error occurs during the employee creation
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    try{
        const id = Date.now();
        await firestoreRepository.createDocument(
            EMPLOYEES_COLLECTION,
            employeeData,
            id.toString()
        );
        return {id: Number(id), ...employeeData};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create employee: ${errorMessage}`);
    }
};

/**
 * Updates an existing employee
 * @param id - The ID of the employee to update
 * @param employeeData - Only fields that can be updated
 * @returns The updated employee or null if not found
 * @throws {Error} - If an error occurs during employee update
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employee | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.updateDocument(
            EMPLOYEES_COLLECTION,
            id.toString(),
            employeeData
        );
        return {id, ...(employeeData as Omit<Employee, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update employee ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes an employee
 * @param id - The ID of the employee to delete
 * @returns True if the employee was deleted successfully or null if not found
 * @throws {Error} - If an error occurs during employee deletion
 */
export const deleteEmployee = async (id: number
): Promise<boolean | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.deleteDocument(
            EMPLOYEES_COLLECTION,
            id.toString(),
        );
        return true;
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete employee ${id}: ${errorMessage}`);
    }
};

/**
 * Retrieves all employees from a branch
 * @param branchId - The specified branch
 * @returns An array of all the employees from that branch
 * @throws {Error} - If an error occurs during employee retrieval
 */
export const getAllEmployeesFromBranch = async (branchId: number
): Promise<Employee[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(EMPLOYEES_COLLECTION);
        const employeesFromBranch: Employee[] = []
        for (const doc of snapshot.docs){
            const employee = {
                id: Number(doc.id), 
                ...(doc.data() as Omit<Employee, "id">)};
                if (employee.branchId === branchId){
                    employeesFromBranch.push(employee);
                }
        }
        return employeesFromBranch;
    }
    catch (error: unknown){
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get employees from branch ${branchId}: ${errorMessage}`
        );
    }
};

/**
 * Retrieves all employees from a department
 * @param department - The specified department
 * @returns An array of all the employees from that department
 * @throws {Error} - If an error occurs during employee retrieval
 */
export const getAllEmployeesFromDepartment = async (department: string
): Promise<Employee[]> => {try{
        const snapshot = await firestoreRepository.getDocuments(EMPLOYEES_COLLECTION);
        const employeesFromDepartment: Employee[] = []
        for (const doc of snapshot.docs){
            const employee = {
                id: Number(doc.id), 
                ...(doc.data() as Omit<Employee, "id">)};
                if (employee.department === department){
                    employeesFromDepartment.push(employee);
                }
        }
        return employeesFromDepartment;
    }
    catch (error: unknown){
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get employees from department ${department}: ${errorMessage}`
        );
    }
};