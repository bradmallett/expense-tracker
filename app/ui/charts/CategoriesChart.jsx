'use client'
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid  } from 'recharts';

import data from './chartData.js';



export default function CategoriesChart({ categoryChartData }) {


    return (
        <>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={categoryChartData}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#64748b"/>
                    <YAxis />
                    <Bar dataKey="target" fill="none" stroke="#ea580c" strokeWidth="3px" barSize={100} xAxisId="one"/>
                    <XAxis dataKey="name" stroke="#ea580c" xAxisId="one" />
                    <Bar dataKey="actual" fill="#ea580c" barSize={75} xAxisId="two"/>
                    <XAxis dataKey="name" stroke="#ea580c" xAxisId="two" hide/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )

}