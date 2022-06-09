import { connectDB } from './db/connect';
import { User } from './models/User.model';
import { Logger } from './services/logger.service';

connectDB();

const user = new User({ firstName: 'Mike' });
Logger.info('hello');

user
  .save()
  .then(() => Logger.info('saved x  qwf'))
  .catch((err) => {
    Logger.info(err);
  });
