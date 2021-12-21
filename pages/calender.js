import React, { useEffect, useState } from 'react';
import { infoform, formData } from '../atoms/formAtom';
import { useRecoilState } from "recoil";
import Calendar from 'react-calendar';
import CalenderTile from '../components/calenderTile';
import { times } from '../atoms/times';
import QRCode from 'qrcode';
import { db, storage } from '../firebase';
import { doc, collection, addDoc, updateDoc, serverTimestamp } from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { locations } from '../atoms/states';

export default function Calender() {
  const router = useRouter();
  const [complete, setComplete] = useRecoilState(infoform);
  const [formdata, setFormData] = useRecoilState(formData);

  const [loc, setLoc] = useState('DC, District Of Columbia');
  const [appDate, setAppDate] = useState(new Date());
  const [appTime, setAppTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [locMap, setLocMap] = useState([]);

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
        setFunction({
          data: event.target.value, state: 'success'
        })
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
      position: 'center',
      icon: 'success',
      title: 'Success',
      text: 'Your appointment has been scheduled. You will recieve an email confirmation',
      showConfirmButton: true,
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

    successAlert();

    const qrRef = ref(storage, 'temp' + '/' + docRef.id + '/qr');
    // With promises
    QRCode.toDataURL(`State: ${loc} date:${appDate} time:${appTime} appID:${docRef.id} user:temp`)
      .then(async (url) => {
        await uploadString(qrRef, url, "data_url").then(async snapshot => {
          const downloadURL = await getDownloadURL(qrRef);

          await updateDoc(doc(db, `appointments/${loc}/${appDate}`, docRef.id), {
            qr: downloadURL
          })
        });
      })
      .catch(err => {
        errorAlert();
      })

    setLoading(false);
  }

  useEffect(() => {
    if(formdata.country)
      setLocMap(locations[formdata.country])
    //console.log(complete)
  }, [formdata])

  return (
    <>
      <div className='calender-page'>
        <div className="w-full max-w-lg mx-auto">
          <h1 className="section-title">Appointment Information</h1>
          <div className="section-divider" />
        </div>
        <form className="w-full max-w-lg mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-state">
                Choose the most convinient location
              </label>
              <div className="relative">
                <select className="block appearance-none w-full bg-gray-200 
              border border-gray-200 text-gray-700 py-3 px-4 pr-8 
              rounded leading-tight focus:outline-none focus:bg-white 
              focus:border-gray-500"
                  value={loc.data}
                  id="grid-state"
                  onChange={e => change("select", e, setLoc)}
                >
                  {
                    locMap && locMap.map((l,i)=>(
                      <option key={i}>{l}</option>
                    )) 
                  }
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 
              flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 
                  6.586 4.343 8z" />
                  </svg>
                </div>
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
      {
        //Change the colour #f8fafc to match the previous section colour
      }
      <svg className="wave-top" viewBox="0 0 1439 147" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-1.000000, -14.000000)" fillRule="nonzero">
            <g className="wave" fill="#f8fafc">
              <path
                d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"
              ></path>
            </g>
            <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
              <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                <path d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496" opacity="0.100000001"></path>
                <path
                  d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                  opacity="0.100000001"
                ></path>
                <path d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z" opacity="0.200000003"></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  )
}
