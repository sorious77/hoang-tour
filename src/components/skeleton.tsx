import {cn} from "@/lib/utils";
import {useState} from "react";

const SkeletonImage = ({skeletonClassName, imgClassName, src, alt}: { skeletonClassName: string, imgClassName: string, src: string, alt: string }) => {
    const [isLoaded, setIsLoaded] = useState(false)

    return <>{
        !isLoaded &&
        <div className={cn(skeletonClassName, "bg-gray-300 rounded-lg border-white")}>
        </div>
    }
        <img src={src} alt={alt} onLoad={() => setIsLoaded(true)}
            className={cn(imgClassName, isLoaded ? "block" : "hidden")}
        />
    </>
}

export {SkeletonImage}