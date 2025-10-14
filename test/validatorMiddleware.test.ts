import { Request, Response, NextFunction } from "express";
import { validateCreateEmployee, validateCreateBranch } from "src/api/v1/middleware/validatorMiddleware";

describe("validateCreateEmployee Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("should pass for valid body input", () => {
        //Arrange
        mockReq.body = {
            name: "Test Name",
            position: "Test Position",
            department: "Loans",
            email: "test.name@email.com",
            phone: "204-123-4567",
            branchId: 1
        };

        //Act
        validateCreateEmployee(mockReq as Request, mockRes as Response, mockNext);

        //Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should fail for invalid body input", () => {
        //Arrange
        mockReq.body = {
            name: "",
            position: "",
            department: "",
            email: "test.name",
            phone: "204-abc",
            branchId: "abc"
        };

        //Act
        validateCreateEmployee(mockReq as Request, mockRes as Response, mockNext);

        //Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation failed"),
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});


describe("validateCreateBranch Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("should pass for valid body input", () => {
        //Arrange
        mockReq.body = {
            name: "Test Name",
            address: "123 Test Street",
            phone: "204-123-4567",
        };

        //Act
        validateCreateBranch(mockReq as Request, mockRes as Response, mockNext);

        //Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.json).not.toHaveBeenCalled();
    });

    it("should fail for invalid body input", () => {
        //Arrange
        mockReq.body = {
            name: "",
            address: "",
            phone: "204-abc",
        };

        //Act
        validateCreateBranch(mockReq as Request, mockRes as Response, mockNext);

        //Assert
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Validation failed"),
        });
        expect(mockNext).not.toHaveBeenCalled();
    });
});