import React, { useEffect, useState } from 'react';
import { infoform, formData } from '../atoms/formAtom';
import { useRecoilState } from "recoil";
import Calendar from 'react-calendar';
import { times } from '../atoms/times';
import QRCode from 'qrcode';
import { db, storage } from '../firebase';
import { doc, collection, addDoc, updateDoc, serverTimestamp } from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { locations } from '../atoms/states';
import SelectDropdown from '../components/selectdropdown';

export default function Calender() {
  const router = useRouter();
  const [complete, setComplete] = useRecoilState(infoform);
  const [formdata, setFormData] = useRecoilState(formData);

  const [loc, setLoc] = useState('');
  const [appDate, setAppDate] = useState(new Date());
  const [appTime, setAppTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [locMap, setLocMap] = useState(['']);

  const change = (type, event, setFunction, maxValue) => {
    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          setFunction({
            data: event.target.value, state: 'success'
          })
        } else {
          setFunction({
            data: event.target.value, state: 'error'
          })
        }
        break;
      case "length":
        if (verifyLength(event.target.value, maxValue)) {
          setFunction({
            data: event.target.value, state: 'success'
          })
        } else {
          setFunction({
            data: event.target.value, state: 'error'
          })
        }
        break;
      case "number":
        if (verifyNumber(event.target.value, maxValue)) {
          setFunction({
            data: event.target.value, state: 'success'
          })
        } else {
          setFunction({
            data: event.target.value, state: 'error'
          })
        }
        break;
      case "select":
        setFunction(event.value)
        break;
      default:
        break;
    }
  };

  const handleData = (e) => {
    e.preventDefault();
    uploadPost();
  };

  const successAlert = () => {
    Swal.fire({
      icon: 'success',
      title: 'Appointment Scheduled',
      text: 'Your appointment has been scheduled. You will recieve an email confirmation',
      showConfirmButton: true,
      confirmButtonColor: '#22c55e',
    })
      .then((result) => {
        if (result.isConfirmed) {
          setComplete('complete')
          router.push('/confirm')
        }
      })
  }

  const errorAlert = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
  }

  const uploadPost = async () => {
    let obj = {
      appTime,
      appDate,
      loc
    }
    if (loading) return;
    setLoading(true);
    // 1) Create a post and add to firestore 'user id' collection
    // 2) get the post ID for the newly created post
    // 3) upload the image to firebase storage with the user id
    // 4) get a down load URL from fb storage and update the
    const docRef = await addDoc(collection(db, `appointments/${loc}/${appDate}`), {
      time: appTime,
      user: 'temp',
      timestamp: serverTimestamp()
    })

    const qrRef = ref(storage, 'temp' + '/' + docRef.id + '/qr');
    // With promises
    QRCode.toDataURL(`State: ${loc} date:${appDate} time:${appTime} appID:${docRef.id} user:temp`)
      .then(async (url) => {
        await uploadString(qrRef, url, "data_url").then(async snapshot => {
          const downloadURL = await getDownloadURL(qrRef);

          if (downloadURL) obj.qr = downloadURL;
          setFormData({ ...formdata, ...obj });
          await updateDoc(doc(db, `appointments/${loc}/${appDate}`, docRef.id), {
            qr: downloadURL
          })
        });
      })
      .catch(err => {
        errorAlert();
      })

    setLoading(false);
    successAlert();
  }

  useEffect(() => {
    if (locMap.length && !loc)
      setLoc(locMap[0])
    //console.log(complete)
  }, [locMap])

  useEffect(() => {
    if (formdata.country)
      setLocMap(locations[formdata.country])
    //console.log(complete)
  }, [formdata])

  return (
    <>
      <div className='calender-page'>
        <div className="w-full max-w-lg mx-auto">
          <h1 className="section-title">Make Appointment</h1>
          <div className="section-divider" />
        </div>
        <form className="w-full max-w-lg mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-state">
                Choose Convenient Location
              </label>
              <div className="relative">
                {
                  locMap.length > 0 && (
                    <SelectDropdown value={loc} list={locMap} change={change} setFunc={setLoc}/>
                  )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-state">
                Pick a date
              </label>
              <div className="relative">
                <Calendar
                  className='calender'
                  onChange={setAppDate}
                  value={appDate}
                  view='month'
                  minDate={new Date()}
                  defaultValue={new Date()}
                  tileClassName='tile'
                //tileContent={	({ date, view }) => <CalenderTile date={date}/>}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-state">
                Pick a time
              </label>
              <div className='times-container'>
                {
                  times && times.map((t, i) => (
                    <div key={i} className={`time-container ${appTime === t && 'selected'}`}
                      onClick={() => setAppTime(t)}
                    >
                      {t}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className='flex flex-wrap -mx-3 mb-6 w-full items-center justify-center'>
            <button className={`mx-auto lg:mx-0 text-white 
          font-bold rounded-full my-6 py-4 px-8 shadow-lg 
          focus:outline-none focus:shadow-outline transform transition 
          hover:scale-105 duration-300 ease-in-out
          gradient`}
              type='submit'
              onClick={handleData}
            >
              {loading ? '..Loading' : 'Complete'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
