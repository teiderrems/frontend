"use client"
import Axios from '@/axios.config';
import { usePathname, useRouter } from 'next/navigation';
import React, { FormEvent, useLayoutEffect, useState } from 'react'

export default function Add() {


  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const navigate = useRouter();
  const pathname=usePathname();
  const [token,setToken]=useState(localStorage.getItem("token"));
  useLayoutEffect(()=>{
    if (!token) {
      navigate.push(`/auth?url=${pathname}`);
    }
  },[]);
  const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Axios.post("pizzas", { name: name, description: description, price: price }).then(res => {
      navigate.push("/pizzas");
    }).catch(err => {
      if((err.message as string).includes("401")){
        localStorage.removeItem("token");
        setError(err.message);
        navigate.push(`/auth?url=${pathname}`);
      }
      setError(err.message);
    });
  }

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">

      <form onSubmit={(e) => HandleSubmit(e)} className='flex flex-col rounded-md justify-center px-4 bg-gray-100 w-4/5 h-3/4'>
        <h1 className=' capitalize text-2xl text-gray-500 pt-2'>Register pizza</h1>
        {
          error && <p className='text-red-500 text-wrap text-sm rounded-md w-full py-3'>{error}</p>
        }
        <div className='flex md:flex-row mb-10 mt-10 flex-col w-full'>
          <label htmlFor="name" className='w-1/4'> Name</label>
          <input type="text" id='name' placeholder='le nom de la pizza' required className='flex-1 h-14 rounded-md pl-2 shadow-md shadow-blue-400' onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='flex md:flex-row mb-10 flex-col w-full'>
          <label htmlFor="description" className='w-1/4'> Description</label>
          <textarea id='description' placeholder='donné plus de renseignement sur la pizza' required className='flex-1 h-16 rounded-md shadow-md  pl-2 shadow-blue-400' onChange={(e) => setDescription(e.target.value)} ></textarea>
        </div>
        <div className='flex md:flex-row mb-10 flex-col w-full'>
          <label htmlFor="price" className='w-1/4'> Price</label>
          <input type="number" id='price' min={0.90} required className='flex-1 h-14 rounded-md shadow-md  pl-2 shadow-blue-400' onChange={(e) => setPrice(parseInt(e.target.value))} />
        </div>
        <div className='flex justify-start mb-2'>
          {(name == "" || description.length < 6) ? (<button type="submit" disabled className='w-1/4 hover:bg-blue-400 h-16 rounded-md bg-blue-200'>Add</button>) : (<button type="submit" className='w-1/4 hover:bg-blue-600 h-16 rounded-md bg-blue-400'>Add</button>)} 
        </div>
      </form>
    </div>
  )
}
