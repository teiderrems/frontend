import { LoadingOutlined } from "@ant-design/icons";
import { Space } from "antd";

export default function PizzaLoading() {
  return (
    <div className="min-h-screen text-blue-500 flex flex-col justify-end items-center">
        {/* <h1 className="text-xl italic capitalize">loading...</h1> */}
        <Space><LoadingOutlined /></Space>
    </div>
  )
}
