// ========== Messages Controllers
// import all modules
import { Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { response } from '../helpers';
import MessagesModel from '../models/messages';

namespace MessagesControllersModule {
	export class MessagesControllers {
	  public static async sendMessage(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    const data = new MessagesModel(req.body);

	    try {
	      const results = await data.save();
	      return response(req, res, 200, true, 'The message has been sent', results);
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }

	  public static async getAllMessages(
	    req: ExpressRequest,
	    res: ExpressResponse,
	  ): Promise<ExpressResponse> {
	    try {
	      const messages = await MessagesModel.find({ roomId: req.body.roomId });

	      if (messages.length < 1) {
	        return response(req, res, 404, false, 'The messages are empty', []);
	      }

	      return response(req, res, 200, true, 'Success to get all messages');
	    } catch (err: any) {
	      return response(req, res, 500, false, err.message);
	    }
	  }
	}
}

export default MessagesControllersModule;
