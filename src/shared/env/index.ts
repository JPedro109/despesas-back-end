import 'dotenv/config';

export const APP_URL = process.env.APP_URL;
export const JWT_KEY = process.env.JWT_KEY;
export const EMAIL_PROVIDER_EMAIL = process.env.EMAIL_PROVIDER_EMAIL;
export const PASSWORD_PROVIDER_EMAIL = process.env.PASSWORD_PROVIDER_EMAIL;
export const HOST_PROVIDER_EMAIL = process.env.HOST_PROVIDER_EMAIL;
export const PORT_PROVIDER_EMAIL = parseInt(process.env.PORT_PROVIDER_EMAIL);
export const DATABASE_URL = process.env.DATABASE_URL;
export const DATABASE_NOSQL_URL = process.env.DATABASE_NOSQL_URL;
export const PORT = process.env.PORT;
export const ENVIRONMENT = process.env.ENVIRONMENT;
