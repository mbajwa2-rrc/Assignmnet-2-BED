import request from "supertest";
import express from "express";
import routes from "../src/api/v1/routes/employeeRoute";

const app = express();
app.use(express.json());
app.use("/api/v1", routes);

describe("Employee API Endpoints", () => {
	describe("GET /api/v1/employees", () => {
		it("should return 200 and an array of employees", async () => {
			const res = await request(app).get("/api/v1/employees");
			expect(res.status).toBe(200);
			expect(Array.isArray(res.body)).toBe(true);
		});
	});

	describe("GET /api/v1/employees/:id", () => {
		it("should return 200 for a valid employee ID", async () => {
			const res = await request(app).get("/api/v1/employees/1");
			expect(res.status).toBe(200);
		});

		it("should return 404 for an invalid employee ID", async () => {
			const res = await request(app).get("/api/v1/employees/9999");
			expect(res.status).toBe(404);
		});
	});

	describe("POST /api/v1/employees", () => {
		it("should create a new employee and return 201", async () => {
			const mockEmployee = {
				id: 101,
				name: "Test Employee",
				position: "Manager",
				department: "Management",
				email: "test@pixell-river.com",
				phone: "204-123-4567",
				branchId: 1,
			};

			const res = await request(app).post("/api/v1/employees").send(mockEmployee);
			expect(res.status).toBe(201);
			expect(res.body).toMatchObject(mockEmployee);
		});

		it("should return 400 if required fields are missing", async () => {
			const res = await request(app).post("/api/v1/employees").send({});
			expect(res.status).toBe(400);
		});
	});
});
