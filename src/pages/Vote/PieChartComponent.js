import React from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
import chartColor from "./chart-colors.json";
import * as PieCharts from "./style";

function PieChartComponent({title, description, analData}) {
    const langColor = chartColor;
      const COLORS = analData.map((it) => {
        const langName = it.name;
        return langColor[langName];
      });

      return (
        <PieCharts.Container>
          <PieCharts.Wrapper>
            <PieCharts.Heading>
              <PieCharts.Title>{title}</PieCharts.Title>
            </PieCharts.Heading>
            <PieCharts.RatioWrapper>
              {analData &&
                analData.map((it, idx) => (
                  <PieCharts.LangColorBoxWrapper key={`${it.name}-${it.percentage}`}>
                    <PieCharts.LangColorBox idx={COLORS[idx]} />
                    <div>
                      <PieCharts.LangText>{it.percentage}%</PieCharts.LangText>
                      <PieCharts.LangText>{it.name}</PieCharts.LangText>
                    </div>
                  </PieCharts.LangColorBoxWrapper>
                ))}
            </PieCharts.RatioWrapper>
          </PieCharts.Wrapper>
        </PieCharts.Container>
      );
}

export default PieChartComponent;

//<PieCharts.Description>{description}</PieCharts.Description>


//<PieCharts.PieWrapper>
//            <PieChart width={200} height={200}>
//              <Pie
//                data={analData}
//                cx="50%"
//                cy="50%"
//                innerRadius={40}
//                outerRadius={70}
//                fill="#8884d8"
//                dataKey="value"
//                isAnimationActive={false}
//              >
//                {analData.map((entry, index) => (
//                  <Cell
//                    key={`cell-${index}`}
//                    fill={COLORS[index % COLORS.length]}
//                  />
//                ))}
//              </Pie>
//            </PieChart>
//          </PieCharts.PieWrapper>
//        </PieCharts.Container>