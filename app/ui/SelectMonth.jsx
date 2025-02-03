'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function SelectMonth() {
    const [ selectedMonth, setSelectedMonth ] = useState('');
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        if (!selectedMonth) {
            const currentMonth = new Date().toISOString().slice(0,7); 
            setSelectedMonth(currentMonth);
        }

        updateQueryParams();
    }, [selectedMonth]);

    
  function updateQueryParams() {
    const year = selectedMonth.split('-')[0];
    const month = selectedMonth.split('-')[1];
    const params = new URLSearchParams(searchParams);

    params.set('year', year);
    params.set('month', month);
    replace(`${pathName}?${params.toString()}`);
  }

    return (
        <div>
            <label htmlFor="yearMonth">SELECT A MONTH</label>
            <input
                type="month" 
                id="yearMonth"
                name="yearMonth"
                value={selectedMonth}
                required
                onChange={(e) => setSelectedMonth(e.target.value)}
            />
        </div>
    )


}
