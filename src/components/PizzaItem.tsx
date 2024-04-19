import Link from "next/link";
import pizzaImg from "../../public/pizza.jpg"
import Image from "next/image"
import {CheckCircleOutlined, DeleteOutlined} from "@ant-design/icons";
import Axios from "@/axios.config";
import {useState} from "react";
import {IPizza} from "@/app/clients/page";


interface Pizza{
    name:string;
    price?:number;
    description:string;
    _id:string;
}

export interface TypeProps{
    pizza:IPizza;
    setOrder:Function;
    order:[{
        item:IPizza,
        quantity:number
    }]
}

export default function ClientItem({pizza,setOrder,order}:TypeProps) {


  const deletePizza=async (id:string)=>{
      if (confirm("Voulez-vous vraiment supprimer cet item?")){
          Axios.delete('pizzas/'+id).then(res=>res.data).catch(err=>{
              console.log(err.message);
          });
      }
  }

  const [clic,setClic]=useState(false);
  const [qte,setQte]=useState(1);

  const addOrder=(piz:any)=>{
      setClic(!clic);
      setReady(!ready);
      setOrder([...order,{
        item:piz,
        quantity:qte
      }]);
  }

  const [ready,setReady]=useState(false);

  return (
    <div className="flex flex-col h-3/4 w-1/5 rounded-xl shadow-md shadow-blue-300">
        <Image src={pizzaImg} className=" hover:opacity-100 rounded-lg hover:cursor-pointer w-full opacity-50" alt={pizza.name}/>
        <div className="container flex flex-col mx-auto">
          <div className="flex flex-col  md:h-5/6 md:w-full h-1/2">
              <h1 className=" italic text-wrap mx-auto text-sm capitalize">{pizza.name}</h1>
          </div>
            <div className="flex  flex-row justify-between flex-1">
                <Link href={`/pizzas/${pizza._id}`}
                      className="rounded-md m-1 hover:shadow-inner px-2 shadow-blue-100 text-center h-8 bg-blue-500 text-white">more</Link>
                <div className={`${clic?'flex space-x-1':''}`}>
                    {(!clic && !ready)? (
                            <button className="bg-green-300 m-1 px-1 h-5/6 rounded-md text-white" onClick={() =>{
                                setClic(!clic);
                                setReady(!ready);
                            } }>
                                <CheckCircleOutlined/></button>) :
                        (<button className="bg-pink-300 m-1 w-1/3 px-2 h-5/6 rounded-md text-white" onClick={() => addOrder(pizza)}>
                            <CheckCircleOutlined/></button>)}
                    {clic &&
                        <input type="number" className="rounded-md text-center m-1 w-1/3" value={qte} max={10}
                               onChange={(e) => setQte(parseInt(e.target.value))}/>}
                </div>
            </div>
        </div>
    </div>
  )
}
