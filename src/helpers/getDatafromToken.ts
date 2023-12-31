import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";
export const getDatafromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('Login_token')?.value || "";
        const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!) ;
        return decodedToken.username;
    } catch (error:any) {
        throw new Error(error.message);
    }
};