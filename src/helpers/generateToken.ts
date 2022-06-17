// ========== Generate Token
// import all modules
import jwt from 'jsonwebtoken';

export const generateToken = (
  data: any,
  secretKey: string,
  expiresIn: string,
): string => jwt.sign(data, secretKey, { expiresIn });
