import Image from 'next/image'
import React from 'react'
import peg from '@/app/assets/peg.png'

const Hero = () => {
  return (
    <div className='w-1/2 border-r-[1.5px] border-[#6D6D6D] my-4 hidden md:flex'>
      <div className='mt-16 mx-36'><Image src={peg} alt='pegasus' className='object-contain'/></div>
    </div>
  )
}

export default Hero