import {useLocation} from "react-router-dom";
import Card from "../components/Card";

export default function AllBooks() {
  const location = useLocation();
  const {data,heading} = location.state || {};
  console.log(data);

  return (
    <>
    <div className="flex mt-60 text-3xl font-bold mb-4 justify-center">
      {heading}
    </div>
    
    <div className="grid grid-cols-5  gap-8">
      {data?.length > 0 && data.map((item) => ( 
        <Card key={item.id} item={item} /> 
      ))}
    </div>
    </>
  );
}
