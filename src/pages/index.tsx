import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const Component = () => {
    return (
        <>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Discover the City with Hoang Tour
            </h1>
            <p className="text-gray-500 max-w-[600px]">
                Explore the most breathtaking destinations and create
                unforgettable memories with our curated tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-[500px]">
                <Input
                    className="flex-1"
                    placeholder="Search tours, destinations..."
                    type="text"
                />
                <Button>Find Tours</Button>
            </div>
        </>
    )
};

export default Component;
