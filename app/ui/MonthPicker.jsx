'use client';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { CalendarIcon } from '@heroicons/react/24/outline';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function TestDatePicker() {
    const searchParams = useSearchParams();
    const [selectedDate, setSelectedDate] = useState(() => {
        const year = searchParams.get('year');
        const month = searchParams.get('month');

        if (year && month) {
            return new Date(`${year}-${month}-01`);
        }
        return new Date();
    });
    
    const pathName = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        updateQueryParams();
    }, [selectedDate]);


    function updateQueryParams() {
        const year = selectedDate.toISOString().split('-')[0];
        const month = selectedDate.toISOString().split('-')[1];
        const params = new URLSearchParams(searchParams);
        params.set('year', year);
        params.set('month', month);
        replace(`${pathName}?${params.toString()}`);
    }

    const renderMonthContent = (month, shortMonth, longMonth, day) => {
        return ( 
        <span>{shortMonth}</span>
        )
      };

      return (
        <DatePicker
            className="bg-slate-900 text-slate-200 border-2 hover:border-orange-600"
            calendarClassName="month-picker"
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            showIcon
            icon={<CalendarIcon className="m p-0 top-1"/>} 
            renderMonthContent={renderMonthContent}
            showMonthYearPicker
            dateFormat="MMMM, YYYY"
        />
      );
}