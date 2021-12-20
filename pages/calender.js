import React, { useEffect } from 'react';
import { formData } from '../atoms/formAtom';
import { useRecoilState } from "recoil";

export default function Calender() {
  const [formdata, setFormData] = useRecoilState(formData);

  useEffect(()=>{
    console.log(formdata)
  },[])

  return (
    <div>
      
    </div>
  )
}
