import { Employee } from "../models/employeeModel";
import firestoreRepo from "../repositories/firestoreRepository";

const EMPLOYEES_COLLECTION = "employees";

// 📌 Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot = await firestoreRepo.getDocuments(EMPLOYEES_COLLECTION);
  return snapshot.docs.map((doc: any) => ({
    id: Number(doc.id),
    ...(doc.data() as Omit<Employee, "id">),
  }));
};

// 📌 Create employee
export const createEmployee = async (
  employee: Omit<Employee, "id">
): Promise<Employee> => {
  const id = Date.now().toString();
  await firestoreRepo.createDocument(EMPLOYEES_COLLECTION, employee, id);
  return { id: Number(id), ...employee };
};

// 📌 Get employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const doc = await firestoreRepo.getDocumentById(EMPLOYEES_COLLECTION, id);
  if (!doc.exists) return null;
  return { id: Number(id), ...(doc.data() as Omit<Employee, "id">) };
};

// 📌 Update employee
export const updateEmployee = async (
  id: string,
  data: Partial<Employee>
): Promise<boolean> => {
  await firestoreRepo.updateDocument(EMPLOYEES_COLLECTION, id, data);
  return true;
};

// 📌 Delete employee
export const deleteEmployee = async (id: string): Promise<boolean> => {
  await firestoreRepo.deleteDocument(EMPLOYEES_COLLECTION, id);
  return true;
};

// 📌 Get employees by branch
export const getAllEmployeesFromBranch = async (
  branchId: string
): Promise<Employee[]> => {
  const snapshot = await firestoreRepo.queryDocuments(
    EMPLOYEES_COLLECTION,
    "branchId",
    "==",
    branchId
  );
  return snapshot.docs.map((doc: any) => ({
    id: Number(doc.id),
    ...(doc.data() as Omit<Employee, "id">),
  }));
};

// 📌 Get employees by department
export const getAllEmployeesFromDepartment = async (
  department: string
): Promise<Employee[]> => {
  const snapshot = await firestoreRepo.queryDocuments(
    EMPLOYEES_COLLECTION,
    "department",
    "==",
    department
  );
  return snapshot.docs.map((doc: any) => ({
    id: Number(doc.id),
    ...(doc.data() as Omit<Employee, "id">),
  }));
};
