import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

const InputStyles = {
  Input:
    "border-gray-600 bg-transparent border rounded-md w-full focus:outline-none hover:border-emerald-400 transition focus:border-emerald-400 px-3 py-2 placeholder:text-gray-500 placeholder:font-light",
  Label: "block mb-2 text-gray-400 font-light",
} as const;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, className: classNameProp, ...rest }, ref) => {
    return (
      <div className="w-full">
        <label className={InputStyles.Label} htmlFor={id}>
          {label}
        </label>
        <input
          className={`${classNameProp} ${InputStyles.Input}`}
          id={id}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(
  ({ label, id, className: classNameProp, ...rest }, ref) => {
    return (
      <div className="w-full">
        <label className={InputStyles.Label} htmlFor={id}>
          {label}
        </label>
        <textarea
          className={`${classNameProp} ${InputStyles.Input} min-h-[10rem] max-h-[35rem]`}
          id={id}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export { Input, TextArea };
