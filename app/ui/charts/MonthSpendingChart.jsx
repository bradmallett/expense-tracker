'use client'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { formatCentsToDollars } from '../../lib/utils.js';
import { useState } from 'react';


const CategoriesChart = ({ shapedMonthTagsData }) => {
    const [activeIndex, setActiveIndex] = useState(0);
  
    const onPieEnter = (_, index) => {
      setActiveIndex(index);
    };
  
    const renderActiveShape = (props) => {
      const RADIAN = Math.PI / 180;
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius + 10) * cos;
      const sy = cy + (outerRadius + 10) * sin;
      const mx = cx + (outerRadius + 30) * cos;
      const my = cy + (outerRadius + 30) * sin;
      const ex = mx + (cos >= 0 ? 1 : -1) * 22;
      const ey = my;
      const textAnchor = cos >= 0 ? 'start' : 'end';
  
      return (
        <g >
          <text x={cx} y={cy} dy={0} textAnchor="middle" fill={payload.tagColor} className='font-bold'>
            {payload.tagName}
          </text>
          <text x={cx} y={cy} dy={25} textAnchor="middle" fill={payload.tagColor}>
            {formatCentsToDollars(payload.tagAmount)}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={payload.tagColor}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 15}
            fill={payload.tagColor}
          />
          {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={payload.tagColor} fill="none" /> */}
          {/* <circle cx={ex} cy={ey} r={2} fill={payload.tagColor} stroke="none" /> */}
          {/* <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill={payload.tagColor}>{`Spent: ${value}`}</text> */}
          
        </g>
      );
    };
  
    return (
      <ResponsiveContainer width="100%" height="100%" >
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={shapedMonthTagsData}
            cx="50%"
            cy="50%"
            innerRadius={150}
            outerRadius={200}
            fill='#334155'
            paddingAngle={2}
            stroke='none'
            dataKey="tagAmount" 
            nameKey="tagName"
            onMouseEnter={onPieEnter}
            
          />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  export default CategoriesChart;

