import { connect } from '@/dbConfig/dbconfig';
import user from '@/models/userModel.js'
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        console.log(reqBody);
        const User=await user.findOne({email});
        if(User){
            return NextResponse.json({error:"user already exists"},{status:400})
        }
        //hash pass
        const salt=await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password,salt)
        const newUser=new user({
            username,
            email,
            password:hashedPassword
        })
        const savedUser=await newUser.save();
        console.log(savedUser);
        return NextResponse.json({message:"user created",success:true,savedUser})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}