import { CopySVG } from "./CopySVG";
import { copyTextToClipboard } from "./copyTextToClipboard";



export const CodeBlock = ({ text }: { text: string; }) => {

    return (
        <div className="justify-center my-2 flex-col gap-4">
            <div onClick={() => copyTextToClipboard(text)}  className="cursor-pointer flex items-center gap-3 justify-between text-white bg-gray-900 w-fit font-mono text-sm py-3 px-4 rounded-md">
                <div className="flex gap-1">
                    <span>$</span>
                    <span>{text}</span>
                </div>
                <span className="flex text-white  w-5 h-5 hover:text-gray-400 duration-200">
                    <CopySVG />
                </span>
            </div>
        </div>

    );
};
