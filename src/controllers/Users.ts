// ========== Auth Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import jwt from 'jsonwebtoken';
import { generateToken, response } from '../helpers';
import UsersModel from '../models/users';
import RoomsModel from '../models/rooms';
import ActiveRoomsModel from '../models/activeRooms';
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

	      if (user) {
	        const isRoomExists = await RoomsModel.findOne({ roomId });

	        if (isRoomExists) {
	          const isRoomActiveExists = await ActiveRoomsModel.findOne({ idRoom: isRoomExists.id, uid: user.id });

	          if (isRoomActiveExists) {
	            if (isRoomActiveExists.alreadyLoggedIn) {
	              return response(req, res, 400, false, 'The username has been used in this room');
	            }
	            console.log('update id ini =>', isRoomActiveExists.id);
	            try {
	              await ActiveRoomsModel.findByIdAndUpdate(isRoomActiveExists.id, { $set: { alreadyLoggedIn: true } });
	              const accessToken: string = generateToken(
	                {
	                  id: user.id,
	                  roomId: isRoomExists.id,
	                  roomName: roomId,
	                },
	                appConfig.jwtAcessTokenSecretKey,
	                appConfig.jwtAccessTokenExpiresIn,
	              );
	              const refreshToken: string = generateToken(
	                {
	                  id: user.id,
	                  roomId: isRoomExists.id,
	                  roomName: roomId,
	                },
	                appConfig.jwtRefreshTokenSecretKey,
	                appConfig.jwtRefreshTokenExpiresIn,
	              );

	              return response(req, res, 200, true, 'You have joined to the room', { accessToken, refreshToken, roomId: isRoomExists.id });
	            } catch (err: any) {
	              return response(req, res, 500, false, err.message);
	            }
	          }
	            const roomActiveData = new ActiveRoomsModel({ idRoom: isRoomExists.id, uid: user.id, alreadyLoggedIn: true });
	            try {
	              await roomActiveData.save();
	              const accessToken: string = generateToken(
	                {
	                  id: user.id,
	                roomId: isRoomExists.id,
	                roomName: roomId,
	                },
	                appConfig.jwtAcessTokenSecretKey,
	                appConfig.jwtAccessTokenExpiresIn,
	              );
	              const refreshToken: string = generateToken(
	                {
	                  id: user.id,
	                roomId: isRoomExists.id,
	                roomName: roomId,
	                },
	                appConfig.jwtRefreshTokenSecretKey,
	                appConfig.jwtRefreshTokenExpiresIn,
	              );

	              return response(req, res, 200, true, 'You have joined to the room', { accessToken, refreshToken, roomId: isRoomExists.id });
	            } catch (err: any) {
	              return response(req, res, 500, false, err.message);
	            }
	        } else {
	          const roomData = new RoomsModel({ roomId });
	          try {
	            const results = await roomData.save();
	            const isRoomActiveExists = await ActiveRoomsModel.findOne({ idRoom: results.id, uid: user.id });

	          if (isRoomActiveExists) {
	            if (isRoomActiveExists.alreadyLogggedIn) {
	              return response(req, res, 400, false, 'The username has been used in this room');
	            }
	            const accessToken: string = generateToken(
	                {
	                  id: user.id,
	                  roomId: results.id,
	                  roomName: roomId,
	                },
	                appConfig.jwtAcessTokenSecretKey,
	                appConfig.jwtAccessTokenExpiresIn,
	              );
	              const refreshToken: string = generateToken(
	                {
	                  id: user.id,
	                  roomId: results.id,
	                  roomName: roomId,
	                },
	                appConfig.jwtRefreshTokenSecretKey,
	                appConfig.jwtRefreshTokenExpiresIn,
	              );

	              return response(req, res, 200, true, 'You have joined to the room', { accessToken, refreshToken, roomId: results.id });
	          }
	            const roomActiveData = new ActiveRoomsModel({ idRoom: results.id, uid: user.id, alreadyLoggedIn: true });
	            try {
	              await roomActiveData.save();
	              const accessToken: string = generateToken(
	                {
	                  id: user.id,
	                  roomId: results.id,
	                  roomName: roomId,
	                },
	                appConfig.jwtAcessTokenSecretKey,
	                appConfig.jwtAccessTokenExpiresIn,
	              );
	              const refreshToken: string = generateToken(
	                {
	                  id: user.id,
	                  roomId: results.id,
	                  roomName: roomId,
	                },
	                appConfig.jwtRefreshTokenSecretKey,
	                appConfig.jwtRefreshTokenExpiresIn,
	              );

	              return response(req, res, 200, true, 'You have joined to the room', { accessToken, refreshToken, roomId: results.id });
	            } catch (err: any) {
	              return response(req, res, 500, false, err.message);
	            }
	          } catch (err: any) {
	            return response(req, res, 500, false, err.message);
	          }
	        }
	      } else {
	       const accountData = new UsersModel({ username });

				 try {
	          const userCreated = await accountData.save();
	          try {
	            const isRoomExists = await RoomsModel.findOne({ roomId });

	            if (isRoomExists) {
	              const isRoomActiveExists = await ActiveRoomsModel.findOne({ idRoom: isRoomExists.id, uid: userCreated.id });

	              if (isRoomActiveExists) {
	                if (isRoomActiveExists.alreadyLogggedIn) {
	                  return response(req, res, 400, false, 'The username has been used in this room');
	                }
	                const accessToken: string = generateToken(
	                  {
	                    id: userCreated.id,
	                    roomId: isRoomExists.id,
	                    roomName: roomId,
	                  },
	                  appConfig.jwtAcessTokenSecretKey,
	                  appConfig.jwtAccessTokenExpiresIn,
	                );
	                const refreshToken: string = generateToken(
	                  {
	                    id: userCreated.id,
	                    roomId: isRoomExists.id,
	                    roomName: roomId,
	                  },
	                  appConfig.jwtRefreshTokenSecretKey,
	                  appConfig.jwtRefreshTokenExpiresIn,
	                );

	                return response(req, res, 200, true, 'Your acccount has been created, you have joined to the room', { accessToken, refreshToken, roomId: isRoomExists.id });
	              }
	              const roomActiveData = new ActiveRoomsModel({ idRoom: isRoomExists.id, uid: userCreated.id, alreadyLoggedIn: true });
	              try {
	                await roomActiveData.save();
	                const accessToken: string = generateToken(
	                  {
	                    id: userCreated.id,
	                    roomId: isRoomExists.id,
	                    roomName: roomId,
	                  },
	                  appConfig.jwtAcessTokenSecretKey,
	                  appConfig.jwtAccessTokenExpiresIn,
	                );
	                const refreshToken: string = generateToken(
	                  {
	                    id: userCreated.id,
	                    roomId: isRoomExists.id,
	                    roomName: roomId,
	                  },
	                  appConfig.jwtRefreshTokenSecretKey,
	                  appConfig.jwtRefreshTokenExpiresIn,
	                );

	                return response(req, res, 200, true, 'Your acccount has been created, you have joined to the room', { accessToken, refreshToken, roomId: isRoomExists.id });
	              } catch (err: any) {
	                return response(req, res, 500, false, err.message);
	              }
	            } else {
	              const roomData = new RoomsModel({ roomId });
	              try {
	                const results = await roomData.save();
	                console.log('ini =>', userCreated.id);
	                const isRoomActiveExists = await ActiveRoomsModel.findOne({ idRoom: results.id, uid: userCreated.id });

	                if (isRoomActiveExists) {
	                  if (isRoomActiveExists.alreadyLogggedIn) {
	                    return response(req, res, 400, false, 'The username has been used in this room');
	                  }
	                  const accessToken: string = generateToken(
	                    {
	                      id: userCreated.id,
	                      roomId: results.id,
	                      roomName: roomId,
	                    },
	                    appConfig.jwtAcessTokenSecretKey,
	                    appConfig.jwtAccessTokenExpiresIn,
	                  );
	                  const refreshToken: string = generateToken(
	                    {
	                      id: userCreated.id,
	                      roomId: results.id,
	                      roomName: roomId,
	                    },
	                    appConfig.jwtRefreshTokenSecretKey,
	                    appConfig.jwtRefreshTokenExpiresIn,
	                  );

	                  return response(req, res, 200, true, 'Your acccount has been created, you have joined to the room', { accessToken, refreshToken, roomId: results.id });
	                }
	                const roomActiveData = new ActiveRoomsModel({ idRoom: results.id, uid: userCreated.id, alreadyLoggedIn: true });
	                try {
	                  await roomActiveData.save();
	                  const accessToken: string = generateToken(
	                    {
	                      id: userCreated.id,
	                      roomId: results.id,
	                      roomName: roomId,
	                    },
	                    appConfig.jwtAcessTokenSecretKey,
	                    appConfig.jwtAccessTokenExpiresIn,
	                  );
	                  const refreshToken: string = generateToken(
	                    {
	                      id: userCreated.id,
	                      roomId: results.id,
	                      roomName: roomId,
	                    },
	                    appConfig.jwtRefreshTokenSecretKey,
	                    appConfig.jwtRefreshTokenExpiresIn,
	                  );

	                  return response(req, res, 200, true, 'Your acccount has been created, you have joined to the room', { accessToken, refreshToken, roomId: results.id });
	                } catch (err: any) {
	                  return response(req, res, 500, false, err.message);
	                }
	              } catch (err: any) {
	                return response(req, res, 500, false, err.message);
	              }
	            }
	          } catch (err: any) {
	            return response(req, res, 500, false, err.message);
	          }
				 } catch (err: any) {
	          return response(req, res, 500, false, err.message);
				 }
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async exitFromRoom(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const { id, roomId } = req.params;

	    try {
	      const activeRoom = await ActiveRoomsModel.findOne({ uid: id, idRoom: roomId });

	      if (!activeRoom) {
	        return response(req, res, 400, false, 'The username was not found');
	      }

	      if (activeRoom && !activeRoom.alreadyLoggedIn) {
	        return response(req, res, 400, false, 'The username has not been used anymore');
	      }

	      try {
	        await ActiveRoomsModel.findByIdAndUpdate(activeRoom.id, { $set: { alreadyLoggedIn: false } });

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
	          roomId: decode.roomId,
	          roomName: decode.roomName,
	        },
	      appConfig.jwtAcessTokenSecretKey,
	      appConfig.jwtAccessTokenExpiresIn,
	      );
	      const newRefreshToken: string = generateToken(
	        {
	          id: decode.id,
	          roomId: decode.roomId,
	          roomName: decode.roomName,
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
