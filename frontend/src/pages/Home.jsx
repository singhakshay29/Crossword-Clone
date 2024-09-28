import { useContext, useEffect, useState, } from "react";
import BookShelfSection from "../components/BookShelfSection";
import RotateLoader from "react-spinners/RotateLoader";
import {DataContext} from "../Context";
import CarouselSection from "../components/Carousel";


const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Home() {

  const { books } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  const sectionSudha=books.filter((item)=>(item.author==='Sudha Murty'));
  const sectionHeartwarming = books.filter((item) => (
    !/sudha\s*murty|sudha\s*murthy|murthy\s*,\s*sudha|murty\s*,\s*sudha/i.test(item.author) && !('section' in item)
  ));
  
  const sectionFiction=books.filter((item)=>(item.section==='Fiction'));
  const sectionNonFiction=books.filter((item)=>(item.section==='Non Fiction'));

  
  console.log(books);

  useEffect(() => {
    if (books.length > 0) {
      setLoading(false);
    }
  }, [books]);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center border-2 border-solid  h-lvh ">
          <RotateLoader
            color={"#FFE300"}
            loading={loading}
            speedMultiplier={1}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <>
          <CarouselSection />
          <BookShelfSection  data={sectionSudha} heading={"Sudha Murty Books"}/>
          <BookShelfSection  data={sectionHeartwarming} heading={"Heartwarming Cozy Reads"}/>
          <BookShelfSection  data={sectionFiction} heading={"Fiction"}/>
          <BookShelfSection  data={sectionNonFiction} heading={"Non Fiction"}/>
        </>
      )}
    </>
  );
}
