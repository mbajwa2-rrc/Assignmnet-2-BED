import { Employee } from "../models/employeeModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EMPLOYEES_COLLECTION = "employees";

/**
 * Retrieves all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const employees = await firestoreRepository.getAllDocuments(EMPLOYEES_COLLECTION);
    return employees.map((doc: any) => ({
      id: doc.id,
      ...doc,
    })) as Employee[];
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get employees: ${errorMessage}`);
  }
};

/**
 * Retrieves employee by ID
 */
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  try {
    const doc = await firestoreRepository.getDocumentById(EMPLOYEES_COLLECTION, id);
    return doc ? ({ id, ...doc } as Employee) : null;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get employee ${id}: ${errorMessage}`);
  }
};

/**
 * Creates a new employee
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
  try {
    const id = await firestoreRepository.addDocument(EMPLOYEES_COLLECTION, employeeData);
    return { id, ...employeeData } as Employee;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create employee: ${errorMessage}`);
  }
};

/**
 * Updates an existing employee
 */
export const updateEmployee = async (
  id: string,
  employeeData: Partial<Employee>
): Promise<Employee | null> => {
  try {
    const existing = await firestoreRepository.getDocumentById(EMPLOYEES_COLLECTION, id);
    if (!existing) return null;

    await firestoreRepository.updateDocument(EMPLOYEES_COLLECTION, id, employeeData);
    return { id, ...employeeData } as Employee;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update employee ${id}: ${errorMessage}`);
  }
};

/**
 * Deletes an employee
 */
export const deleteEmployee = async (id: string): Promise<boolean | null> => {
  try {
    const existing = await firestoreRepository.getDocumentById(EMPLOYEES_COLLECTION, id);
    if (!existing) return null;

    await firestoreRepository.deleteDocument(EMPLOYEES_COLLECTION, id);
    return true;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete employee ${id}: ${errorMessage}`);
  }
};

/**
 * Retrieves all employees from a specific branch
 */
export const getAllEmployeesFromBranch = async (branchId: string): Promise<Employee[]> => {
  try {
    const employees = await firestoreRepository.getAllDocuments(EMPLOYEES_COLLECTION);
    return employees.filter((e: any) => e.branchId === branchId) as Employee[];
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get employees from branch ${branchId}: ${errorMessage}`);
  }
};

/**
 * Retrieves all employees from a department
 */
export const getAllEmployeesFromDepartment = async (department: string): Promise<Employee[]> => {
  try {
    const employees = await firestoreRepository.getAllDocuments(EMPLOYEES_COLLECTION);
    return employees.filter((e: any) => e.department === department) as Employee[];
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to get employees from department ${department}: ${errorMessage}`);
  }
};
