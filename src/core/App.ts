// ========== App
// import all modules
import express, { Application } from 'express';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import http, { Server } from 'http';
import { Server as SocketIoServer } from 'socket.io';
import { socket } from '../middlewares/socket';

// import all interfaces
import { appConfig } from '../config';

// import all routes
import authRoutes from '../routes/Users';
import messagesRoutes from '../routes/Messages';

namespace AppModule {
	export class App {
	  private app: Application;

	  private server: Server;

	  private port: number;

	  constructor(port: number) {
	    this.port = port;
	    this.app = express();
	    this.server = http.createServer(this.app);

	    this.setup();
	  }

	  private setup(): void {
	    // setup socket.io
	    const io = new SocketIoServer(this.server, {
	      cors: {
	        origin: appConfig.whiteList,
	      },
	    });

	    io.on('connection', () => {
	      console.log('a user has connected');
	    });

	    this.app.use(socket(io));

	    // setup several middlewares
	    this.app.use(morgan('dev'));
	    this.app.use(compression());
	    this.app.use(helmet());

	    // setuo url-encoded
	    this.app.use(express.urlencoded({ extended: false }));
	    this.app.use(express.json());

	    // setup cors
	    const corsOptions = {
	      origin(origin: any, callback: any) {
	        if (appConfig.whiteList.indexOf(origin) !== -1 || !origin) {
	          callback(null, true);
	        } else {
	          callback(new Error('Blocked by Cors'));
	        }
	      },
	    };

	    this.app.use(cors(corsOptions));

	    // setup for static files
	    this.app.use(express.static(path.join(__dirname, '../../public')));

	    // setup mongoose
	    mongoose.connect(appConfig.dbUri, (err: any) => {
	      if (err) {
	        console.log(err);
	      } else {
	        console.log('Database has been connected');
	      }
	    });

	    // routes
	    this.app.use('/api/v1/users', authRoutes.usersRoutes);
	    this.app.use('/api/v1/messages', messagesRoutes.messagesRoutes);
	  }

	  public listen(): void {
	    this.server.listen(this.port, () => {
	      console.log(`The RESTful API is running at ${appConfig.appUrl}`);
	    });
	  }
	}
}

export default AppModule;
