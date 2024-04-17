"use client"

import { useEffect, useState } from "react";
import { IPizza } from "../clients/page";
import Axios from "@/axios.config";
import PizzaItem from "@/components/PizzaItem";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Space } from "antd";

export default function Pizza() {
  const [pizzas, setPizza] = useState<IPizza[]>([]);
  const [error, setError] = useState<String>();
  const router = useRouter();
  const [loading,setLoading]=useState(true);
  const getPizzas = async () => await Axios.get("pizzas", {
    headers: {
      "Authorization": localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : undefined
    }
  });
  const pathname = usePathname();
  useEffect(() => {
    setTimeout(()=>{
      getPizzas().then(res => res.data).then(data => {
        setPizza(data);
        setLoading(!loading);
      }).catch(err => {
        setLoading(!loading);
        setError(err.message);
        if ((err.message as string).includes("401")) {
          localStorage.removeItem("token");
          router.push(`/auth?url=${pathname}`);
        }
      });
    },5000);
  }, []);

  if (loading) {
    return(
      <div className="h-screen text-4xl  text-blue-500 flex flex-col justify-center items-center">
        {/* <h1 className="text-xl italic capitalize">loading...</h1> */}
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
    <div className="container mx-auto w-full my-auto min-h-screen">
      <nav className="flex flex-col mt-3 justify-center w-full">
        <Link href={`/pizzas/add`} className={`self-end w-14 text-center rounded-full border hover:bg-blue-500 ${pathname === `/pizzas/add` ? 'active' : ''}`}><PlusOutlined className="" /></Link>
      </nav>
      <div className="flex mx-3 md:flex-row flex-col gap-3 flex-wrap mt-6  h-full">
        {
          pizzas?.map(c => (<PizzaItem key={c._id} pizza={c} />))
        }
      </div>
    </div>
  )
}
