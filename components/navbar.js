import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useRecoilValue } from "recoil";
import { infoform } from '../atoms/formAtom';

function Navbar({ router }) {
  const complete = useRecoilValue(infoform);
  const [dropOpen, setDropOpen] = useState(false);
  const [clientWindowHeight, setClientWindowHeight] = useState("");

  const [backgroundTransparacy, setBackgroundTransparacy] = useState('bg-transparent');
  const [textColor, setTextColor] = useState('text-white');
  const [boxShadow, setBoxShadow] = useState('drop-shadow-none');

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  const handleClick = e => {
    e.preventDefault();
    router.push('/profile');
  }

  useEffect(() => {
    if (router.pathname !== '/') {
      setBoxShadow('drop-shadow-lg');
      setTextColor('text-gray-800')
      setBackgroundTransparacy('bg-white');
    } else {
      if (clientWindowHeight > 10) {
        setBoxShadow('drop-shadow-lg');
        setTextColor('text-gray-800')
        setBackgroundTransparacy('bg-white');
      } else {
        setBoxShadow('drop-shadow-none');
        setTextColor('text-white')
        setBackgroundTransparacy('bg-transparent');
      }
    };
  }, [clientWindowHeight, router]);


  return (
    <nav
      className={`fixed w-full z-30 top-0  
      transition-all duration-500 ease-in-out
      ${textColor} ${backgroundTransparacy} ${boxShadow}`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {
            //change location of logo if links exist
            //justify-center sm:justify-start
          }
          <div className="flex-1 flex items-center justify-center sm:justify-start sm:items-stretch">
            <Link href='/'>
              <div className="flex-shrink-0 items-center font-bold text-lg hidden sm:flex">
                <div className='flex rounded-full overflow-hidden w-10 h-10 mr-3 items-center justify-center relative'>
                  <Image src={'/assets/logo.png'} layout='fill' />
                </div>
                Independent Electoral and Boundaries Commission
              </div>
            </Link>
            <Link href='/'>
              <div className="flex-shrink-0 flex items-center font-bold text-lg sm:hidden">
                <div className='flex rounded-full overflow-hidden w-10 h-10 mr-3 items-center justify-center relative'>
                  <Image src={'/assets/logo.png'} layout='fill' />
                </div>
                IEBC
              </div>
            </Link>
            {
              //add to show other links
              //sm:block 
            }
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-1 transparent">
        <div className={`gradient h-1 rounded-full 
          ${!complete && 'w-0'}
          ${complete === 'info' && 'w-1/3'}
          ${complete === 'calender' && 'w-2/3'}
          ${complete === 'complete' && 'w-full'}
        `} />
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
