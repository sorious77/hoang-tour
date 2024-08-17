const HorizonLine = ({text}: { text?: string }) => {
    return <div className="w-full text-center border-b border-b-gray-300 leading-3">
        {text && <span className="bg-white px-4"></span>}
    </div>
}

export default HorizonLine;