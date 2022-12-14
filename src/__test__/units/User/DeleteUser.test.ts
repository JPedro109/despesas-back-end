import { setup } from "../setup";
import { Rules as DeleteUser } from "../../../core/useCases/User/DeleteUser/Rules";
import { NotFoundError, UnauthorizedError } from "../../../utils/error";
import { userRepositoryInMemory } from "../Mock";

describe("Unit Test - Delete User", () => {

	setup();

	test("Should not delete user, because he is not exists", async () => {
		const deleteUserRules = new DeleteUser(userRepositoryInMemory);

		const user = {
			userId: "5",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(NotFoundError);
		});
	});

	test("Should not delete user, because the password is incorrect", async () => {
		const deleteUserRules = new DeleteUser(userRepositoryInMemory);

		const user = {
			userId: "1",
			password: "Password123456",
			passwordConfirm: "Password123456",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});

	test("Should delete user", async () => {

		const deleteUserRules = new DeleteUser(userRepositoryInMemory);

		const user = {
			userId: "1",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};
		const response = await deleteUserRules.execute(user);

		expect(response).toBe("1");
	});
});