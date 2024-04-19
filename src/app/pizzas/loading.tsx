import { LoadingOutlined } from "@ant-design/icons";
import { Space } from "antd";

export default function PizzaLoading() {
  return (
    <div className="min-h-screen text-blue-500 flex flex-col justify-end items-center">
        <Space><LoadingOutlined /></Space>
    </div>
  )
}
