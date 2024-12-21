import React, {useEffect, useState} from "react";

const Page = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (images.length > 6) {
            setImages(prev => prev.slice(0, 6))
            alert("사진은 최대 6장까지 업로드 가능합니다.");
        }
    }, [images]);

    const handleFileUpload = (e: React.ChangeEvent) => {
        const targetFiles = (e.target as HTMLInputElement).files as FileList;
        const targetFilesArray = Array.from(targetFiles);
        const selectedFiles: string[] = targetFilesArray.map((file) => {
            return URL.createObjectURL(file);
        })

        setImages((prev) => prev.concat(selectedFiles));
    }

    const handleFileRemove = (targetUrl: string) => {
        setImages(prev => prev.filter((url) => url !== targetUrl));
    }

    return <div className="flex flex-col w-full pb-10">
        {/* 제목, 방문 날짜, 내용, 이미지 6장까지 */}
        <form className="w-full flex gap-5 flex-col">
            <input id="title" className="border-b border-gray-200 px-4 py-1.5 w-full text-3xl focus:outline-none"
                   type="text" name="제목"
                   placeholder="제목"/>
            <div className="flex flex-col gap-1 items-start w-full">
                <textarea id="introduction"
                          className="border border-gray-200 rounded-lg px-4 py-1.5 w-full resize-none focus:outline-none"
                          placeholder="내용을 입력하세요."
                          rows={20}/>
            </div>
            <div>
                <div className="grid grid-cols-3 gap-3 mb-10">
                    {images.map((url, i) => (
                        <div key={url} className="relative">
                            <img key={url} src={url} className="shadow rounded h-96 w-96" alt={`image${i}`}/>
                            <div
                                onClick={() => handleFileRemove(url)}
                                className="absolute -right-2 -top-2 bg-gray-200 text-black cursor-pointer rounded-full w-6 h-6 flex justify-center items-center">X
                            </div>
                        </div>
                    ))}
                </div>
                <label htmlFor="file"
                       className={`border border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-5 py-4 rounded-xl hover:cursor-pointer
                       ${images.length >= 6 && "border-none bg-gray-400 text-white hover:bg-gray-400 hover:cursor-not-allowed"}`}>사진을
                    추가해주세요</label>
                <input className="absolute w-0 h-0 overflow-hidden border-none" type="file" id="file"
                       multiple={true}
                       disabled={images.length >= 6}
                       accept="image/*" onChange={handleFileUpload}/>
            </div>
        </form>
    </div>
}

export default Page;