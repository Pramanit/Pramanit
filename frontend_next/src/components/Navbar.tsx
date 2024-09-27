
import LogoImage from '../assets/icons/logo.svg';
import MenuIcon from '../assets/icons/menu.svg';


export const Navbar = () => {
  return (
    <div className="bg-black bg-opacity-30 fixed top-4 left-4 right-4 z-50 backdrop-blur-md rounded-xl shadow-lg">
      <div className="px-4">
        <div className="container">
          <div className="py-4 flex items-center justify-between">

            <div className="relative">
            <div className='absolute w-full top-4 bottom-8 bg-[linear-gradient(to_right,rgba(253,230,138,0.5),rgba(251,191,36,0.5),rgba(245,158,11,0.5))] blur-md'></div>
            <a href="#"><LogoImage className="h-12 w-12 relative mt-1" /></a>
            </div>

            <div className='border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden'>
              <MenuIcon className="text-white" />
            </div>

            <nav className='text-white gap-6 items-center hidden sm:flex'>
              <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>About</a>
              <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>FAQ</a>
              <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Prices</a>
              <a href="#" className='text-opacity-60 text-white hover:text-opacity-100 transition'>Subscribe</a>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-2 px-4 rounded-lg text-white hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 transform transition-all duration-1500 ease-in-out hover:shadow-lg">
              Log In
              </button>
            </nav>

          </div>
        </div>
      </div>
    </div>
  );
};