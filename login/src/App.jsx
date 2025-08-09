import { useState, useEffect } from 'react';
import './App.css'
import Loginimg from '../src/assets/login.png'
import Loginimg2 from '../src/assets/mahan web.png' 
import Loginimg3 from '../src/assets/24.png' 
import Logo from '../src/assets/mahan web.png'
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function IconButton({ children, text, iconColor, ...props }) {
  return (
    <button {...props} className="text-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]  text-stone-400 flex justify-center items-center gap-x-2 w-full py-3 rounded-sm transition duration-600 bg-[#fcfcfc]   hover:bg-[#bcd7ff] hover:text-[#111111]">
      {children}
      <div className="font-semibold text-base text-black" style={{ color: iconColor }}>
        {text}
      </div>
    </button>
  );
}

function IconInput({ children, placeholder, type, value, onChange, togglePassword, showPassword }) {
  return (
    <div className="flex justify-start items-center w-full relative h-12 mt-4 rounded-md">
      <div className="icon__wrapper w-14 absolute flex justify-center items-center">
        <span className='text-xl opacity-80 text-gray-800'>{children}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-14 w-full h-full outline-none border-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      />
      {togglePassword && (
        <div className="absolute right-4 cursor-pointer text-gray-600" onClick={togglePassword}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </div>
      )}
    </div>
  );
}

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fadeProp, setFadeProp] = useState('fade-in');

  const images = [Loginimg, Loginimg2, Loginimg3];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeProp('fade-out');  // شروع fade out
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        setFadeProp('fade-in'); // شروع fade in
      }, 500); // مدت زمان انیمیشن باید با CSS یکی باشد
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const validateForm = () => {
    const errors = [];
    if (!email || !password) {
      errors.push('Please fill all fields');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      errors.push('Email format is not valid');
    }
    if (password && password.length < 8) {
      errors.push('The Password must have 8 characters');
    }

    setError(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('The Login was successful✅');
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-50 p-4">
      <div className="form container overflow-hidden rounded-2xl flex flex-col lg:flex-row justify-between w-full max-w-screen-xl shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">

        {/* form left section */}
        <div className="form-section w-full lg:w-1/2 px-[20px] sm:px-[35px] py-8">
          <div className="logo-wrap flex w-1/4 sm:w-1/12 justify-start gap-x-1 items-center mb-4">
            <img src={Logo} alt="Logo" className="max-w-full h-auto" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold opacity-80 text-neutral-500">Login form</h2>
          <p className="text-black opacity-90 mt-3 text-sm sm:text-base">Welcome Back Select method log in</p>

          <div className="mt-4 flex flex-col sm:flex-row px-0 sm:px-4 gap-2">
            <IconButton text="Google">
              <FcGoogle />
            </IconButton>
            <IconButton text="Facebook" iconColor="#000000">
              <FaFacebook />
            </IconButton>
          </div>

          <span className='block text-center opacity-70 mt-6 mb-10 text-gray-800 text-sm sm:text-base'>
            Or continue with Email
          </span>

          <IconInput
            placeholder="E-mail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <MdOutlineMailOutline />
          </IconInput>

          <IconInput
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            togglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
          >
            <RiLockPasswordFill />
          </IconInput>

          {error.length > 0 && (
            <div className="mt-2">
              {error.map((errMsg, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {errMsg}
                </p>
              ))}
            </div>
          )}

          <div className='flex flex-col sm:flex-row justify-between items-center mt-3 gap-2'>
            <div className='item flex items-center'>
              <input type="checkbox" className='outline-none' />
              <span className='text-neutral-600 ml-1 text-sm'>Remember Me</span>
            </div>
            <div className='item'>
              <a href="#" className='text-blue-600 outline-none text-sm hover:underline'>forgot Password</a>
            </div>
          </div>

          <p className='flex flex-wrap justify-center items-center mt-8 text-neutral-600 text-sm'>
            Dont Have An Account ? 
            <a href="#" className='gap-3 text-blue-500 ml-2 hover:underline'> create an account</a>
          </p>

          <div onClick={handleSubmit} className='flex w-full justify-center items-center mt-5 bg-blue-600 rounded-lg py-3 transition duration-600  hover:bg-[#101010]'>
            <button className='text-white text-sm sm:text-base '>sign in</button>
          </div>
        </div>

        {/* image section */}
        <div className="illustration-section rounded-2xl w-full lg:w-1/2 bg-blue-500 flex flex-col justify-center items-center p-6">
          <div className="illu-wrap mb-6 max-w-xs sm:max-w-sm">
            <img
              src={images[activeIndex]}
              alt={`Login ${activeIndex + 1}`}
              className={`w-full h-auto transition-opacity duration-500 ${fadeProp === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>
          <div className="button-sec-wrap text-center">
            <h2 className="text-center text-white text-lg sm:text-2xl font-bold mb-1">
              Connect with every application
            </h2>
            <p className="text-center text-white mb-8 text-sm sm:text-base">
              everything you need in an easily customizable dashboard
            </p>
          </div>
          <div className="dots flex justify-center items-center gap-x-3 mb-3 transition duration-800">
            {images.map((_, index) => (
              <div
                key={index}
                onClick={() => {
                  setFadeProp('fade-out');
                  setTimeout(() => {
                    setActiveIndex(index);
                    setFadeProp('fade-in');
                  }, 500);
                }}
                className={`dot w-2 h-2 transition duration-800 rounded-full cursor-pointer ${index === activeIndex ? 'bg-white' : 'bg-gray-400'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
