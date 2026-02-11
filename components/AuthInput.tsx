import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import { clsx } from "clsx";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
  isPassword?: boolean;
}

export function AuthInput({ icon: Icon, error, isPassword, className, ...props }: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : props.type;

  return (
    <div className="w-full space-y-1">
      <div
        className={clsx(
          "flex items-center w-full px-4 py-3 bg-gray-50 rounded-2xl border border-transparent focus-within:border-blue-500 focus-within:bg-blue-50/30 transition-all",
          error && "border-red-500 bg-red-50",
          className
        )}
      >
        {Icon && <Icon className="w-5 h-5 text-gray-400 mr-3" />}
        <input
          {...props}
          type={inputType}
          className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400 text-sm font-medium"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 focus:outline-none ml-2"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 text-xs ml-4">{error}</p>}
    </div>
  );
}