'use client'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatNumberToPercent } from '../../lib/utils.js';



export default function CategoriesChart({ categoryChartData }) {


    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={categoryChartData} className='font-bold pr-4 pb-6'>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#9333ea"/>
                    <YAxis stroke="#9333ea" className='text-xs' tickFormatter={formatNumberToPercent}/>
                    <Bar dataKey="target" fill="#581c8796" strokeWidth="3px" barSize={100} xAxisId="one"/>
                    <XAxis dataKey="name" stroke="#9333ea" xAxisId="one" />
                    <Bar dataKey="actual" fill="#9333ea" barSize={70} xAxisId="two"/>
                    <XAxis dataKey="name" xAxisId="two" hide/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )

}