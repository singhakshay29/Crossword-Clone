import { useState } from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";


export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    { id: 1, url:'https://www.crossword.in/cdn/shop/files/sudha_murty_banner_1296x@2x.png?v=1724154809' },
    { id: 2, url:'https://www.crossword.in/cdn/shop/files/Preorder_banner_july_1296x@2x.jpg?v=1720598258' },
    { id: 3,url:'https://www.crossword.in/cdn/shop/files/Tweak_India_Teen_Couple_Have_Fun_Outdoors_Banners_Desktop_copy_1296x@2x.jpg?v=1722490431', },
    { id: 4,url:'https://www.crossword.in/cdn/shop/files/Half_Price_banners_50_off-05_1_1296x@2x.jpg?v=1720412306', },
    {id: 5,url:'https://www.crossword.in/cdn/shop/files/Fiction_Addiction_Banner_Desktop_copy_1296x@2x.jpg?v=1716985828'}
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="h-80 mt-52 w-full overflow-hidden">
        <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full mt-12 h-64 flex items-center justify-center text-white`}
          >
            <img  src={slide.url}/>
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2  p-2"
      >
    <MdArrowBackIos className=" text-3xl"  />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 "
      >
        <MdArrowForwardIos className=" text-3xl"  />
      </button>
    </div>
  )
}
