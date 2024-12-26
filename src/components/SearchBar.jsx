'use client';

import React from 'react';
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className='hidden lg:flex items-center flex-1 md:flex-none md:w-1/2 xl:w-1/3 bg-[#303030] px-2 py-1 lg:py-2 lg:px-3 gap-3 rounded-full font-montserrat'>
            <span className='text-[#707070] hidden lg:flex'><CiSearch size={30} /></span>
            <span className='text-[#707070] lg:hidden'><CiSearch size={25} /></span>

            <input className='flex-1 p-1 bg-transparent ring-0 focus:ring-0 focus:outline-0 placeholder:text-[#707070] text-white text-sm placeholder:text-sm lg:text-lg placeholder:lg:text-lg font-medium' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} type='text' placeholder='Search Music' />

        </div>
    )
}

export default SearchBar