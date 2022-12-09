import { PieChart, Pie, Legend, Tooltip } from "recharts";
const dumyage1 =[
    {
        name: "남자",
        percentage: 30
    },
    {
        name: "여자",
        percentage: 70
    },
];

const dumyage2 =[
    {
        name: "남자",
        percentage: 30
    },
    {
        name: "여자",
        percentage: 70
    },
];

const dumyage3 =[
    {
        name: "남자",
        percentage: 30
    },
    {
        name: "여자",
        percentage: 70
    },
];

function TitleChart({data1, data2, data3}) {
    return (

        <PieChart width={1000} height={760} background-color="red">
            <Pie
                dataKey="percentage"
                isAnimationActive={true}
                data={data1}
                cx={80}
                cy={190}
                innerRadius={40}
                outerRadius={80}
                fill="#ff7e00"
                label
            />
          <Tooltip />

          <Pie
              dataKey="percentage"
              isAnimationActive={true}
              data={data2}
              cx={250}
              cy={190}
              innerRadius={40}
              outerRadius={80}
              fill="#4aa8d8"
              label
          />
          <Tooltip />

          <Pie
              dataKey="percentage"
              isAnimationActive={true}
              data={data3}
              cx={420}
              cy={190}
              innerRadius={40}
              outerRadius={80}
              fill="#ffea00"
              label
          />
          <Tooltip />
        </PieChart>
    );
}

export default TitleChart;