import { getDatafromToken } from "@/helpers/getDatafromToken";
import { NextRequest, NextResponse } from "next/server";
import  user  from "@/models/userModel";
import { connect } from "@/dbConfig/dbconfig";
connect();
export async function GET(request: NextRequest) {
try {
    const username=await getDatafromToken(request);
    const User=await user.findOne({username:username}).select('-password');
    return NextResponse.json({
        message:"User Found",
        data:User
    });


} catch (error:any) {
    return NextResponse.json({error:error.message},{status:400});
}
    
}