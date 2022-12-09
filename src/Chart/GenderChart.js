import { PieChart, Pie, Legend, Tooltip } from "recharts";

function GenderChart({_data}) {
    return (
        <PieChart width={1000} height={760} background-color="red">
            <Pie
                dataKey="percentage"
                isAnimationActive={true}
                data={_data}
                cx={230}
                cy={190}
                innerRadius={70}
                outerRadius={140}
                fill="#ffea00"
                label
            />
          <Tooltip />
        </PieChart>
    );
}

export default GenderChart;