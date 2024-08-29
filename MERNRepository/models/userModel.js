import mongoose from "mongoose";

// Creating the UserSchema Model Here
const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    lastName:{
        type:String,
        default:"lastName"
    },
    location:{
        type:String,
        default:"my city"
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default: 'user'
    },
    // Store the avatar in the form of String Format
    avatar:String,
    // Store the public Id of avatar in the form of String for the avatarPublicId
    avatarPublicId:String
});

UserSchema.methods.toJSON = function(){
    // Convert to JavaScript Object:
    let obj  = this.toObject();
    // Delete the password Property:
    delete obj.password;
    return obj;
};


export default mongoose.model('User', UserSchema);