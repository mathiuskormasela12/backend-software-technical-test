// ========== Auth Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import jwt from 'jsonwebtoken';
import { generateToken, response } from '../helpers';
import UsersModel from '../models/users';
import { appConfig } from '../config';

namespace UsersControllersModule {
	export class UsersControllers {
	  public static async joinRoom(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { username, roomId } = req.body;

	    try {
	      const user = await UsersModel.findOne({ username });

	      if (user && user.alreadyLoggedIn) {
	        return response(req, res, 400, false, 'The username has been used by other people');
	      }

	      if (user) {
	        try {
	          await UsersModel.updateOne({ id: user.id }, { $set: { alreadyLoggedIn: true } });
	          const accessToken: string = generateToken(
	            {
	              id: user.id,
	            },
	            appConfig.jwtAcessTokenSecretKey,
	            appConfig.jwtAccessTokenExpiresIn,
	          );
	          const refreshToken: string = generateToken(
	            {
	              id: user.id,
	            },
	            appConfig.jwtRefreshTokenSecretKey,
	            appConfig.jwtRefreshTokenExpiresIn,
	          );

	          return response(req, res, 200, true, 'You have joined to the room', { accessToken, refreshToken });
	        } catch (err: any) {
	          return response(req, res, 500, false, err.message);
	        }
	      }

	      const data = new UsersModel({
	        username,
	        roomId,
	        alreadyLoggedIn: true,
	      });

	      try {
	        const results = await data.save();
	        const accessToken: string = generateToken(
	          {
	            id: results.id,
	          },
	          appConfig.jwtAcessTokenSecretKey,
	          appConfig.jwtAccessTokenExpiresIn,
	        );
	        const refreshToken: string = generateToken(
	          {
	            id: results.id,
	          },
	          appConfig.jwtRefreshTokenSecretKey,
	          appConfig.jwtRefreshTokenExpiresIn,
	        );

	        return response(req, res, 200, true, 'Your account has been created and you have joined to the room', { accessToken, refreshToken });
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async exitFromRoom(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { id } = req.params;

	    try {
	      const user = await UsersModel.findOne({ id });

	      if (!user) {
	        return response(req, res, 400, false, 'The username was not found');
	      }

	      if (user && !user.alreadyLoggedIn) {
	        return response(req, res, 400, false, 'The username has not been used anymore');
	      }

	      try {
	        await UsersModel.updateOne({ id: user.id }, { $set: { alreadyLoggedIn: false } });

	        return response(req, res, 200, true, 'You are success to exit from room');
	      } catch (err: any) {
	        return response(req, res, 500, false, err.message);
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async generateAccessToken(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { refreshToken } = req.body;

	    try {
	      const decode: any = await jwt.verify(refreshToken, appConfig.jwtRefreshTokenSecretKey);

	      const newAccessToken: string = generateToken(
	        {
	        	id: decode.id,
	        },
	      appConfig.jwtAcessTokenSecretKey,
	      appConfig.jwtAccessTokenExpiresIn,
	      );
	      const newRefreshToken: string = generateToken(
	        {
	        id: decode.id,
	        },
	      appConfig.jwtRefreshTokenSecretKey,
	      appConfig.jwtRefreshTokenExpiresIn,
	      );

	      return response(req, res, 200, true, 'Access token has been created successfully', { accessToken: newAccessToken, refreshToken: newRefreshToken });
	    } catch (err: any) {
	      return response(req, res, 400, false, err.message);
	    }
	  }
	}
}

export default UsersControllersModule;
