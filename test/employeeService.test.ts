import * as serviceModule from '../src/api/v1/services/employeeService';
import * as repositoryModule from '../src/api/v1/repositories/firestoreRepository';

// Mock the repository module
jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Employee Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

    describe('getAllEmployees', () => {
        it('should retrieve all employees successfully', async () => {
            // Arrange
            const mockData = [
                {id: 1, name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchId: 1},
                {id: 2, name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchId: 2},
                {id: 3, name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchId: 3}
            ];
            const mockRepositoryResponse = {
                docs: mockData.map(employee => ({
                    id: employee.id.toString(),
                    data: () => ({
                        name: employee.name,
                        position: employee.position,
                        department: employee.department,
                        email: employee.email,
                        phone: employee.phone,
                        branchId: employee.branchId
                    })
                }))
            };
            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result = await serviceModule.getAllEmployees();

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith("employees");
            expect(result).toEqual(mockData);
        });
    });

    describe('getEmployeeById', () => {
        it('should retrieve employee by ID successfully', async () => {
            // Arrange
            const mockEmployee = {
                id: "1",
                data: () => ({
                    name: "Alice Johnson", 
                    position: "Branch Manager", 
                    department: "Management", 
                    email: "alice.johnson@pixell-river.com", 
                    phone: "604-555-0148", 
                    branchId: 1
                })
            };
            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockEmployee);

            // Act
            const result = await serviceModule.getEmployeeById(1);

            // Assert
            expect(repositoryModule.getDocumentById).toHaveBeenCalledWith("employees", "1");
            expect(result).toEqual({
                id: 1, 
                name: "Alice Johnson", 
                position: "Branch Manager", 
                department: "Management", 
                email: "alice.johnson@pixell-river.com", 
                phone: "604-555-0148", 
                branchId: 1
            });
        });
    });

    describe('createEmployee', () => {
        it('should create an employee successfully', async () => {
            // Arrange
            const newEmployee = {
                name: "New Employee", 
                position: "New Position", 
                department: "New Department", 
                email: "new.employee@pixell-river.com", 
                phone: "204-123-4567", 
                branchId: 1
            };
            (repositoryModule.createDocument as jest.Mock).mockResolvedValue("1");

            // Act
            const result = await serviceModule.createEmployee(newEmployee);

            // Assert
            expect(repositoryModule.createDocument).toHaveBeenCalledWith("employees", newEmployee);
            expect(result).toEqual({
                id: 1,
                ...newEmployee
            });
        });
    });

    describe('updateEmployee', () => {
        it('should update an employee successfully', async () => {
            // Arrange
            const updatedData = {
                name: "Updated Name", 
                position: "Updated Position", 
                department: "Updated Department", 
                email: "updated.name@pixell-river.com", 
                phone: "204-123-4567", 
                branchId: 2
            };
            const updatedEmployee = {
                id: 1,
                ...updatedData
            };
            (repositoryModule.updateDocument as jest.Mock).mockResolvedValue(updatedEmployee);

            // Act
            const result = await serviceModule.updateEmployee(1, updatedData);

            // Assert
            expect(repositoryModule.updateDocument).toHaveBeenCalledWith("employees", "1", updatedData);
            expect(result).toEqual(updatedEmployee);
        });
    });

    describe('deleteEmployee', () => {
        it('should delete an employee successfully', async () => {
            // Arrange
            const mockEmployee = {
                id: "2",
                data: () => ({
                    name: "Amandeep Singh", 
                    position: "Customer Service Representative", 
                    department: "Customer Service", 
                    email: "amandeep.singh@pixell-river.com", 
                    phone: "780-555-0172", 
                    branchId: 2
                })
            };
            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockEmployee);
            (repositoryModule.deleteDocument as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await serviceModule.deleteEmployee(2);

            // Assert
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith("employees", "2");
            expect(result).toBe(true);
        });
    });

    describe('getAllEmployeesFromBranch', () => {
        it('should retrieve all employees from a branch successfully', async () => {
            // Arrange
            const mockData = [
                {id: "1", data: () => ({name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchId: 1})},
                {id: "2", data: () => ({name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchId: 2})},
                {id: "3", data: () => ({name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchId: 3})}
            ];
            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue({docs: mockData});

            // Act
            const result = await serviceModule.getAllEmployeesFromBranch(1);

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith("employees");
            expect(result).toEqual([{
                id: 1, 
                name: "Alice Johnson", 
                position: "Branch Manager", 
                department: "Management", 
                email: "alice.johnson@pixell-river.com", 
                phone: "604-555-0148", 
                branchId: 1
            }]);
        });
    });

    describe('getAllEmployeesFromDepartment', () => {
        it('should retrieve all employees from a department successfully', async () => {
            // Arrange
            const mockData = [
                {id: "1", data: () => ({name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchId: 1})},
                {id: "2", data: () => ({name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchId: 2})},
                {id: "3", data: () => ({name: "Maria Garcia", position: "Loan Officer", department: "Loans", email: "maria.garcia@pixell-river.com", phone: "204-555-0193", branchId: 3})}
            ];
            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue({docs: mockData});

            // Act
            const result = await serviceModule.getAllEmployeesFromDepartment("Loans");

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith("employees");
            expect(result).toEqual([{
                id: 3, 
                name: "Maria Garcia", 
                position: "Loan Officer", 
                department: "Loans", 
                email: "maria.garcia@pixell-river.com", 
                phone: "204-555-0193", 
                branchId: 3
            }]);
        });
    });
});