import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { useRouter } from 'next/router';
import { formData, infoform } from '../atoms/formAtom';
import { states } from '../atoms/states';

export default function InfoForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState({
    data: null, state: null
  });
  const [surName, setSurName] = useState({
    data: null, state: null
  });
  const [email, setEmail] = useState({
    data: null, state: null
  });
  const [phone, setPhone] = useState({
    data: null, state: null
  });
  const [passport, setPassport] = useState({
    data: null, state: null
  });
  const [expiry, setExpiry] = useState({
    data: null, state: null
  });
  const [loc, setLoc] = useState({
    data: 'AL, Alabama', state: 'success'
  });
  const [done, setDone] = useState(false);
  const [complete, setComplete] = useRecoilState(infoform);
  const [formdata, setFormData] = useRecoilState(formData);

  // function that returns true if value is email, false otherwise
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if value contains only numbers
  const verifyNumber = value => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };

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

  const isValidated = () => {
    if (
      firstName.state === "success" &&
      surName.state === "success" &&
      email.state === "success" &&
      phone.state === "success" &&
      passport.state === "success" &&
      expiry.state === "success" &&
      loc.state === "success"
    ) {
      return true;
    } else {
      if (firstName.state !== "success") {
        setFirstName({ ...firstName, state: 'error' });
      }
      if (surName.state !== "success") {
        setSurName({ ...surName, state: 'error' });
      }
      if (email.state !== "success") {
        setEmail({ ...email, state: 'error' });
      }
      if (phone.state !== "success") {
        setPhone({ ...phone, state: 'error' });
      }
      if (passport.state !== "success") {
        setPassport({ ...passport, state: 'error' });
      }
      if (expiry.state !== "success") {
        setExpiry({ ...expiry, state: 'error' });
      }
      if (loc.state !== "success") {
        setLoc({ ...loc, state: 'error' });
      }
      return false;
    }
  };

  const handleData = (e) => {
    e.preventDefault();
    if (isValidated) {
      let obj = {
        firstName: firstName.data,
        surName: surName.data,
        email: email.data,
        phone: phone.data,
        passport: passport.data,
        expiry: expiry.data,
        state: loc.data
      }
      setFormData({...formdata, obj});
      setComplete('info');
      router.push('/calender');
    };
  };

  useEffect(() => {
    if (
      firstName.state === "success" &&
      surName.state === "success" &&
      email.state === "success" &&
      phone.state === "success" &&
      passport.state === "success" &&
      expiry.state === "success" &&
      loc.state === "success"
    ) {
      setDone(true);
    }
  }, [firstName, surName, email, phone, passport, expiry, loc]);
  return (
    <>
      <div className='infoform-page'>
        <div>
          <h1 className="section-title">Personal Information</h1>
          <div className="section-divider" />
        </div>
        <form className="w-full max-w-lg mx-auto">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-first-name">
                First Name
              </label>
              <input className={`appearance-none block w-full bg-gray-200 
            text-gray-700 border rounded py-3 px-4 mb-3 leading-tight 
            focus:outline-none focus:border-gray-300 focus:bg-white
            ${!firstName.state && 'border-gray-500'}
            ${firstName.state === 'success' ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500'}`}
                id="grid-first-name"
                type="text"
                placeholder="Jane"
                onChange={e => change("length", e, setFirstName, 1)}
              />
              {firstName.state === 'error' && <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide
            text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Surname
              </label>
              <input className={`appearance-none block w-full bg-gray-200 
            text-gray-700 border rounded py-3 px-4 
            mb-3 leading-tight focus:outline-none focus:border-gray-300 
            focus:bg-white
            ${!surName.state && 'border-gray-500'}
            ${surName.state === 'success' ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500'}`}
                id="grid-last-name"
                type="text"
                placeholder="Doe"
                onChange={e => change("length", e, setSurName, 1)}
              />
              {surName.state === 'error' && <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-first-name">
                Email
              </label>
              <input className={`appearance-none block w-full bg-gray-200 
            text-gray-700 border rounded py-3 px-4 
            mb-3 leading-tight focus:outline-none focus:border-gray-300 
            focus:bg-white
            ${!email.state && 'border-gray-500'}
            ${email.state === 'success' ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500'}`}
                id="grid-first-name"
                type="email"
                placeholder="janedoe@gmail.com"
                onChange={e => change("email", e, setEmail, 1)}
              />
              {email.state === 'error' && <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide
            text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Phone Number
              </label>
              <input className={`appearance-none block w-full bg-gray-200 
            text-gray-700 border rounded py-3 px-4 
            mb-3 leading-tight focus:outline-none focus:border-gray-300 
            focus:bg-white
            ${!phone.state && 'border-gray-500'}
            ${phone.state === 'success' ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500'}`}
                id="grid-last-name"
                type="text"
                placeholder="254712345678"
                onChange={e => change("number", e, setPhone, 1)}
              />
              {phone.state === 'error' && <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-first-name">
                Passport Number
              </label>
              <input className={`appearance-none block w-full bg-gray-200 
            text-gray-700 border rounded py-3 px-4 
            mb-3 leading-tight focus:outline-none focus:border-gray-300 
            focus:bg-white
            ${!passport.state && 'border-gray-500'}
            ${passport.state === 'success' ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500'}`}
                id="grid-first-name"
                type="text"
                placeholder="A123456"
                onChange={e => change("length", e, setPassport, 1)}
              />
              {passport.state === 'error' && <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide
            text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                Expiry Date
              </label>
              <input className={`appearance-none block w-full bg-gray-200 
            text-gray-700 border rounded py-3 px-4 
            mb-3 leading-tight focus:outline-none focus:border-gray-300 
            focus:bg-white
            ${!expiry.state && 'border-gray-500'}
            ${expiry.state === 'success' ? 'border-green-500 focus:border-green-500' : 'border-red-500 focus:border-red-500'}`}
                id="grid-last-name"
                type="text"
                placeholder="12/2021"
                onChange={e => change("length", e, setExpiry, 1)}
              />
              {
                expiry.state === 'error' && <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 
            text-xs font-bold mb-2" htmlFor="grid-state">
                State
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
                    states && states.map((s, i) => (
                      <option key={i}>{s}</option>
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
          <div className='flex flex-wrap -mx-3 mb-6 w-full items-center justify-center'>
            <button className={`mx-auto lg:mx-0 text-white 
          font-bold rounded-full my-6 py-4 px-8 shadow-lg 
          focus:outline-none focus:shadow-outline transform transition 
          hover:scale-105 duration-300 ease-in-out
          ${done ? 'gradient' : 'bg-gray-400'}`}
              type='submit'
              onClick={handleData}
            >
              Next
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
