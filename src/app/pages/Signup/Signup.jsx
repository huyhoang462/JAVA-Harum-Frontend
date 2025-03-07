import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const nav = useNavigate();
  return (
    <div className='p-10 rounded-sm  shadow-lg w-full max-w-sm'>
        <div className='flex flex-col items-center'>
            <div ><img className='h-12  ' src="/logoFull.svg"/></div>
            <div className='font-semibold text-sblue text-xl'>Đăng ký</div>
            <div >
                <p className='text-text font-medium'>Email</p>
                <input className='w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue'/>
            </div>
            <div >
                <p className='text-text font-medium'>Mật khẩu</p>
                <input type='password' className='w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue'/>
            </div>
            <div >
                <p className='text-text font-medium'>Nhập lại mật khẩu</p>
                <input type='password' className='w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue'/>
            </div>
           
            <div className='bg-sblue rounded-md cursor-pointer flex justify-center items-center mb-5  w-[316px] h-9 hover:bg-pblue'>
                <p className=' font-medium text-white'>Đăng ký</p>
                </div>
            <div className='flex '>
                <p className='text-text text-sm mr-1'>Đã có tài khoản?</p>
                <p className='text-sblue underline text-sm font-medium hover:text-pblue cursor-pointer' onClick={()=>{nav('/login')}}>Đăng nhập</p>
            </div>
        </div>
    </div>
  )
}
