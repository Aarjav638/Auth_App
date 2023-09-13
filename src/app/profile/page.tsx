'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { NextResponse } from 'next/server'
import { useRouter } from 'next/navigation'
const profile = () => {
  const [data, setdata] = useState("nothing");
  const router = useRouter();
  const logout = async () => {
    try {
      axios.get('/api/users/logout')
      router.push("/login")

    } catch (error: any) {
      console.log("error", error.message);
    }
  }
  const getuserdetails = async () => {
    const res = await axios.get('/api/users/profile')
    console.log("response", res.data);
    setdata(res.data.data.username);
  }
  return (
    <div className='flex flex-col justify-center items-center py-4 '>
      <h1>profile</h1>
      <br />
      <h2>{data==="nothing"?"nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <br />
      <button className='bg-slate-400 text-slate-300 rounded-lg focus:bg-slate-500 hover:bg-slate-500 p-2 ' type='button' onClick={getuserdetails}>getuserdetails</button>

      <button className='bg-slate-400 text-slate-300 rounded-lg focus:bg-slate-500 hover:bg-slate-500 p-2 ' type='button' onClick={logout}>logout</button>

    </div>
  )
}

export default profile

