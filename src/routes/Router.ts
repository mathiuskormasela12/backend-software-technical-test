// ========== Router
// import all modules
import { Router as ExpressRouter } from 'express';
import { IRouter } from '../interface';

namespace RouterModule {
	export abstract class Router implements IRouter {
	  private router: ExpressRouter;

		public abstract routes(): void;

		constructor() {
		  this.router = ExpressRouter();
		}

		public get expressRouter(): ExpressRouter {
		  return this.router;
		}
	}
}

export default RouterModule;
