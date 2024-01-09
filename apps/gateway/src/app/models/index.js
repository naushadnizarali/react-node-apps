import { url } from '../config/db.config.js';

import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = url;
db.tutorials = require('./tutorial.model.js').default(mongoose);

export default db;
