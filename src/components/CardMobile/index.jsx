import { BiUserCircle } from 'react-icons/bi';

const CardMobile = ({ insideCount, outCount }) => {
    return (
        <div className="flex justify-center w-full border-black border-2 rounded-lg shadow-xl mx-auto">
            <div className="flex justify-center gap-4 p-4 font-semibold text-xl">
                <div className='flex flex-col gap-2 justify-center'>
                <span className='text-5xl text-center text-[#12FF29]'>{insideCount}</span>
                <span className=''>SAAT INI</span>
                </div>
                <BiUserCircle size={100} />
                <div className='flex flex-col gap-2 justify-center'>
                <span className='text-5xl text-center text-[#FF3023]'>{outCount}</span>
                <span className=''>KELUAR</span>
                </div>
            </div>
        </div>
    )
}

export default CardMobile;