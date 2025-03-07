import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ForgetPassword from './partials/ForgetPassword';

export default function Login() {
    const nav = useNavigate();
    const [isShowModal,setIsShowModal]=useState(false);
    const handleForgotPassword=()=>{
        setIsShowModal(true);
    }
  return (
    <div className='p-10 rounded-sm  shadow-lg w-full max-w-sm'>
        <div className='flex flex-col items-center'>
            <div ><img className='h-12  ' src="/logoFull.svg"/></div>
            <div className='font-semibold text-sblue text-xl'>Đăng nhập</div>
            <div >
                <p className='text-text font-medium'>Email</p>
                <input className='w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue'/>
            </div>
            <div >
                <p className='text-text font-medium'>Mật khẩu</p>
                <input type='password' className='w-[306px] h-9 mt-2 mb-4 px-2 border-2 border-text rounded-md focus:outline-sblue'/>
            </div>
            <div className='w-[306px] flex justify-between items-center mb-5'>
                <div className='flex items-center'>
                    <input type='checkbox' className='h-4 w-4 border-1 mr-2.5 border-text rounded-sm'/>
                    <div className='text-sm text-text'>Nhớ mật khẩu</div>
                </div>
                <div className='font-medium cursor-pointer text-sm text-sblue hover:text-pblue' onClick={handleForgotPassword}>Quên mật khẩu?</div>
            </div>
            <div className='bg-sblue rounded-md cursor-pointer flex justify-center items-center mb-5  w-[316px] h-9 hover:bg-pblue'>
                <p className=' font-medium text-white'>Đăng nhập</p>
                </div>
            <div className='flex '>
                <p className='text-text text-sm mr-1'>Chưa có tài khoản?</p>
                <p className='text-sblue underline text-sm font-medium hover:text-pblue cursor-pointer' onClick={()=>{nav('/signup')}}>Đăng ký</p>
            </div>
        </div>
        {isShowModal&&<ForgetPassword onBack={()=>{setIsShowModal(false)}}/>}
    </div>
  )
}
