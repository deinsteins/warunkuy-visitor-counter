import dayjs from 'dayjs';
import { BrowserView, MobileOnlyView } from 'react-device-detect';

const AppBar = () => {
    const currentTime = dayjs().format('HH:mm');
    const customDate = dayjs('2023-09-02'); 
    const formattedDate = customDate.format('D MMMM YYYY');
    const currentHour = dayjs().hour();
    const currentMinute = dayjs().format('mm');;

    return (
        <>
        <BrowserView>    
            <div className="flex text-4xl gap-8 justify-between">
                <div className="flex flex-1 px-4 py-4 border-black border-2 rounded-lg shadow-lg justify-center">
                    <h2 className='text-center'>{currentTime}</h2>
                </div>
                <div className="flex flex-1 px-24 py-4 font-bold border-black border-2 rounded-lg shadow-lg">
                    <marquee behavior="" direction="">WARUNKUY</marquee>
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
        </MobileOnlyView>
        </>
    )
}

export default AppBar;