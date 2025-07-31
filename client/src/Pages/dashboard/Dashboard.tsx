import Chart1 from "@/components/Charts/Chart1";
import Chart2 from "@/components/Charts/Chart2";
import Chart3 from "@/components/Charts/Chart3";
import Chart4 from "@/components/Charts/Chart4";
import {
  Tabs,
  TabsContent,
  TabTrigger,
  TabTriggerContainer,
} from "@/components/custom/tabs";

const Dashboard = () => {
  return (
    <>
      <div className=" dark:bg-primary1 flex flex-1 bg-background2 overflow-scroll flex-col gap-4 pt-2 pr-2 ">
        <div className="grid  gap-2 md:grid-cols-4 ">
          <div className=" col-span-2">
            <Chart4 />
          </div>

          <div className="dark:bg-secondary1 col-span-2   rounded-xl bg-background1">
            <Chart1 />
          </div>
          <div>
            <Tabs defaultValue="home">
              <TabTriggerContainer className="">
                <TabTrigger value="Home">HOme</TabTrigger>
                <TabTrigger value="Setting">Setting</TabTrigger>
                <TabTrigger value="Profile">Profile</TabTrigger>
              </TabTriggerContainer>
              <TabsContent  value="Home">
                <p>Home</p>
              </TabsContent>
              <TabsContent value="Setting">
                <p>Setting</p>
              </TabsContent>
              <TabsContent value="Profile">
                <p>Profile</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
