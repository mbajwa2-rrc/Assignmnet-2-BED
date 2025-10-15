import request from "supertest";
import express from "express";
import routes from "../src/api/v1/routes/branchRoute";
import * as controller from "../src/api/v1/controllers/branchController";

jest.mock("../src/api/v1/controllers/branchController");

const app = express();
app.use(express.json());
app.use("/api/v1", routes);

describe.skip("Branch API Endpoints", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("POST /api/v1/branches", () => {
		it("should call create controller", async () => {
            // Arrange
            const mockBranch = {
                id: 11, 
                name: "Test Branch", 
                address: "123 Test Street, Vancouver, BC, V6Z 2C7", 
                phone: "604-123-4567"
            };

			//Act
            await request(app).post("/api/v1/branches").send(mockBranch);

            //Assert
			expect(controller.createBranch).toHaveBeenCalled();
		});

        it("should return 400 when required fields are missing", async () => {
            //Arrange missing parameters

            //Act
            const response = await request(app).post("/api/v1/branches").send({});

            //Assert
            expect(response.status).toBe(400);
        });
	});

    describe("GET /api/v1/branches", () => {
		it("should call getAll controller", async () => {
            //Act
			await request(app).get("/api/v1/branches");

            //Assert
			expect(controller.getAllBranches).toHaveBeenCalled();
		});
	});

    describe("GET /api/v1/branches/:id", () => {
		it("should call getBranchById controller", async () => {
            // Arrange
            const branchId = 1;

            //Act
			await request(app).get(`/api/v1/branches/${branchId}`);

            //Assert
			expect(controller.getBranchById).toHaveBeenCalled();
		});

        it("should return 400 when ID parameter is invalid", async () => {
            //Arrange invalid ID parameter
            //Act
            const response = await request(app).get("/api/v1/branches/100");

            //Assert
            expect(response.status).toBe(400);
        });
	});

	describe("PUT /api/v1/branches/:id", () => {
		it("should call update controller", async () => {
            // Arrange
            const branchId = 1;

            //Act
			await request(app).put(`/api/v1/branches/${branchId}`).send({ 
                id: 1, 
                name: "Update Branch", 
                address: "321 Test Street, Winnipeg, MB, R3G 2C7", 
                phone: "204-123-4567"
			});

            //Assert
			expect(controller.updateBranch).toHaveBeenCalled();
		});

        it("should return 400 when update has missing required fields", async () => {
            //Arrange missing required fields for update
            const branchId = 1;

            //Act
            const response = await request(app).put(`/api/v1/branches/${branchId}`).send({});

            //Assert
            expect(response.status).toBe(400);
        });
	});

	describe("DELETE /api/v1/branches/:id", () => {
		it("should call delete controller", async () => {
            // Arrange
            const branchId = 1;

            //Act
			await request(app).delete(`/api/v1/branches/${branchId}`);

            //Assert
			expect(controller.deleteBranch).toHaveBeenCalled();
		});

        it("should return 400 when ID parameter is invalid", async () => {
            //Arrange invalid ID parameter
            //Act
            const response = await request(app).delete("/api/v1/branches/100");

            //Assert
            expect(response.status).toBe(400);
        });
	});
});