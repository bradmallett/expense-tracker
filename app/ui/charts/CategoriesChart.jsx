'use client'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatNumberToPercent } from '../../lib/utils.js';



export default function CategoriesChart({ categoryChartData }) {

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;
      
        return (
          <div className="bg-slate-950 p-2 text-xs border-2 border-purple-600">
            <p className='p-1 text-sm text-purple-600 font-bold'>{label}</p>
            <p className='pb-1'>{`GOAL: ${payload[0].value}%`}</p>
            <p>{`ACTUAL: ${payload[1].value}%`}</p>
          </div>
        );
      };


    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryChartData} className='font-bold pr-4 pb-6'>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#9333ea"/>
                    <YAxis stroke="#9333ea" className='text-xs' tickFormatter={formatNumberToPercent}/>
                    <Bar dataKey="target" fill="#581c8796" strokeWidth="3px" barSize={80} xAxisId="one" activeBar={{ fill: '#581c87', stroke: 'none'}}/>
                    <XAxis dataKey="name" stroke="#9333ea" xAxisId="one" />
                    <Bar dataKey="actual" fill="#9333ea" barSize={80} xAxisId="two" activeBar={{ fill: '#c084fc', stroke: 'none'}} />
                    <XAxis dataKey="name" xAxisId="two" hide/>
                    <Tooltip content={CustomTooltip} cursor={false}/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )

}

