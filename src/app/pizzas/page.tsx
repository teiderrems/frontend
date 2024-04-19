"use client"

import {useCallback, useEffect, useMemo, useState} from "react";
import { IPizza } from "../clients/page";
import Axios from "@/axios.config";
import PizzaItem from "@/components/PizzaItem";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

export default function Pizza() {
  const [pizzas, setPizza] = useState<IPizza[]>([]);
  const [error, setError] = useState<String>();
  const router = useRouter();
  const [loading,setLoading]=useState(true);
    const [order,setOrder]=useState<[{
        item:any,
        quantity:number
    }]>([]);
  const getPizzas = async () => await Axios.get("pizzas", {
    headers: {
      "Authorization": localStorage?.getItem("token") ? "Bearer " + localStorage?.getItem("token") : undefined
    }
  });
  const pathname = usePathname();

  const fetchData=useCallback(async ()=>{
      try {
          const res=await getPizzas();
          if (res.status==200){
              setPizza(res.data);
              setLoading(!loading);
          }
          return res.data;
      }
      catch (err:any){
          setLoading(!loading);
          setError(err.message);
          if (err.response.status==401){
              localStorage.removeItem("token");
              router.push(`/auth?url=${pathname}`);
          }
          return err.message;
      }
  },[pizzas]);


  useEffect(()=> {
      if (!localStorage.getItem("token")){
          router.push(`/auth?url=${pathname}`);
      }

      fetchData().then(res=>console.log(res)).catch(err=>console.log(err));
  }, []);

  const Commander=async ()=>{
      let orders= {items:[],quantity:0,amount:0};
      for ( let i=0;i<order.length;i++) {
          orders.items.push(order[i].item);
          orders.quantity=+order[i].quantity;
          orders.amount+=order[i].item.price*order[i].quantity;
      }
      try {
          const res=await Axios.post('orders',orders,{
              headers: {
                  "Authorization": localStorage?.getItem("token") ? "Bearer " + localStorage?.getItem("token") : undefined
              }
          });
          if (res.status==204){
            router.push(`/clients/${localStorage.getItem("id")}`);
          }
      }
      catch (err:any){
          setError(err.message);
          if (err?.response?.status==401) {//(err.message as string).includes("401")
              console.log(err);
              localStorage.removeItem("token");
              router.push(`/auth?url=${pathname}`);
          }
      }
  }

  if (loading) {
    return(
      <div className="h-screen text-4xl  text-blue-500 flex flex-col justify-center items-center">
        <LoadingOutlined />
    </div>
    )
  }

  if (error) {
    return(
      <div className="flex flex-col justify-center items-center text-red-400">
        <p className="text-wrap text-xl rounded-md border-1 border-gray-400">{error}</p>
      </div>
    )
  }
  return (
    <div className="container w-full mx-auto flex-1">
      <nav className={`flex flex-col mt-3 w-full ${order.length > 0?'md:flex-row justify-end md:space-x-6':''}`}>
          {
              order.length > 0 && <button className="rounded-md text-center bg-green-300" onClick={Commander}>Commander</button>
          }
          <Link href={`/pizzas/add`} className={`self-end w-8 mr-2 text-center rounded-full border hover:bg-blue-500 ${pathname === `/pizzas/add` ? 'active' : ''}`}><PlusOutlined className="" /></Link>
      </nav>
      <div className="flex mx-4 md:flex-row space-x-2 space-y-1 flex-col flex-wrap mt-6 h-full">
        {
          pizzas?.map(c => (<PizzaItem key={c._id} setOrder={setOrder} order={order} pizza={c} />))
        }
      </div>
    </div>
  )
}
