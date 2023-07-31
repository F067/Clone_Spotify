import { connect } from 'mongoose';

connect(`mongodb+srv://Gregory:Greg120292@dbmusicplayer.ieioahi.mongodb.net/`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
})
