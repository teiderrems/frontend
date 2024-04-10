"use client"
import Axios from "@/axios.config";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react"

export default function page() {
    const[routeUrl,setUrl]=useState<string>();
    const router=useRouter();
    const query=useSearchParams();
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const[error,setError]=useState();
    
    const HandleSubmit=(e: FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      Axios.post("clients/auth",{username:username,password:password})
      .then(res=>res.data)
      .then(data=>{
        localStorage.setItem("token",data.token);
        router.push(routeUrl??"/");
      }).catch(err=>{
        setError(err.message);
        router.refresh();
      });
    }

    useEffect(()=>{
        setUrl(query.get("url")??"/");
    },[routeUrl]);
  return (
    <div className="flex flex-col h-h-full mt-12 items-center">
      <form onSubmit={(e)=>HandleSubmit(e)} className='flex flex-col rounded-md justify-center px-4 bg-gray-100 w-4/5 h-3/4'>
        <h1 className=' capitalize text-2xl text-gray-500 pt-2'>Login client</h1>
        {
          error&& <p className='text-red-500 text-wrap text-sm rounded-md w-full py-3'>{error}</p>
        }
        <div className='flex md:flex-row mb-10 mt-10 flex-col w-full'>
          <label htmlFor="name" className='w-1/4'> Username</label>
          <input type="text" id='name' minLength={4} maxLength={5} placeholder='enter your username or your email ' required className='flex-1 h-14 rounded-md pl-2 shadow-md shadow-blue-400' onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className='flex mb-10 md:flex-row flex-col w-full'>
          <label htmlFor="firstname" className='w-1/4'>Password</label>
          <div className='flex flex-col w-3/4 h-14'>
            <input type="password" id='password' minLength={6} pattern="[a-zA-Z]+[a-zA-Z0-9]+[;?,@]" required className='flex-1 h-14  pl-2 rounded-md shadow-md shadow-blue-400' onChange={(e)=>setPassword(e.target.value)}/>
            {
              !(password.match("[a-zA-Z]+[a-zA-Z0-9]+[;?,@]")) && password.length!=0&& username.length!=0 &&(<p className='text-wrap text-sm text-red-500'>Le mot de passe doit avoir aumoins 6 caractères et se terminé par aumoins un des caractères suivants:(;?,@)</p>)
            }
          </div>
        </div>
          <div className='flex justify-start mb-2'>
          {(password=="" || username==""||password.length<6)?(<button type="submit" disabled className='w-1/4 hover:bg-blue-400 h-16 rounded-md bg-blue-200'>Sign Up</button>):(<button type="submit" className='w-1/4 hover:bg-blue-600 h-16 rounded-md bg-blue-400'>Sign Up</button>)}
        </div>
    </form>
  </div>
  )
}
