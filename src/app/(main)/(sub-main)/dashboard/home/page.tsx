import { BarChartDocs } from "@/components/BarChartDocs";
import { CarouselDocs } from "@/components/CarouselDocs";
import { SharedFiles } from "../components/SharedFile";

const Home = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col justify-between gap-4 mt-10 w-full">
        <div className="flex">
          <div className="flex flex-1 justify-center items-center mr-5 text-white text-xl">
            <CarouselDocs />
          </div>
          <div className="flex justify-between gap-4 mt-5 text-white">
            <BarChartDocs />
            <SharedFiles />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
