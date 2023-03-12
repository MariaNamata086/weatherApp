import { useEffect, useState } from 'react'
import './App.css'
import { BsFillBrightnessHighFill,
  BsFillCloudDrizzleFill,BsFillCloudLightningFill, 
  BsEye,
  BsWater,
  BsWind,
  BsCloud,
  BsCloudHaze2Fill,
  BsFillCloudRainHeavyFill,
  BsCloudDrizzle,
  BsSnow2} from "react-icons/bs";
import {ImSpinner6} from "react-icons/im";
import {WiBarometer} from "react-icons/wi";
import {AiOutlineSearch} from "react-icons/ai";
import { Result } from 'postcss';
import{TbTemperatureCelsius,} from 'react-icons/Tb'
import moment from 'moment/moment';

function App() {

  const [location,setLocation] = useState('Kampala');
  const[value,setValue] = useState('');
  const [data,setData] = useState('');
  const [loading,setLoading] = useState(false);
  const [animate,setAnimate] = useState(false);
  const day = moment().format('dddd');
  const date = moment().format('MMMM Do YYYY, hh:mm:ss a');

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(value){
      setLocation(value);
      setValue('');
    }
  }
  const APIkey = '4f219044a9444898c2388cc8121eb890';
  
  useEffect(    
    ()=>{
      console.log('movies')
      (async()=>{
        try {
          console.log('food')
          setLoading(true);
         const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`)
         const weatherData = await response.json()
         console.log({weatherData});
         setData(weatherData)
                } catch (error) {
          console.log(error);
        }
        finally{setLoading(false)};
      })()
   
  } 
  )
 
  // useEffect(()=>{
   
  // },[animate]);

  if(!value){
    setAnimate(true);
    setTimeout(()=>{
      setAnimate(false)
    },500)
  };
  
   const object = {
    'Haze': <BsCloudHaze2Fill />,
    'Clouds': <BsCloud />,
    'Rain': <BsFillCloudRainHeavyFill />,
    'Thunderstorm': <BsFillCloudLightningFill/>,
    'Clear': <BsFillBrightnessHighFill />,
    'Drizzle': <BsCloudDrizzle/>,
    'Snow': <BsSnow2 />
   }
    let icon;
 

  return (
   <div className='container w-full mx-auto h-screen bg-cover flex flex-col items-center justify-center'>
    <form className={`${animate?'animate-shake':'animate-none'} max-w-[500px] bg-black/40 h-16 mb-3 rounded-full`}>
      <div className='flex flex-row items-center h-full p-3  gap-x-2'>
      <input type='text' value={value} onChange = {(event)=>setValue(event.currentTarget.value)} placeholder='Search by city or country' className=' bg-transparent focus:outline-none px-10'></input>
      <span className='text-white text-2xl p-2 px-4 bg-blue-500 hover:bg-blue-300 rounded-[16px]'onClick={(event)=>handleSubmit(event)}><AiOutlineSearch/></span>
      </div>   
     </form>

     {/* card */}
     <div className='w-full max-w-[500px] mx-auto bg-black/40 min-h-[500px] text-white backdrop-blur-[32] pt-6 py-15 px-8 rounded-[40px]'>
      {loading?(<div className='w-full h-full flex justify-center items-center'>
           <ImSpinner6 className='text-5xl text-white animate-spin'/>
        </div>):(        
        <div>
        {/* top div */}
      <div className='flex flex-row items-center gap-x-8 '>
        {/* <div className='text-9xl'>{object[data.weather[0].main]} </div> */}
       <div className='font-bold text-2xl '>{data.name},{data.sys.country}
       <div className='font-thin'>{day}<br/>{date}</div></div>
      </div>      
      {/* middle-div */}
      <div className='flex flex-col'>
      <div className=' flex flex-row items-center justify-center my-10'>
        <div className='text-[100px] leading-none'>
          {parseInt(data.main.temp)}
        </div>
        <div className='text-4xl'><TbTemperatureCelsius/>
        </div>
      </div>
      <div className='capitalize text-center space-y-5 '>
        {data.weather[0].description}
      </div>
      </div>
      {/*bottom div  */}
      <div className='flex flex-col space-y-8 '>
        <div className='flex items-center'>          
            <div className='flex flex-row max-width-1/2 gap-x-2  items-center flex-1'>
             <span className='font-bold '><BsEye/></span>
             <span>Visibility: {data.visibility/1000}km</span>
            </div>
            <div className='flex items-center gap-x-2'>
             <span><BsWind/></span>
              <span>wind: {data.wind.speed}m/s</span>
            </div>              
            </div>
          
        </div>
        <div className='flex items-center mt-8'>          
          <div className='flex  flex-row items-center gap-x-2 flex-1'>
           <span className='font-bold '><BsWater/></span>
           <span>Humidity:{data.main.humidity}%</span>         
          </div>          
          <div className='flex flex-row gap-x-2'>
            <span className='flex items-center gap-x-2'><WiBarometer/></span>
            <span>Pressure:{data.main.pressure}</span>
          </div>
         
        </div>
        </div>
      )}
    
      </div>

    </div>
   
   
      
  )
}

export default App
