import { MouseEventHandler } from "react";



export const PrimaryButton = ({ text, disabled, type = "submit", onClickHandler }: { text: any; disabled?: boolean; type?: "submit" | "button"; onClickHandler?: MouseEventHandler<HTMLButtonElement>; }) => (
  <button
    type={type}
    onClick={onClickHandler}
    disabled={disabled}
    className="bg-gradient-to-br font-medium from-fuchsia-500 via-red-500 to-orange-600 rounded-md text-white hover:bg-gradient-to-l border border-pink-700 py-2 px-6 md:px-7 lg:px-6 xl:px-7 hover:shadow transition ease-in-out duration-300"
  >
    {text}
  </button>

);
