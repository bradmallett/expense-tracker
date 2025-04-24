'use client'
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { formatCentsToDollars } from '../../lib/utils.js';
import { useState, useEffect } from 'react';


const MonthSpendingChart = ({ shapedMonthTagsData, totalMonthExpense, monthName }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [tagColor, setTagColor] = useState('');
    const [tagAmount, setTagAmount] = useState(0);
    const [tagName, setTagName] = useState('');
    const [percentOfIncome, setPercentOfIncome] = useState(0);


    useEffect(() => {
      if (shapedMonthTagsData && shapedMonthTagsData.length > 0) {
        setTagName(shapedMonthTagsData[activeIndex]?.tagName || '');
        setTagColor(shapedMonthTagsData[activeIndex]?.tagColor || '');
        setTagAmount(shapedMonthTagsData[activeIndex]?.tagAmount || 0);
        setPercentOfIncome(calculatePercentOfIncome(shapedMonthTagsData[activeIndex]?.tagAmount) || 0);
      }

    }, [activeIndex, shapedMonthTagsData]);

    function calculatePercentOfIncome(amount) {
      const percentage = Number(((amount / totalMonthExpense) * 100).toFixed(1));
      return percentage;
    } 


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
          <text x={cx} y={cy} dy={0} textAnchor="middle" fill={tagColor} className='font-bold'>
            {tagName}
          </text>
          <text x={cx} y={cy} dy={25} textAnchor="middle" fill={tagColor} className='font-extrabold text-xl'>
            {formatCentsToDollars(tagAmount)}
          </text>
          <Sector
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={tagColor}
          />
          <Sector
            cx={cx}
            cy={cy}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerRadius + 6}
            outerRadius={outerRadius + 15}
            fill={tagColor}
          />
        </g>
      );
    };
  
    return (
      <ResponsiveContainer width="100%" height="100%" >
        <p style={{color: tagColor}}>{percentOfIncome}% of <span className='font-bold'>{monthName} SPENDING</span> spent on {tagName}</p>
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={shapedMonthTagsData}
            cx="50%"
            cy="50%"
            innerRadius='65%'
            outerRadius='90%'
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
  
  export default MonthSpendingChart;

