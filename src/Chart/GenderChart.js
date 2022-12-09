import { PieChart, Pie, Legend, Tooltip } from "recharts";
const dumyage =[
    {
        name: "남자",
        percentage: 30
    },
    {
        name: "여자",
        percentage: 70
    },
];
function GenderChart(data) {
    return (
        <PieChart width={1000} height={760} background-color="red">
            <Pie
                dataKey="percentage"
                isAnimationActive={true}
                data={data}
                cx={230}
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

export default GenderChart;