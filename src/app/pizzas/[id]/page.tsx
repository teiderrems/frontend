"use client"
import Axios from "@/axios.config";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import pizzaImg from "../../../../public/pizza.jpg";
import Image from "next/image";

export default function PizzaDetail() {

    const param=useParams();
    const getPizza=async()=>await Axios.get(`pizzas/${param.id}`);
    const [pizza,setPizza]=useState({});
    const [error,setError]=useState();
    let piz={};
    const[loaging,setLoading]=useState(false);
    useEffect(()=>{
        getPizza().then(res=>res.data)
        .then(data=>{
            setPizza(data);
            setLoading(!loaging);
        })
        .catch(err=>setError(err.message));
        
    },[error]);

    if (error || !loaging) {
        return(
            <div className="flex justify-center items-center">
                <p className={`${error?'text-red-500':'text-black'}`}>{error??'Loading...'}</p>
            </div>
        )
    }
  return (
    <div className="h-full flex flex-col md:flex-row">
        <Image src={pizzaImg} className="md:h-full h-1/2 md:w-1/2" alt={pizza?.name}/>
        <div className=" md:h-full flex-1 h-1/2 flex flex-col">
            <div className="flex px-2 md:flex-row flex-col justify-between">
                <h1 className="h-1/6 italic ">{pizza?.name}</h1>
                <h1 className="italic">Price : {pizza?.price}€</h1>
            </div>
            <hr />
            <p className="p-4 flex-1 text-justify text-sm">
                {pizza?.description}
            </p> 
        </div>
    </div>
  )
}
