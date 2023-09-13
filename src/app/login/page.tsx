'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const login = () => {
  const router=useRouter();
    const [user,setuser]= useState({
        email:"",
        password:"",
    });
    const [buttondisabled,setbuttondisabled]=useState(true);
    const [visibility,setvisibility]=useState("invisible");
    useEffect(() => {
        if (user.email.length>0&&user.password.length>0) {
            
            setbuttondisabled(false);
            setvisibility("visible");
        }else{
            setbuttondisabled(true);
            setvisibility("invisible");
        }
    }, [user])
    const [loading,setloading]=useState(false);
    const onLogin=async ()=>{
      try {
        setloading(true);
        
       const response=await axios.post("/api/users/login",user);
       const res = await axios.get('/api/users/profile')
        console.log("response", res.data);
       console.log("login success",res.data.data.username);
       router.push('/profile/'+res.data.data.username);
    } catch (error:any) {
        console.log("login Failed",error.message)
    }
    finally{
        setloading(false)
    }
    }
    return (
        <div className='flex flex-col items-center justify-center py-5'>
            <h1 className='text-center text-[25px] text-black'>{loading?"processing":"Login"}</h1>
            <hr className='w-full h-20 mt-8 '/>
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
            <button className={`p-2 rounded border border-slate-400 bg-slate-300 text-sky-700 m-4 focus:bg-slate-500 hover:bg-slate-500 ${visibility}`} type='button' onClick={onLogin}>{buttondisabled?"no login":"login"}</button>
            <p>Not registered.<span className=' text-sky-700 text-[15px]'><Link href="/signup">Signup</Link></span></p>
        </div>
    )
}

export default login