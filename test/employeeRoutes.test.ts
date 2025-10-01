import request from "supertest";
import express from "express";
import routes from "../src/api/v1/routes/employeeRoute";
import * as controller from "../src/api/v1/controllers/employeeController";

jest.mock("../src/api/v1/controllers/employeeController");

const app = express();
app.use(express.json());
app.use("/api/v1", routes);

describe("Employee API Endpoints", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /api/v1/employees", () => {
		it("should call create controller", async () => {
            // Arrange
            const mockEmployee = {
                id: 36, 
                name: "Test Name", 
                position: "Branch Manager", 
                department: "Management", 
                email: "test.name@pixell-river.com", 
                phone: "204-123-4567", 
                branchId: 1
            };

			//Act
            await request(app).post("/api/v1/employees").send(mockEmployee);

            //Assert
			expect(controller.createEmployee).toHaveBeenCalled();
		});

        it("should return 400 when required fields are missing", async () => {
            //Arrange missing parameters

            //Act
            const response = await request(app).post("/api/v1/employees").send({});

            //Assert
            expect(response.status).toBe(400);
        });
	});

    describe("GET /api/v1/employees", () => {
		it("should call getAll controller", async () => {
            //Act
			await request(app).get("/api/v1/employees");

            //Assert
			expect(controller.getAllEmployees).toHaveBeenCalled();
		});
	});

    describe("GET /api/v1/employees/:id", () => {
		it("should call getEmployeeById controller", async () => {
            // Arrange
            const employeeId = 1;

            //Act
			await request(app).get(`/api/v1/employees/${employeeId}`);

            //Assert
			expect(controller.getEmployeeById).toHaveBeenCalled();
		});

        it("should return 400 when ID parameter is invalid", async () => {
            //Arrange invalid ID parameter
            //Act
            const response = await request(app).get("/api/v1/employees/100");

            //Assert
            expect(response.status).toBe(400);
        });
	});

	describe("PUT /api/v1/employees/:id", () => {
		it("should call update controller", async () => {
            // Arrange
            const employeeId = 1;

            //Act
			await request(app).put(`/api/v1/employees/${employeeId}`).send({ 
                name: "Update Name", 
                position: "Update Position", 
                department: "Management", 
                email: "update.name@pixell-river.com", 
                phone: "204-765-4321", 
                branchId: 2
			});

            //Assert
			expect(controller.updateEmployee).toHaveBeenCalled();
		});

        it("should return 400 when update has missing required fields", async () => {
            //Arrange missing required fields for update
            const employeeId = 1;

            //Act
            const response = await request(app).put(`/api/v1/employees/${employeeId}`).send({});

            //Assert
            expect(response.status).toBe(400);
        });
	});

	describe("DELETE /api/v1/employees/:id", () => {
		it("should call delete controller", async () => {
            // Arrange
            const employeeId = 1;

            //Act
			await request(app).delete(`/api/v1/employees/${employeeId}`);

            //Assert
			expect(controller.deleteEmployee).toHaveBeenCalled();
		});

        it("should return 400 when ID parameter is invalid", async () => {
            //Arrange invalid ID parameter
            //Act
            const response = await request(app).delete("/api/v1/employees/100");

            //Assert
            expect(response.status).toBe(400);
        });
	});

    describe("GET /api/v1/employees/branch/:branchId", () => {
        it("should call getAllEmployeesFromBranch controller", async () => {
            // Arrange
            const branchId = 1;

            //Act
            await request(app).get(`/api/v1/employees/branch/${branchId}`);

            //Assert
            expect(controller.getAllEmployeesFromBranch).toHaveBeenCalled();
        });

        it("should return 400 when Branch ID parameter is missing", async () => {
            //Arrange missing Branch ID parameter

            //Act
            const response = await request(app).get("/api/v1/employees/branch/");

            //Assert
            expect(response.status).toBe(400);
        });
    });

    describe("GET /api/v1/employees/department/:department", () => {
        it("should call getAllEmployeesFromDepartment controller", async () => {
            // Arrange
            const department = "Loans";

            //Act
            await request(app).get(`/api/v1/employees/department/${department}`);

            //Assert
            expect(controller.getAllEmployeesFromDepartment).toHaveBeenCalled();
        });

        it("should return 400 when Department parameter is missing", async () => {
            //Arrange missing department parameter

            //Act
            const response = await request(app).get("/api/v1/employees/department/");

            //Assert
            expect(response.status).toBe(400);
        });
    });
});