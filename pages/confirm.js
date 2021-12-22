import { useEffect } from 'react';
import Image from 'next/image';
import { useRecoilValue } from "recoil";
//variables
import { formData } from '../atoms/formAtom';
import { addresses } from '../atoms/states';

export default function Confirm() {
  const formdata = useRecoilValue(formData);

  useEffect(() => {
    console.log(formdata)
  }, [formdata])

  return (
    <div className='confirm-page'>
      <div className='h-20 w-40 relative mx-auto'>
        {formdata?.country === 'uae' && <Image src={'/assets/uae.png'} layout='fill' />}
        {formdata?.country === 'uk' && <Image src={'/assets/uk.png'} layout='fill' />}
        {formdata?.country === 'us' && <Image src={'/assets/us.png'} layout='fill' />}
        {formdata?.country === 'can' && <Image src={'/assets/canada.png'} layout='fill' />}
        {formdata?.country === 'qat' && <Image src={'/assets/qatar.png'} layout='fill' />}
      </div>
      <p className='text-center text-lg mt-5'>Confirmation Page</p>
      {
        addresses && formdata?.loc && (
          <div className='mt-3'>
            <p className='text-center text-2xl font-bold uppercase text-blue-900'>{formdata.loc}</p>
            <p className='text-center text-lg font-bold uppercase text-blue-900 mt-3'>{addresses[formdata.loc]?.street}</p>
            <p className='text-center text-lg font-bold uppercase text-blue-900'>{addresses[formdata.loc]?.state}</p>
            <p className='text-center text-lg font-bold uppercase text-blue-900'>{addresses[formdata.loc]?.phone}</p>
          </div>
        )
      }
      <p className='text-blue-900 font-bold text-sm'>Booked for</p>
      <p>{formdata?.firstName} {formdata?.surName}</p>
      <p className='text-blue-900 font-bold text-sm'>Date & Time</p>
      <p>{new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(formdata?.appDate)}, {formdata?.appTime}.</p>
      <p className='text-blue-900 font-bold text-sm'>Service Booked</p>
      {formdata?.service === 'new' && <p>New Voter Registration</p>}
      {formdata?.service === 'station' && <p>Change of Voting Station</p>}
      {formdata?.service === 'details' && <p>Change of Voter Details</p>}
      {formdata.qr &&
        <div className='mt-10 h-20 w-20 flex justify-center mx-auto'>
          {<img src={formdata.qr} />}
        </div>
      }
      <p className='text-center mt-3 text-xs'>Thank you. See you on {new Intl.DateTimeFormat('en-US').format(formdata?.appDate)}.
        <span className='text-green-500'> YOUR<span className='font-bold'>VOTE</span>YOUR<span className='font-bold'>FUTURE</span></span></p>
    </div>
  )
}
