// Import Mongoose Library
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create the Schema for the User collection
const userSchema = new Schema({
  googleId: String
});

// Create the model class ('name of the collection', theSchema)
mongoose.model('users', userSchema);

