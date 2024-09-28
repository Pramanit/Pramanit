"use client"
import OneImage from '../assets/images/imageone.png'
import TwoImage from '../assets/images/imagetwo.png'
import Image from 'next/image';
import {motion} from 'framer-motion'

export const Hero = () => {
  return (
    <div className="bg-black text-white bg-[linear-gradient(to_bottom,#000,#0A1A33_34%,#113366_65%,#335B99_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] llg:h-[800px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#5A88B0] bg-[radial-gradient(closest-side,#000_82%,#1C3B6B)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div> {/* dark blue hollow effect */}


    <div className="container relative">

      <div className="flex justify-center mt-8 ">
        <div className="inline-flex relative">
          <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-center'>
            <span className='block mt-5 bg-clip-text text-transparent bg-gradient-to-r from-[#d9d9d9] to-[#ffffff]'>
              PRAMANIT
            </span>
            <span className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mt-0 bg-clip-text text-transparent bg-gradient-to-r from-[#d9d9d9] to-[#ffffff]'>
              More Than Verified.
            </span>
          </h1>


      <motion.div className='absolute right-[480px] top-[-90px] hidden sm:inline'
      drag
      dragSnapToOrigin

      >
      <Image src={OneImage} alt="One" height={500} width={500} className='max-w-none' draggable="false"/>
      </motion.div>
      <motion.div className='absolute left-[455px] top-[10px] hidden sm:inline'
      drag
      dragSnapToOrigin
      >
      <Image src={TwoImage} alt="Gold"  height={500} width={500} className='max-w-none' draggable="false"/>
      </motion.div>
      </div>
      </div>
      <div className="flex justify-center">
      <p className='text-base sm:text-lg md:text-xl lg:text-xl text-center mt-8 max-w-lg bg-clip-text text-transparent bg-gradient-to-r from-[#d9d9d9] to-[#ffffff]'>
        Parmanit harnesses the power of Diamante technology to deliver fast and reliable certificate verification. With its intuitive interface, Parmanit ensures that individuals and organizations can authenticate credentials securely.
      </p>

      </div>
      <div className="flex justify-center mt-8">
      <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 px-4 rounded-lg text-white hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg">
      Get Premium!
      </button>
      </div>


    </div>
    

    </div>
  )
};
