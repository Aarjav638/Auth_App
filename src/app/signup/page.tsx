'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const router = useRouter();
    const [user,setuser]= useState({
        email:"",
        password:"",
        username:"",
    });
    const [visibility,setvisibility]=useState("invisible");
    const [buttondisabled,setbuttondisabled]=useState(true);
    useEffect(() => {
        if (user.email.length>0&&user.password.length>0&&user.username.length>0) {
            setbuttondisabled(false);
           setvisibility("visible");
        }else{
            setbuttondisabled(true);
            setvisibility("invisible");
        }
    }, [user])
    const [loading,setloading]=useState(false)
    const onSignup=async ()=>{
        try {
            setloading(true);
           const response=await axios.post("/api/users/signup",user);
           console.log("signup success",response.data);
           router.push('/login');
        } catch (error:any) {
            console.log("Signup Failed",error.message)
        }
        finally{
            setloading(false)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center py-5'>
            <h1 className='text-center text-[25px] text-black'>{loading?"processing":"signup"}</h1>
            <hr className='w-full h-20 mt-8 '/>
            <label htmlFor='username'>username</label>
            <input id='username'
            type='text'
            value={user.username}
            onChange={(e)=>setuser({...user,username:e.target.value})}
            placeholder='username'
            className='p-2 border border-slate-400 rounded bg-slate-300 text-sky-700 m-4'/>
            <label htmlFor='email'>email</label>
            <input id='email'
            type='email'
            value={user.email}
            onChange={(e)=>setuser({...user,email:e.target.value})}
            placeholder='email'
            className='p-2 rounded border border-slate-400 bg-slate-300 text-sky-700 m-4'
            />
            <label htmlFor='password'>password</label>
            <input id='password'
            type='password'
            value={user.password}
            onChange={(e)=>setuser({...user,password:e.target.value})}
            placeholder='password'
            className='p-2 rounded border border-slate-400 bg-slate-300 text-sky-700 m-4'/>
            <button id='signup' className={`p-2 rounded border border-slate-400 bg-slate-300 text-sky-700 m-4 focus:bg-slate-500 hover:bg-slate-500 ${visibility}`} type='button' onClick={onSignup}>{buttondisabled?"no signUp":"SignUp"}</button>
            <p>Already registered.<span className=' text-sky-700 text-[15px]'><Link href="/login">Login</Link></span></p>
        </div>
    )
}

export default Signup