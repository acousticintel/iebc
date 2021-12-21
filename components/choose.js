import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Choose({ servicesRef }) {
  const router = useRouter();

  const handleClick = e => {
    e.preventDefault();
    router.push('/infoform');
  }

  return (
    <>
      <section ref={servicesRef} className="bg-white py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight 
          text-center text-gray-800">
            Choose a Country
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 
            rounded-t"/>
          </div>
          <div className='w-full px-20 flex flex-wrap justify-around'>
            <div className=' flag'>
              <Image src={'/assets/uae.png'} layout='fill' />
            </div>
            <div className=' flag'>
              <Image src={'/assets/uk.png'} layout='fill' />
            </div>
            <div className=' flag'>
              <Image src={'/assets/us.png'} layout='fill' />
            </div>
            <div className=' flag'>
              <Image src={'/assets/canada.png'} layout='fill' />
            </div>
            <div className=' flag'>
              <Image src={'/assets/qatar.png'} layout='fill' />
            </div>
          </div>
        </div>
      </section>
      <section ref={servicesRef} className="bg-white py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight 
        text-center text-gray-800">
            Choose a service
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 
          rounded-t"/>
          </div>
          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow 
        flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none 
          overflow-hidden">
              <a href="#" className="flex flex-wrap no-underline 
            hover:no-underline">
                <div className="w-full font-bold text-xl text-center 
              text-gray-800 px-6">
                  New Voter Registration
                </div>
                <p className="text-gray-800 text-center w-full text-base px-6 
              mb-5">
                  Book an appointment to register in person as a voter.
                </p>
              </a>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b 
          rounded-t-none overflow-hidden p-6">
              <div className="flex items-center justify-center">
                <button onClick={handleClick} className="mx-auto lg:mx-0 
              gradient text-white font-bold rounded-full my-6 py-4 
              px-8 shadow-lg focus:outline-none focus:shadow-outline 
              transform transition hover:scale-105 duration-300 ease-in-out">
                  Book
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow 
        flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none 
          overflow-hidden">
              <a href="#" className="flex flex-wrap no-underline 
            hover:no-underline">
                <div className="w-full font-bold text-xl text-center 
              text-gray-800 px-6">
                  Change of Voting Station
                </div>
                <p className="text-gray-800 text-center w-full text-base 
              px-6 mb-5">
                  Book an appointment to change your voting station.
                </p>
              </a>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b 
          rounded-t-none overflow-hidden p-6">
              <div className="flex items-center justify-center">
                <button onClick={handleClick} className="mx-auto lg:mx-0 
              gradient text-white font-bold rounded-full my-6 py-4 
              px-8 shadow-lg focus:outline-none focus:shadow-outline 
              transform transition hover:scale-105 duration-300 ease-in-out">
                  Book
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow 
        flex-shrink">
            <div className="flex-1 bg-white rounded-t rounded-b-none 
          overflow-hidden">
              <a href="#" className="flex flex-wrap no-underline 
            hover:no-underline">
                <div className="w-full font-bold text-xl text-center 
              text-gray-800 px-6">
                  Change of Voter Details
                </div>
                <p className="text-gray-800 text-base text-center w-full px-6 
              mb-5">
                  Book an appointment to update your voter details.
                </p>
              </a>
            </div>
            <div className="flex-none mt-auto bg-white rounded-b 
          rounded-t-none overflow-hidden p-6">
              <div className="flex items-center justify-center">
                <button onClick={handleClick} className="mx-auto lg:mx-0 
              gradient text-white font-bold rounded-full my-6 py-4 
              px-8 shadow-lg focus:outline-none focus:shadow-outline 
              transform transition hover:scale-105 duration-300 ease-in-out">
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
