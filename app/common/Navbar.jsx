import Image from 'next/image'
import React from 'react'
import peg from '@/app/assets/ieee-logo.png'

const Navbar = () => {
  return (
    <div className="h-10 w-10 p-10 right-0 absolute z-10">
        <Image src={peg} alt='pegasus' width={40} height={40} className='object-contain'/>
    </div>
  )
}

export default Navbar