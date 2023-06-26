import { toast } from "react-toastify";



export const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(function () {
        toast.success('Copied to clipboard');
    }).catch(function () {
        toast.error('Failed to copy to clipboard');
    });
};
