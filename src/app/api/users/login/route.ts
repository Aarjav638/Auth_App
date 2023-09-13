import { connect } from '@/dbConfig/dbconfig';
import user from '@/models/userModel.js'
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'
connect();
export  async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);
        const User = await user.findOne({ email });
        if (!User) {
            return NextResponse.json({ error: "user not exists" }, { status: 400 })
        }
        const isMatch = await bcryptjs.compare(password, User.password)
        if (!isMatch) {
            return NextResponse.json({ error: "password is incorrect" }, { status: 400 })
        }
        const tokenData = {
            id: User._id,
            username: User.username,
            email: User.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        const response = NextResponse.json({ message: "login successfull", success: true })
        response.cookies.set("Login_token", token, {
            httpOnly: true
        })
        return response;
    } catch (error: any) {
        return (
            NextResponse.json({ error: error.message }, { status: 500 })
        )

    }
} 
