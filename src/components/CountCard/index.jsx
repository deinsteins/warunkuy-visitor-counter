const CountCard = ({ title, count }) => {
    return (
        <div className="flex text-black font-bold gap-4 border-[#3F3F3F] border-2 text-3xl sm:rounded-lg rounded-3xl shadow-xl justify-between">
            <div className="p-4 text-xl sm:text-5xl">
                <span>{title}</span>
            </div>
            <div className="bg-[#3F3F3F] text-white p-4 sm:rounded-lg rounded-2xl text-2xl sm:text-5xl min-w-[10rem] text-center">
                <span>{count}</span>
            </div>
        </div>
    )
}

export default CountCard;