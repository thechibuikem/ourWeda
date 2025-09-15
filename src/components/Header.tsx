import {type FC} from 'react'

const Header:FC = () => {
  return (
    <section className="w-full h-full bg-green-950 rounded-xl flex items-center justify-center shadow-md hover:shadow-sm hover:-translate-y-1 transition-transform cursor-pointer"><h1 className='md:text-[5rem] text-neutral-100 text-2xl header-font uppercase'>Our Weda</h1></section>
  )
}

export default Header