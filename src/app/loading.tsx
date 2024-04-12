import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
  return (
    <div className="min-h-screen text-blue-500 flex flex-col justify-end items-center">
        {/* <h1 className="text-xl italic capitalize">loading...</h1> */}
        <LoadingOutlined />
    </div>
  )
}
