import jwt from 'jsonwebtoken';

export const createJWT = (payload)=>{
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
}

export const verifyJWT = (token)=>{
    // It will return the userId and role Properties here
    // which is part of the decoded
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded;
}