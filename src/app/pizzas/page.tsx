"use client"

import { useEffect, useState } from "react";
import { IPizza } from "../clients/page";
import Axios from "@/axios.config";
import PizzaItem from "@/components/PizzaItem";

export default function Pizza() {
  const [pizzas,setPizza]=useState<IPizza[]>([]);
  const [error,setError]=useState<String>();
  const getPizzas=async()=>await Axios.get("pizzas");

  useEffect(()=>{
    getPizzas().then(res=>res.data).then(data=>setPizza(data)).catch(err=>setError(err.message));
  },[]);

  if (error) {
    <div className="flex flex-col justify-center items-center text-red-400">
      <p className="text-wrap text-xl rounded-md border-1 border-gray-400">{error}</p>
    </div>
  }
  return (
    <div className="flex flex-wrap gap-4">
      {
        pizzas?.map(c=>(<PizzaItem key={c._id} pizza={c}/>))
      }
    </div>
  )
}
