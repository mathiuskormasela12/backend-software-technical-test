// ========== Server
// import all modules
import AppModule from './core/App';
import { appConfig } from './config';

const app = new AppModule.App(appConfig.port);
app.listen();
