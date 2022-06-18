// ========== Users Routes
// import all modules
import { Router as ExpressRouter } from 'express';
import RouterModule from './Router';

// import all controllers
import authControlerModule from '../controllers/Users';

// import all middlewares
import { joinRoomMiddleware, exitRoomMiddleware, checkGenerateAccessTokenForm } from '../middlewares/users';

namespace UsersRoutesModul {
	export class UsersRoutes extends RouterModule.Router {
	  constructor() {
	    super();
	    this.routes();
	  }

	  public routes(): void {
	    this.expressRouter.post('/join', joinRoomMiddleware, authControlerModule.UsersControllers.joinRoom);
	    this.expressRouter.put('/exit/:id/:roomId', exitRoomMiddleware, authControlerModule.UsersControllers.exitFromRoom);
	    this.expressRouter.post('/access-token', checkGenerateAccessTokenForm, authControlerModule.UsersControllers.generateAccessToken);
	  }

	  public get usersRoutes(): ExpressRouter {
	    return this.expressRouter;
	  }
	}
}

export default new UsersRoutesModul.UsersRoutes();
