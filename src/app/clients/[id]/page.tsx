"use client"
import Axios from "@/axios.config";
import { useParams, usePathname, useRouter } from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import avatar from "../../../../public/avatar.jpg"
import Image from "next/image";

export default function ClientDetail() {
  const param=useParams();
    const getClient=async()=>await Axios.get(`clients/${param.id}`,{
        headers: {
            Authorization: localStorage?.getItem("token") && "Bearer " + localStorage?.getItem("token")
        }
    });
    const [client,setClient]=useState<{
        user:{
            _id:string;
            username?:string | undefined;
            firstname?:string;
            email:string;
            lastname:string;
        },
        orders:[{
            items:[{
                name:string;
                price?:number;
                description:string;
                _id:string;
            }],
            _id:string;
            quantity:number;
            amount:number
        }]
    }>();
    const [error,setError]=useState<string>();
    const[loaging,setLoading]=useState<boolean>(false);
    const router=useRouter();
    const pathname=usePathname();

    // const orderMemo=useMemo(()=>client,[client]);

    useEffect(()=>{
        getClient().then(res=>res.data)
        .then(data=>{
            setClient(data);
            setLoading(!loaging);
            console.log(data);
        })
        .catch(err=>{
          if (err.response.status==401) {
            setError(err.message);
            localStorage.removeItem("token");
            router.push(`/auth?url=${pathname}`);
          }
        });
        
    },[error]);

    if (error || !loaging) {
        return(
            <div className="flex justify-center items-center">
                <p className={`${error?'text-red-500':'text-black'}`}>{error??'Loading...'}</p>
            </div>
        )
    }
    const deleteOrder=async (id:string)=>{
        if (confirm(`Voulez-vous vraiment supprimer la commande qui a l'identifiant ${id}?`)){
            try {
                const res=await Axios.delete(`orders/${id}`,{
                    headers:{
                        "Authorization":localStorage.getItem("token")?"Bearer "+localStorage.getItem("token"):undefined
                    }
                });
                console.log(res.status);
                if (res.status==204){
                    router.replace(pathname);
                }
            }
            catch (err:any){
                if (err.response.status==401) {
                    localStorage.removeItem("token");
                    router.push(`/auth?url=${pathname}`);
                }
                console.log(err.message);
            }
        }
    }
  return (
    <div className="h-full flex-1 flex flex-col md:flex-row">
        <div className="flex md:flex-col md:h-full flex-row justify-center w-full md:w-2/5 md:border-r md:border-gray-200">
            <Image src={avatar} className="md:h-full h-1/2 w-1/4 md:w-full" alt={client!.user.username!}/>
            <div className="flex-1 h-1/2 container mx-auto flex flex-col">
                <input disabled value={client?.user.username} className="md:mb-8 pl-2 mt-2 mr-1 rounded-md"/>
                <input disabled value={client?.user.email} className="md:mb-8 pl-2 mt-2 mr-1 rounded-md"/>
                <input disabled value={client?.user.firstname} className="md:mb-8 pl-2 mt-2 mr-1 rounded-md"/>
                <input disabled value={client?.user.lastname} className=" pl-2 md:mb-6 mt-2 mr-1 rounded-md"/>
          </div>
        </div>
        <div className="flex-1 h-1/2 md:h-full w-full md:space-y-1 flex flex-col">
          {
              client?.orders.map((o,index)=>(<div key={o._id} className="flex flex-col w-full">
                  <div className="w-full flex justify-around">
                      <h1 className="italic">NumOrder: {index + 1}</h1>
                      <h1 className="italic">Item count: {o.quantity}</h1>
                      <h1 className="italic">Amount: {Math.ceil(o.amount)}€</h1>
                      <button onClick={()=>deleteOrder(o._id)} className="text-red-500 text-xl">X</button>
                  </div>
                  <hr/>
                  <ul className=" flex flex-col  space-y-1 mt-1 justify-around  w-full">
                      {
                          o.items?.map(item => (
                              <li className="text-justify rounded-md hover:bg-blue-100 cursor-pointer px-2 py-1 font-thin"
                                  key={item._id}>{item.name}</li>
                          ))
                      }
                  </ul>
                  <hr/>
              </div>))
          }
        </div>
    </div>
  )
}
