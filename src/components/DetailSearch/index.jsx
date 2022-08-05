import React, { useEffect, useState } from 'react'
import { FastField } from 'formik'
import { Form, Col, Row, DatePicker } from 'antd';
import moment from 'moment';
import { InputSearchField } from '../Input';
import Proptypes from "prop-types";
import axios from 'axios';
import Select from '../Select';
const { RangePicker } = DatePicker;
const DetailSearch = (props) => {
    const { onSelectGenre, onSelectGroup, handleDateChange, onSearch } = props;
    const [genreData, setGenreData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [dates, setDates] = useState([moment(), moment()]);
    const dateFormat = 'YYYY-MM-DD';
    // const getValueFromKey = (data, key) => {
    //     // data : array of object
    //     return [...new Set((data).map(({ key }) => key))]
    // }
    useEffect(() => {
        const fetchTotalGenre = async () => {
            const res = await axios.get('http://localhost:8000/posts');
            // filter genre from an array of object. Just get value from key 'genre'
            // step by step:   let result = res.data;
            //                 let array = result.map({key} => key)
            setGenreData([...new Set((res.data).map(({ genre }) => genre))])
            setGroupData([...new Set((res.data).map(({ group }) => group))])
        };
        fetchTotalGenre();
    }, [])
    const handleCalendarChange = (value) => {
        setDates(value);
    };
    return (
        <div className="laptop:w-[50vw] bg-gray-200 p-4 mobile:w-[80vw] tablet:w-[90vw]">
            <InputSearchField className="flex justify-between mb-3 laptop:flex-row mobile:flex-col" label="Title" />
            <InputSearchField className="flex justify-between mb-3 laptop:flex-row mobile:flex-col" label="Author" />
            <InputSearchField className="flex justify-between mb-3 laptop:flex-row mobile:flex-col" label="Table of Contents" />
            <InputSearchField className="flex justify-between mb-3 laptop:flex-row mobile:flex-col" label="Publisher" />
            <div className="flex justify-between mobile:items-stretch laptop:w-full tablet:w-[100%] laptop:flex-row tablet:flex-row mobile:flex-col">
                <div>
                    <p className='text-sm font-bold'>Dates</p>
                    <div>
                        <RangePicker className='tablet:w-[50%] mobile:w-[50vw] laptop:w-[220px]' onChange={handleDateChange}
                            defaultValue={[moment(), moment()]} allowEmpty={[false, false]}
                            value={dates} format={dateFormat}
                            onCalendarChange={handleCalendarChange} />
                    </div>
                </div>
                <div className="flex gap-x-4">
                    <div>
                        <p className='text-sm font-bold'>Group</p>
                        <Select dataSource={groupData} placeholder="Select group" onChange={onSelectGroup} />
                    </div>
                    <div>
                        <p className='text-sm font-bold'>Genre</p>
                        <Select dataSource={genreData} placeholder="Select genre" onChange={onSelectGenre} />
                    </div>
                </div>
            </div>
        </div>
    )
}
DetailSearch.propTypes = {
    onSelectGenre: Proptypes.func,
    onSelectGroup: Proptypes.func,
};

export default DetailSearch