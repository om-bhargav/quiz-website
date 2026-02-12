"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye,EyeClosed,Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
export function InputField({
  title,
  attribute,
  data,
  setData,
  placeholder,
  type = "text",
  Icon,
}: {
  title: string;
  attribute: string;
  data: any;
  setData: any;
  placeholder?: string;
  type?: string;
  Icon?: any;
}) {
  const [InputType,setInputType] = useState(type);
  return (
    <div className="space-y-2 relative">
      <Label className="text-base text-md">{title}</Label>
      <Input
        type={type==="password" ? InputType:type}
        value={data[attribute]}
        onChange={(e) => setData({ ...data, [attribute]: e.target.value })}
        placeholder={placeholder}
        id={attribute}
        className="border-0 border-b shadow-none border-primary/30 rounded-none px-0 text-md focus-visible:ring-0 focus-visible:border-primary"
      />
      {Icon && (
        <Label className="absolute right-0 bottom-3" htmlFor={attribute}>
          <Icon className="w-5 h-5 text-primary" />
        </Label>
      )}
      {
        type==="password" && (<Button variant={"link"} type="button" onClick={()=>{setInputType(InputType==="text" ? "password":"text")}} className="absolute right-0">{InputType==="password" ? <EyeClosed/>:<Eye/>}</Button>)
      }
    </div>
  );
}


export function NextButton({
  text = "next",
  variant = "default",
  onClick,
  disabled=false
}: {
  text?: string;
  variant?: string;
  onClick?: (...props: any) => any;
  disabled?: boolean
}) {
  return (
    <Button
      variant={variant as any}
      className={`shadow-[0px_4px_1px_0px_var(--second-primary)] uppercase w-full! rounded-full py-6! text-md`}
      onClick={onClick}
      type={"button"}
      disabled={disabled}
    >
      {disabled ? <Loader2 size={20} className="animate-spin"/>:text}
    </Button>
  );
}