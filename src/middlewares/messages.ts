// ========== Cars Middleware
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction } from 'express';
import {
  check,
  param,
  validationResult,
} from 'express-validator';
import { response } from '../helpers';

export const checkSendMessageForm = [
  check('roomId', "The room id can't be empty").notEmpty(),
  check('roomId', 'The room id must be a string').isString(),
  check('message', "The message can't be empty").notEmpty(),
  check('message', 'The message must be a string').isString(),

  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, 400, false, errors.array()[0].msg);
    }

    return next();
  },
];

export const checkGetAllMessage = [
  param('roomId', 'The page must be a string').isString(),

  (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response(req, res, 400, false, errors.array()[0].msg);
    }

    return next();
  },
];
