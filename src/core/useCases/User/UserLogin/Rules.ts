import { UnauthorizedError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ email, password }: DTO) {
		const emailAlredyExists = await this.repository.findEmailByEmail(email);

		if (!emailAlredyExists) throw new UnauthorizedError("Email/Senha Incorreto(s)");

		const emailIsVerified = await this.repository.findByEmailVerified(email);

		if (!emailIsVerified) throw new UnauthorizedError("Email não verificado");

		const userPassword = await this.repository.getPasswordByEmail(email);

		const passwordIsValid = toolkit.password.comparePasswordEncrypt(password, userPassword);

		if (!passwordIsValid) throw new UnauthorizedError("Email/Senha Incorreto(s)");

		const id = await this.repository.getId(email);

		const accessToken = toolkit.jsonWebToken.createToken({ id, email }, 3600);
		const refreshToken = toolkit.jsonWebToken.createToken({ id, refreshToken: true }, 84600);

		return {
			accessToken,
			refreshToken
		};
	}
}