import {Employee, employees} from "../../../data/employees"

/**
 * Retrieves all employees
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
};

/**
 * Retrieves employee by ID
 * @returns The employee that was retrieved or undefined if not found
 */
export const getEmployeeById = async (id: number): Promise<Employee | undefined> => {
    for (const employee of employees){
        if (employee.id === id){
            return structuredClone(employee);
        }
    }
    return undefined;
};

/**
 * Creates a new employee
 * @param employeeData - Only the fields needed to create an employee
 * @returns The created employee
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    const newEmployee: Employee = {
        id: Date.now(),
        name: employeeData.name,
        position: employeeData.position,
        department: employeeData.department,
        email: employeeData.email,
        phone: employeeData.phone,
        branchId: employeeData.branchId
    }
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * Updates an existing employee
 * @param id - The ID of the employee to update
 * @param employeeData - Only fields that can be updated
 * @returns The updated employee or undefined if not found
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employee | undefined> => {
    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1){
        return undefined;
    }

    employees[index] = {
        ...employees[index],
        ...employeeData,
    };

    return structuredClone(employees[index]);
};

/**
 * Deletes an employee
 * @param id - The ID of the employee to delete
 * @returns The confirmation if the employee was deleted or undefined if not found
 */
export const deleteEmployee = async (id: number
): Promise<string | undefined> => {
    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1){
        return undefined;
    }

    employees.splice(index, 1);
    return "Employee deleted successfully.";
};

/**
 * Retrieves all employees from a branch
 * @param branchId - The specified branch
 * @returns An array of all the employees from that branch
 */
export const getAllEmployeesFromBranch = async (branchId: number
): Promise<Employee[]> => {
    const employeesFromBranch: Employee[] = [];

    for (const employee of employees){
        if (employee.branchId === branchId){
            employeesFromBranch.push(structuredClone(employee));
        }
    }

    return employeesFromBranch;
};

/**
 * Retrieves all employees from a department
 * @param department - The specified department
 * @returns An array of all the employees from that department
 */
export const getAllEmployeesFromDepartment = async (department: string
): Promise<Employee[]> => {
    const employeesFromDepartment: Employee[] = [];

    for (const employee of employees){
        if (employee.department === department){
            employeesFromDepartment.push(structuredClone(employee));
        }
    }

    return employeesFromDepartment;
};