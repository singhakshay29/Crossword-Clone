import { useContext, useEffect, useState, } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import BookShelfSection from "../components/BookShelfSection";
import DataContext from '../DataContext';
import RotateLoader from "react-spinners/RotateLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Home() {

  const { books } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  const sectionSudha=books.filter((item)=>(item.author=='Sudha Murty'));
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
          <Navbar />
          <Carousel />
          <BookShelfSection  data={sectionSudha} heading={"Sudha Murty Books"}/>
          <BookShelfSection  data={sectionSudha} heading={"Heartwarming Cozy Reads"}/>
        </>
      )}
    </>
  );
}
