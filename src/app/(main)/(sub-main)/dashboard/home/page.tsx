

import { BarChartDocs } from "@/components/BarChartDocs";
import { CarouselDocs } from "@/components/CarouselDocs";

const Home = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col gap-4 w-full">
        
        <div className="flex gap-4">
          <div className="flex flex-1 justify-center items-center mt-10 text-white text-xl">
            <CarouselDocs />
          </div>
          <BarChartDocs />
        </div>
      </div>
    </div>
  );
};

export default Home;
