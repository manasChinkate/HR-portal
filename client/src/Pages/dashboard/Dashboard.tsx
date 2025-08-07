import Chart1 from "@/components/Charts/Chart1";
import Chart2 from "@/components/Charts/Chart2";
import Chart3 from "@/components/Charts/Chart3";
import Chart4 from "@/components/Charts/Chart4";
import { CollapsibleDropdown } from "@/components/custom/select";
import CustomDropdown from "@/components/custom/select";
import {
  Tabs,
  TabsContent,
  TabTrigger,
  TabTriggerContainer,
} from "@/components/custom/tabs";
import { useState } from "react";
import { selectRealScaleType } from "recharts/types/state/selectors/axisSelectors";

const Dashboard = () => {
  type Option = {
    label: string;
    value: string;
    children?: Option[]; // nested structure
  };

  const options: Option[] = [
    {
      label: "Fruits",
      value: "fruits",
      children: [
        {
          label: "Apple",
          value: "apple",
          children: [
            {
              label: "Apple",
              value: "apgvdple",

              children: [
                {
                  label: "Apple",
                  value: "aptrterjple",
                },
                { label: "Banana", value: "bananujuja" },
              ],
            },
            { label: "Banana", value: "bangerana" },
          ],
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "frufadsits",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "frurgeits",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "fruweits",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruivnbts",
      value: "fruits",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "fruieyts",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruiqts",
      value: "fruits",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruioits",
      value: "fruits",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruinghtts",
      value: "fruits",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "fruibngfts",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "fruiwehshts",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "fruiuyuuuts",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Fruits",
      value: "fruiyyyyts",
      children: [
        {
          label: "Apple",
          value: "apple",
        },
        { label: "Banana", value: "banana" },
      ],
    },
    {
      label: "Vegetables",
      value: "vegetables",
      children: [
        { label: "Carrot", value: "carrot" },
        { label: "Broccoli", value: "broccoli" },
      ],
    },
  ];

  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");

  return (
    <>
      <div className=" dark:bg-primary1 flex flex-1 bg-background2 overflow-scroll flex-col gap-4 pt-2 pr-2 ">
        <div className="grid  gap-2 md:grid-cols-4 ">
          {/* <div className=" col-span-2">
            <Chart4 />
          </div>

          <div className="dark:bg-secondary1 col-span-2   rounded-xl bg-background1">
            <Chart1 />
          </div> */}
          <div className=" flex gap-4 col-span-full">
            {/* <Tabs>
              <TabTriggerContainer className="">
                <TabTrigger value="Home">Home</TabTrigger>
              </TabTriggerContainer>
              <TabsContent value="Home">
                <p>Home</p>
              </TabsContent>
            </Tabs> */}

            {/* <CustomDropdown
              value={selected}
              onChange={setSelected}
              options={options}
              placeholder="Choose a category"
            /> */}

            <CollapsibleDropdown
              options={options}
              value={selected}
              onChange={setSelected}
              placeholder="Choose item"
            />
            {selected}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
