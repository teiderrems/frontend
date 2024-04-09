"use client"

import Axios from "@/axios.config";
import ClientItem from "@/components/ClientItem";
import { useEffect, useState } from "react";

interface IPizza{
  _id:String|null|undefined;
  name:String;
  description:String;
  price:Number;
}

interface IOrder{
  _id:String|null|undefined;
  items:[IPizza];
  quantity:Number;
}

interface IClient{
  _id:String|null|undefined;
  name:String;
  firstname:String;
  orders:IOrder;
}
export default function Client() {
  const [clients,setClient]=useState<IClient[]>([]);
  const [error,setError]=useState<String>();
  const getClients=async()=>await Axios.get("clients");

  useEffect(()=>{
    getClients().then(res=>res.data).then(data=>setClient(data)).catch(err=>setError(err.message));
  },[]);

  if (error) {
    <div className="flex flex-col justify-center items-center text-red-400">
      <p className="text-wrap text-xl rounded-md border-1 border-gray-400">{error}</p>
    </div>
  }
  return (
    <div className="flex gap-4 flex-wrap">
      {
        clients?.map(c=>(<ClientItem key={c._id} client={c}/>))
      }
    </div>
  )
}

export type {IClient,IOrder,IPizza}
