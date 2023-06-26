import { CopySVG } from "./CopySVG";
import { copyTextToClipboard } from "./copyTextToClipboard";



export const CodeBlockInline = ({ text, fullText }: { fullText?: string, text: string; }) => {
    return (
        <div onClick={() => copyTextToClipboard(fullText??text)}  className="cursor-pointer font-mono flex w-fit gap-2 justify-center items-center bg-gray-100 border border-gray-300 text-red-600 px-1 py-1 rounded">
            <div>
                {text}
            </div>
            <div className="w-4 h-4 hover:text-gray-400 duration-200">
                <CopySVG />
            </div>
        </div>
    );
};
