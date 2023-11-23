import { connect } from 'mongoose';
import { config } from 'dotenv';
config()

const mongoPwd = process.env.MONGO_PWD;

connect(`${mongoPwd}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })
