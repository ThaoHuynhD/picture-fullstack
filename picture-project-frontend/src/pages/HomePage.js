import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import { getAllImg } from '../api/api';
import { BASE_URL_IMG } from '../api/config';

export default function HomePage() {
    const btnArr = [
        { key: "All" },
        { key: "2014" },
        { key: "2015" },
        { key: "2016" },
        { key: "2017" },
        { key: "2018" },
        { key: "2019" },
        { key: "2020" },
        { key: "2021" },
        { key: "2022" },
        { key: "2023" },
    ]
    let [selectedBtn, setSelectedBtn] = useState('All');
    let [pictureArr, setPictureArr] = useState([]);
    let fetchData = async () => {
        try {
            let response = await getAllImg();
            setPictureArr(response.data.content);
            console.log("pictureArr: ", pictureArr);
        } catch {
            message.error("Đã có lỗi xảy ra");
        }
    };
    useEffect(() => {
        fetchData();
    }, [selectedBtn, pictureArr]);

    return (
        <section>
            <div className="container">
                <div className="flex gap-4 justify-start mb-10">
                    {btnArr.map(btn => (
                        <button className={`btn-outline-orange ${selectedBtn === btn.key ? 'active' : ''}`}
                            onClick={() => { setSelectedBtn(btn.key) }}>{btn.key}</button>
                    ))}
                </div>
            </div>
            <div className='px-10'>
                <div className='grid grid-cols-10 gap-5'>
                    {pictureArr.map(pic => (
                        <div key={pic.img_id} >
                            <div className='bg-yellow-100 relative overflow-hidden'>
                                <div className='pic-hover'>
                                    <div className='img-wrap size-48 overflow-hidden'>
                                        <img src={`${BASE_URL_IMG}/${pic.img_path}`} alt={pic.img_name} />
                                    </div>
                                </div>
                                <div className='pic-hover absolute top-0 left-0 z-10'>
                                    <p className='text-red-500'>{pic.img_capture_time}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
