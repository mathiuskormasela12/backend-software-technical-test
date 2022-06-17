// ========== App Config
// import all modules
import dotenv from 'dotenv';
import { IAppConfig } from '../interface';

dotenv.config();

const {
  PORT,
  APP_URL,
  API_URL,
  DB_URI,
  SECRET_KEY,
  JWT_ACCESS_TOKEN_SECRET_KEY,
  JWT_REFRESH_TOKEN_SECRET_KEY,
  JWT_ACCESS_TOKEN_SECRET_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN,
} = process.env;

export const appConfig: IAppConfig = {
  port: Number(PORT),
  appUrl: String(APP_URL),
  apiUrl: String(API_URL),
  dbUri: String(DB_URI),
  secretKey: String(SECRET_KEY),
  jwtAcessTokenSecretKey: String(JWT_ACCESS_TOKEN_SECRET_KEY),
  jwtRefreshTokenSecretKey: String(JWT_REFRESH_TOKEN_SECRET_KEY),
  jwtAccessTokenExpiresIn: String(JWT_ACCESS_TOKEN_SECRET_EXPIRES_IN),
  jwtRefreshTokenExpiresIn: String(JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN),
  whileList: [
    'http://localhost:3000',
  ],
};
