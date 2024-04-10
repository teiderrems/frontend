import Link from "next/link";
import pizzaImg from "../../public/pizza.jpg"
import Image from "next/image"
export default function ClientItem({pizza}) {
  const getString=(str:String)=>{
    console.log(str.substring(1,10));
  };
  
  return (
    <Link href={`/pizzas/${pizza._id}`} className="flex flex-col h-52 w-52 rounded-xl shadow-md shadow-blue-300">
        <Image src={pizzaImg} className=" hover:opacity-100 hover:cursor-pointer w-full opacity-50" alt={pizza.name}/>
        <div className="flex flex-col md:h-full w-full h-1/2 md:1/2">
            <h1 className=" italic text-wrap text-sm capitalize">{pizza.name}</h1>
        </div>
    </Link>
  )
}
