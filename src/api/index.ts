import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import transaction from './routes/transaction';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	transaction(app);

	return app
}