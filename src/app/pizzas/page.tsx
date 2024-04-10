"use client"

import { useEffect, useState } from "react";
import { IPizza } from "../clients/page";
import Axios from "@/axios.config";
import PizzaItem from "@/components/PizzaItem";
import { usePathname, useRouter } from "next/navigation";

export default function Pizza() {
  const [pizzas,setPizza]=useState<IPizza[]>([]);
  const [error,setError]=useState<String>();
  const router=useRouter();
  const getPizzas=async()=>await Axios.get("pizzas",{
    headers:{
        "Authorization":localStorage.getItem("token")?"Bearer "+localStorage.getItem("token"):undefined
    }
  });
  const pathname=usePathname();
  useEffect(()=>{
    getPizzas().then(res=>res.data).then(data=>setPizza(data)).catch(err=>{
      setError(err.message);
      if ((err.message as string).includes("401")) {
        router.push(`/clients/auth?url=${pathname}`);
      }
    }
    );
  },[]);

  if (error) {
    <div className="flex flex-col justify-center items-center text-red-400">
      <p className="text-wrap text-xl rounded-md border-1 border-gray-400">{error}</p>
    </div>
  }
  return (
    <div className="flex mx-3 md:flex-row flex-col gap-3 flex-wrap mt-6  h-full">
      {
        pizzas?.map(c=>(<PizzaItem key={c._id} pizza={c}/>))
      }
    </div>
  )
}
