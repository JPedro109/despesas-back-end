import { NotFoundError, UnauthorizedError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ userId, password }: DTO) {

		const userPassword = await this.repository.getPasswordById(userId);

		if(!userPassword) throw new NotFoundError("Esse usuário que você quer excluir não existe");

		const comparePassword = toolkit.password.comparePasswordEncrypt(password, userPassword);

		if (!comparePassword) throw new UnauthorizedError("Senha incorreta");

		toolkit.cache.del(`username-${userId}`);

		await this.repository.destroy(userId);

		return userId;
	}
}