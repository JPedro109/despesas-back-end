import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Create User", () => {

	setup();

	test("Should not create the user, because the email field is empty", async () => {
		const user = {
			email: "",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};

		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create the user, because the password field is empty", async() => {
		const user = {
			email: "email@test.com",
			password: "",
			passwordConfirm: "Password1234",
		};

		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create the user, because the password confirm field is empty", async () => {
		const user = {
			email: "email@test.com",
			password: "Password1234",
			passwordConfirm: "",
		};

		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create the user, because all fields is empty", async () => {
		const user = {
			email: "",
			password: "",
			passwordConfirm: "",
		};

		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create the user, because the email is invalid", async () => {
    
		const user = {
			email: "emailVtest.com",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};

		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not create the user, because the email already was registered", async () => {
    
		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};

		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not create the user, because the passwords is not match", async () => {
		const user = {
			email: "email@test.com",
			password: "Password1234",
			passwordConfirm: "Password12345",
		};
		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should create the user", async () => {
	
		const user = {
			email: "email@test.com",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};
		const response = await request(app)
			.post("/user/create")
			.send(user);

		expect(response.statusCode).toBe(201);
		expect(response.body.response).toBe(user.email);
	});
});