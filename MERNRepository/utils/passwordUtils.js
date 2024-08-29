import bcrypt from 'bcryptjs';

// The hashPassword Functionality
export const hashPassword = async(password)=>{
    // Using the genSalt method properties:
    const salt = await bcrypt.genSalt(10);
    // Storing the hashedPassword:
    const hashedPassword = await bcrypt.hash(password, salt);
    // returning the hashedPassword
    return hashedPassword;
};

// The comparePassword Functionality:
export const comparePassword = async(password, hashedPassword)=>{
    // Using bcrypt to COMPARE password and hashedPassword
    // and return whether it is true or false
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};