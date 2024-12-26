
import React from 'react';
import MobileMenu from './MobileMenu';
import UserInfo from './UserInfo';

const NavBar = () => {
    return (
        <div className='w-full h-full px-4 py-4 bg-black md:px-8 lg:px-20 xl:px-48'>

            <div className='flex items-center justify-between w-full p-2 font-montserrat rounded-xl'>

                {/* Mobile */}

                <div className='w-1/2'>
                    <MobileMenu />
                </div>





                <div className='bg-gradient-to-r from-[#AA15A2] to-[#800CB1] bg-clip-text w-1/2 text-end'>
                    <h1 className='text-3xl font-medium text-transparent md:text-4xl'>DJ - U</h1>
                </div>


                {/* <div className='w-1/3'>
                    <UserInfo />
                </div> */}



            </div>



        </div>
    )
}

export default NavBar