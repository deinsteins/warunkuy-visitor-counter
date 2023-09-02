import { BiUserCircle } from 'react-icons/bi';

const Card = ({ count, title, variant }) => {
    return (
        <div className="flex justify-center flex-1 px-6 py-2 border-black border-2 rounded-lg shadow-xl">
            <div className="flex gap-8">
                <BiUserCircle size={200} />
                <div className="flex flex-col justify-center text-4xl font-semibold gap-4">
                    <span className=''>{title}</span>
                    <span className='text-7xl text-center' style={variant == 'success'?{color: '#FF3023'} : {color: '#12FF29'}}>{count}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;