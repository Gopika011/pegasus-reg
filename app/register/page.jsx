import React from 'react'
import RegisterForm from './components/RegisterForm'
import Hero from './components/Hero'

const Register = () => {
  return (
    <div className='flex bg-[#070707] font-ProductSans'>
        <Hero/>
        <RegisterForm/>
    </div>
  )
}

export default Register