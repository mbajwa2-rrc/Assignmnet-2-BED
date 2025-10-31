import * as serviceModule from '../src/api/v1/services/branchService';
import * as repositoryModule from '../src/api/v1/repositories/firestoreRespository';
// Mock the repository module
jest.mock('../src/api/v1/repositories/firestoreRepository');

describe('Branch Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

    describe('getAllBranches', () => {
        it('should retrieve all branches successfully', async () => {
            // Arrange
            const mockData = [
                {id: 1, name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022"},
                {id: 2, name: "Edmonton Branch", address: "7250 82 Ave NW, Edmonton, AB, T6B 0G4", phone: "780-468-6800"},
                {id: 3, name: "Arborg Branch", address: "317-A Fisher Road, Arborg, MB, R0C 0A0", phone: "204-555-3461"}
            ];
            const mockRepositoryResponse = {
                docs: mockData.map(branch => ({
                    id: branch.id.toString(),
                    data: () => ({
                        name: branch.name,
                        address: branch.address,
                        phone: branch.phone,
                    })
                }))
            };
            (repositoryModule.getDocuments as jest.Mock).mockResolvedValue(mockRepositoryResponse);

            // Act
            const result = await serviceModule.getAllBranches();

            // Assert
            expect(repositoryModule.getDocuments).toHaveBeenCalledWith("branches");
            expect(result).toEqual(mockData);
        });
    });

    describe('getBranchById', () => {
        it('should retrieve the branch by ID successfully', async () => {
            // Arrange
            const mockBranch = {
                id: "1",
                data: () => ({
                    name: "Vancouver Branch", 
                    address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", 
                    phone: "604-456-0022"
                })
            };
            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockBranch);

            // Act
            const result = await serviceModule.getBranchById(1);

            // Assert
            expect(repositoryModule.getDocumentById).toHaveBeenCalledWith("branches", "1");
            expect(result).toEqual({
                id: 1, 
                name: "Vancouver Branch", 
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", 
                phone: "604-456-0022"
            });
        });
    });

    describe('createBranch', () => {
        it('should create a branch successfully', async () => {
            // Arrange
            const newBranch = {
                name: "New Branch", 
                address: "New Address",
                phone: "204-123-4567"
            };
            (repositoryModule.createDocument as jest.Mock).mockResolvedValue("1");

            // Act
            const result = await serviceModule.createBranch(newBranch);

            // Assert
            expect(repositoryModule.createDocument).toHaveBeenCalledWith("branches", newBranch);
            expect(result).toEqual({
                id: 1,
                ...newBranch
            });
        });
    });

    describe('updateBranch', () => {
        it('should update a branch successfully', async () => {
            // Arrange
            const updatedData = {
                name: "Updated Name", 
                address: "Updated Address", 
                phone: "204-123-4567", 
            };
            const updatedBranch = {
                id: 1,
                ...updatedData
            };
            (repositoryModule.updateDocument as jest.Mock).mockResolvedValue(updatedBranch);

            // Act
            const result = await serviceModule.updateBranch(1, updatedData);

            // Assert
            expect(repositoryModule.updateDocument).toHaveBeenCalledWith("branches", "1", updatedData);
            expect(result).toEqual(updatedBranch);
        });
    });

    describe('deleteBranch', () => {
        it('should delete a branch successfully', async () => {
            // Arrange
            const mockBranch = {
                id: "2",
                data: () => ({
                    name: "Edmonton Branch", 
                    address: "7250 82 Ave NW, Edmonton, AB, T6B 0G4", 
                    phone: "780-468-6800"
                })
            };
            (repositoryModule.getDocumentById as jest.Mock).mockResolvedValue(mockBranch);
            (repositoryModule.deleteDocument as jest.Mock).mockResolvedValue(null);

            // Act
            const result = await serviceModule.deleteBranch(2);

            // Assert
            expect(repositoryModule.deleteDocument).toHaveBeenCalledWith("branches", "2");
            expect(result).toBe(true);
        });
    });
});