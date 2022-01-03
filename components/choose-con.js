import { useEffect,forwardRef } from 'react'
import { useRecoilState } from "recoil";
import Image from 'next/image';
import { formData } from '../atoms/formAtom';

const ChooseCountry = forwardRef(({ onBackClick }, ref) => {
  const [formdata, setFormData] = useRecoilState(formData);

  const handleCntryClick = country => {
    setFormData({ ...formdata, country });
  }

  useEffect(() => {
    let timer1;
    if (formdata?.country?.length > 0) {
      timer1 = setInterval(() => onBackClick(), 300);
    }

    return () => {
      clearTimeout(timer1);
    };
  }, [formdata]);

  return (
    <>
      <section ref={ref} className="bg-white py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight 
          text-center text-gray-800">
            Choose Country
          </h1>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 
            rounded-t"/>
          </div>
          <div className='w-full px-20 flex flex-wrap justify-around'>
            <div className='flex flex-col text-gray-800 text-center'
              onClick={() => handleCntryClick('uae')}
            >
              <div className={`flag ${formdata?.country === 'uae' && 'selected'}`}>
                <Image src={'/assets/uae.png'} layout='fill' />
              </div>
              <p className='text-lg mt-2 font-medium'>United Arab Emirates</p>
            </div>
            <div className='flex flex-col text-gray-800 text-center'
              onClick={() => handleCntryClick('uk')}
            >
              <div className={`flag ${formdata?.country === 'uk' && 'selected'}`}>
                <Image src={'/assets/uk.png'} layout='fill' />
              </div>
              <p className='text-lg mt-2 font-medium'>United Kingdom</p>
            </div>
            <div className='flex flex-col text-gray-800 text-center'
              onClick={() => handleCntryClick('us')}
            >
              <div className={`flag ${formdata?.country === 'us' && 'selected'}`}>
                <Image src={'/assets/us.png'} layout='fill' />
              </div>
              <p className='text-lg mt-2 font-medium'>United States of America</p>
            </div>
            <div className='flex flex-col text-gray-800 text-center'
              onClick={() => handleCntryClick('can')}
            >
              <div className={`flag ${formdata?.country === 'can' && 'selected'}`}>
                <Image src={'/assets/canada.png'} layout='fill' />
              </div>
              <p className='text-lg mt-2 font-medium'>Canada</p>
            </div>
            <div className='flex flex-col text-gray-800 text-center'
              onClick={() => handleCntryClick('qat')}
            >
              <div className={`flag ${formdata?.country === 'qat' && 'selected'}`}>
                <Image src={'/assets/qatar.png'} layout='fill' />
              </div>
              <p className='text-lg mt-2 font-medium'>Qatar</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
});

export default ChooseCountry;
