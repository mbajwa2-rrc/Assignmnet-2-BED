import { Employee } from "../models/employeeModel";   
import firestoreRepo from "../repositories/firestoreRepository";

const EMPLOYEES_COLLECTION = "employees";

/**
 * Retrieves all employees
 * @returns Array of all employees
 * @throws {Error} - If an error occurs during retrieval of employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const snapshot = await firestoreRepo.getDocuments(EMPLOYEES_COLLECTION);

    const employees: Employee[] = snapshot.docs.map(doc => ({
      id: Number(doc.id),
      ...(doc.data() as Omit<Employee, "id">)
    }));

    return employees;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(errorMessage);
  }
};
