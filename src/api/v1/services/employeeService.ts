import { Employee } from "../models/employeeModel";
import * as firestoreRepository from "../repositories/firestoreRespository";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";

const EMPLOYEES_COLLECTION = "employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const snapshot = await firestoreRepository.getDocuments(EMPLOYEES_COLLECTION);
        const employees: Employee[] = snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            id: Number(doc.id),
            ...(doc.data() as Omit<Employee, "id">),
        }));
        return employees;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get employees: ${errorMessage}`);
    }
};

export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc) return null;
        return { id, ...(doc.data() as Omit<Employee, "id">) };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get employee ${id}: ${errorMessage}`);
    }
};

export const createEmployee = async (
    employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    try {
        const id = Date.now();
        await firestoreRepository.createDocument(
            EMPLOYEES_COLLECTION,
            employeeData,
            id.toString()
        );
        return { id: Number(id), ...employeeData };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create employee: ${errorMessage}`);
    }
};

export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employee | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc) return null;

        await firestoreRepository.updateDocument(
            EMPLOYEES_COLLECTION,
            id.toString(),
            employeeData
        );
        return { id, ...(employeeData as Omit<Employee, "id">) };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update employee ${id}: ${errorMessage}`);
    }
};

export const deleteEmployee = async (id: number): Promise<boolean | null> => {
    try {
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc) return null;

        await firestoreRepository.deleteDocument(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        return true;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete employee ${id}: ${errorMessage}`);
    }
};

export const getAllEmployeesFromBranch = async (branchId: number): Promise<Employee[]> => {
    try {
        const snapshot = await firestoreRepository.getDocuments(EMPLOYEES_COLLECTION);
        const employeesFromBranch: Employee[] = [];
        for (const doc of snapshot.docs) {
            const employee = {
                id: Number(doc.id),
                ...(doc.data() as Omit<Employee, "id">),
            };
            if (employee.branchId === branchId) {
                employeesFromBranch.push(employee);
            }
        }
        return employeesFromBranch;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get employees from branch ${branchId}: ${errorMessage}`
        );
    }
};

export const getAllEmployeesFromDepartment = async (
    department: string
): Promise<Employee[]> => {
    try {
        const snapshot = await firestoreRepository.getDocuments(EMPLOYEES_COLLECTION);
        const employeesFromDepartment: Employee[] = [];
        for (const doc of snapshot.docs) {
            const employee = {
                id: Number(doc.id),
                ...(doc.data() as Omit<Employee, "id">),
            };
            if (employee.department === department) {
                employeesFromDepartment.push(employee);
            }
        }
        return employeesFromDepartment;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get employees from department ${department}: ${errorMessage}`
        );
    }
};
