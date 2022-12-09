import { PieChart, Pie, Legend, Tooltip } from "recharts";


function TagChart({_data}) {
    return (
        <PieChart width={1000} height={760} background-color="red">
            <Pie
                dataKey="percentage"
                isAnimationActive={true}
                data={_data}
                cx={190}
                cy={200}
                innerRadius={70}
                outerRadius={150}
                fill="#99cc99"
                label
            />
          <Tooltip />
        </PieChart>
    );
}

export default TagChart;