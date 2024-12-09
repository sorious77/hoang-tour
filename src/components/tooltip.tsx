import * as Tooltip from "@radix-ui/react-tooltip";
import {InfoCircledIcon} from "@radix-ui/react-icons";

const TooltipComponent = ({message}: { message: string }) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <button className="IconButton">
                        <InfoCircledIcon/>
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="border border-gray-50 rounded-lg bg-white py-2 px-4 text-xs"
                                     align="start">
                        {message}
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default TooltipComponent;