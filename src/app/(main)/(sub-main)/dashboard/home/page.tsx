import { BarChartDocs } from "@/components/BarChartDocs";
import { CarouselDocs } from "@/components/CarouselDocs";
import { SharedFiles } from "../components/SharedFile";

const Home = () => {
  return (
    <div className="flex lg:flex-row flex-col p-4 w-full h-full">
      <div className="flex lg:flex-row flex-col justify-between gap-4 mt-10 w-full">
        <div className="flex md:flex-row lg:flex-row flex-col w-full">
          <div className="flex flex-col lg:flex-1 justify-start items-center md:mr-20 md:ml-6 text-white text-xl">
            <CarouselDocs />
          </div>
          <div className="flex lg:flex-row flex-col flex-wrap justify-around gap-2 mt-5 lg:mt-0 w-full text-white">
            <BarChartDocs  />
            <SharedFiles  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
