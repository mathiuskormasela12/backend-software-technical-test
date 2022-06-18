// ========== Messages Routes
// import all modules
import { Router as ExpressRouter } from 'express';
import RouterModule from './Router';

// import all controllers
import messagesControlerModule from '../controllers/Messages';

// import all middlewares
import { isLoggedIn } from '../middlewares/users';
import {
  checkSendMessageForm,
  checkGetAllMessage,
} from '../middlewares/messages';

namespace MessagesRoutesModul {
	export class MessagesRoutes extends RouterModule.Router {
	  constructor() {
	    super();
	    this.routes();
	  }

	  public routes(): void {
	    this.expressRouter.post('/', isLoggedIn, checkSendMessageForm, messagesControlerModule.MessagesControllers.sendMessage);
	    this.expressRouter.get('/:activeRoomId', isLoggedIn, checkGetAllMessage, messagesControlerModule.MessagesControllers.getAllMessages);
	  }

	  public get messagesRoutes(): ExpressRouter {
	    return this.expressRouter;
	  }
	}
}

export default new MessagesRoutesModul.MessagesRoutes();
