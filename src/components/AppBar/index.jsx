import dayjs from 'dayjs';
import { useState } from 'react';
import { useEffect } from 'react';
import { BrowserView, MobileOnlyView } from 'react-device-detect';

const AppBar = () => {
    const currentTime = dayjs().format('HH:mm');
    const customDate = dayjs(); 
    const formattedDate = customDate.format('D MMMM YYYY');
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().format('mm');;

    const [timer, setTimer] = useState(null); // State to hold the timer
    const [startTime, setStartTime] = useState(null); // State to hold the start time
    const [elapsedTime, setElapsedTime] = useState(0); // State to hold the elapsed time
    const [isTimerRunning, setIsTimerRunning] = useState(false); // State to track if the timer is running
  
    const startTimer = () => {
      const start = Date.now() - elapsedTime;
      setStartTime(start);
      setTimer(
        setInterval(() => {
          const now = Date.now();
          setElapsedTime(now - start);
        }, 1000)
      );
      setIsTimerRunning(true);
    };
  
    const stopTimer = () => {
      clearInterval(timer);
      setIsTimerRunning(false);
    };
  
    useEffect(() => {
      return () => {
        // Cleanup: Stop the timer when the component unmounts
        clearInterval(timer);
      };
    }, [timer]);
  
    useEffect(() => {
      if (isTimerRunning) {
        startTimer(); // Start the timer when isTimerRunning is true
      } else {
        stopTimer(); // Stop the timer when isTimerRunning is false
      }
  
      return () => {
        // Cleanup: Stop the timer when the component unmounts
        stopTimer();
      };
    }, [isTimerRunning]);
  
    const formatTime = (milliseconds) => {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
  
      const displaySeconds = seconds % 60;
      const displayMinutes = minutes % 60;
      const displayHours = hours % 60;
  
      return `${displayHours.toString().padStart(2, "0")}:${displayMinutes
        .toString()
        .padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}`;
    };

    return (
        <>
        <BrowserView>    
            <div className="flex text-4xl gap-8 justify-between">
                <div className="flex flex-1 px-4 py-4 border-black border-2 rounded-lg shadow-lg justify-center">
                    <h2 className='text-center'>{currentTime}</h2>
                </div>
                <div className="flex flex-1 flex-col gap-2 px-24 py-4 font-bold border-black border-2 rounded-lg shadow-lg">
                    <marquee behavior="" direction="">WARUNKUY</marquee>
                    <div className='flex flex-col gap-4 font-normal text-sm text-center'>
                        <p>Lama Sistem Berjalan: {formatTime(elapsedTime)}</p>
                        <div className='flex gap-4 mx-auto'>
                            {!isTimerRunning?
                                <button className='bg-blue-500 p-1 px-2 rounded text-white' onClick={startTimer}>Start Timer</button>
                                :
                                <button className='bg-red-500 p-1 px-2 rounded text-white' onClick={stopTimer}>Stop Timer</button>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 px-4 py-4 border-black border-2 rounded-lg shadow-lg justify-center">
                    <h2>{formattedDate}</h2>
                </div>
            </div>
        </BrowserView>
        <MobileOnlyView>
            <div className="flex gap-4 justify-between">
                <div className="flex flex-col p-2 border-black border-2 rounded-xl shadow-lg justify-center font-bold text-4xl">
                    <h2 className='text-center'>{currentHour}</h2>
                    <h2 className='text-center'>{currentMinute}</h2>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-2 border-black border-2 rounded-xl shadow-lg justify-center">
                    <h1 className='text-4xl text-center font-bold'>WARUNKUY</h1>
                    <hr className='bg-[#3F3F3F] h-2 rounded-xl' />
                    <h2 className='text-center font-semibold text-xl'>{formattedDate}</h2>
                </div>
            </div>
            <div className='flex flex-col gap-4 font-normal text-sm text-center border-black border-2 py-4 mt-4'>
                <p>Lama Sistem Berjalan: {formatTime(elapsedTime)}</p>
                <div className='flex gap-4 mx-auto'>
                    {!isTimerRunning?
                        <button className='bg-blue-500 p-1 px-2 rounded text-white' onClick={startTimer}>Start Timer</button>
                        :
                        <button className='bg-red-500 p-1 px-2 rounded text-white' onClick={stopTimer}>Stop Timer</button>
                    }
                </div>
                </div>
        </MobileOnlyView>
        </>
    )
}

export default AppBar;