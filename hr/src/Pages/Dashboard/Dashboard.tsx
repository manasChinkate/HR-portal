import Chart1 from "@/components/Charts/Chart1";
import Chart2 from "@/components/Charts/Chart2";
import Chart3 from "@/components/Charts/Chart3";
import Chart4 from "@/components/Charts/Chart4";

const Dashboard = () => {
  return (
    <>
      <div className=" dark:bg-primary1 flex flex-1 bg-background2 overflow-scroll flex-col gap-4 p-4 ">
        <div className="grid  gap-4 md:grid-cols-3 ">
          <div className=" col-span-3">
          <Chart4 />
          </div>
         
          <div className="dark:bg-secondary1  aspect-video rounded-xl bg-background1">
            {/* <Chart1 /> */}
          </div>
        
          <Chart3 />
        </div>
        <div className="dark:bg-secondary1  rounded-xl bg-background1">
          {/* <Chart2 /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
