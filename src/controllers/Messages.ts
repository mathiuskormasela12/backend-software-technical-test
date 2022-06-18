/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
// ========== Messages Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { response } from '../helpers';
import MessagesModel from '../models/messages';
import RoomsModel from '../models/rooms';
import UsersModel from '../models/users';

namespace MessagesControllersModule {
	export class MessagesControllers {
	  public static async sendMessage(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    try {
	      const isRoomExists = await RoomsModel.findOne({ id: req.body.activeRoomId });

	      if (isRoomExists) {
	        const data = new MessagesModel(req.body);

	        try {
	          const results = await data.save();
	          try {
	            const user = await UsersModel.findById(req.body.senderId);
	            return response(req, res, 200, true, 'The message has been sent', {
	              _id: results.id,
	              senderName: user.username,
	              senderId: user.id,
	              message: req.body.message,
	            });
	          } catch (err: any) {
	            return response(req, res, 500, false, err.message);
	          }
	        } catch (err: any) {
	          return response(req, res, 500, false, err.message);
	        }
	      } else {
	        return response(req, res, 404, false, 'The room does not exist');
	      }
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async getAllMessages(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    try {
	      const messages = await MessagesModel.find({ activeRoomId: req.params.activeRoomId });

	      if (messages.length < 1) {
	        return response(req, res, 200, false, 'The messages are empty');
	      }

	      const modifiedResults: any[] = [];

	      for (const item of messages) {
	        try {
	          const user = await UsersModel.findById(item.senderId);

	          modifiedResults.push({
	            _id: item.id,
	            senderId: item.senderId,
	            senderName: user.username,
	            message: item.message,
	          });
	        } catch (err: any) {
	          return response(req, res, 500, false, err.message);
	        }
	      }

	      return response(req, res, 200, true, 'Success to get all messages', modifiedResults, 1, modifiedResults.length);
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }
	}
}

export default MessagesControllersModule;
