"use client"
import { IPizza } from '@/app/clients/page';
import Axios from '@/axios.config';
import { LoadingOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}


const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const AddOrder: React.FC = () =>{

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
  return(
    <Select
      mode="tags"
      style={{ width: '100%' }}
      placeholder="Tags Mode"
      onChange={handleChange}
      options={options}
    />
  );
} 

export default AddOrder;