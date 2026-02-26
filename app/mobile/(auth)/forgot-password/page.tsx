"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/FormComponents";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useGoBack } from "@/components/useGoBack";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import SuccessModal from "@/components/SuccessModal";
import PasswordConfirmationModal from "@/components/PasswordConfirmationModal";
import { NextButton } from "@/components/FormComponents";
const phaseVariants = {
  phase2: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  phase3: {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  },
};
export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "",npass:"",cpass:"" });
  const [loading, setLoading] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [OTPVerified, setOTPVerified] = useState(false);
  const [open,setOpen] = useState(false);
  const goBack = useGoBack();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 5000);
    });
    setLoading(false);
    setOpen(true);
  };

  return (
    <div className="min-h-screen h-full mx-auto max-w-md w-full flex items-start justify-start">
      <motion.div
        key="phase1"
        variants={phaseVariants.phase3}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex-1 flex h-full flex-col rounded-lg justify-between"
      >
        <PasswordConfirmationModal open={open} onOpenChange={setOpen}/>
        <form className="flex h-full flex-1 justify-between flex-col">
          <div className="px-6 pt-8 pb-4 space-y-8">
            <div className="flex items-center gap-4">
              <ArrowLeft className="w-6 h-6 cursor-pointer" onClick={goBack} />
            </div>
            {!OTPSent && !OTPVerified ? (
              <motion.div
                key="phase1"
                variants={phaseVariants.phase2}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-1 h-full flex flex-col"
              >
                <div className="space-y-5 my-3">
                  <h1 className="text-3xl font-semibold">Forgot Password 🔑</h1>
                  <p className="text-gray-500">
                    Enter your email to get OTP code to reset your password.
                  </p>
                </div>

                <div className="space-y-8 pt-4">
                  <InputField
                    title={"Email"}
                    type="email"
                    attribute="email"
                    data={data}
                    setData={setData}
                    placeholder="Email"
                  />
                </div>
              </motion.div>
            ) : OTPSent && !OTPVerified ? (
              <motion.div
                key="phase1"
                variants={phaseVariants.phase2}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-1 h-full flex flex-col"
              >
                <div className="space-y-5 my-3">
                  <h1 className="text-3xl font-semibold">You've Got Mail 📩</h1>
                  <p className="text-gray-500">
                    We Have sent the OTP Verification Code to your email
                    address. Chech your email and enter the code below.
                  </p>
                </div>

                <div className="space-y-8 pt-4">
                  <OtpInput />
                </div>
                <div className="space-y-5 mt-5 text-center">
                  <div>Didn't receive email?</div>
                  <div>
                    You can resend code in{" "}
                    <span className="text-primary">55</span> s
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="phase1"
                variants={phaseVariants.phase2}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-1 h-full flex flex-col"
              >
                <div className="space-y-5 my-3">
                  <h1 className="text-2xl font-semibold">Create New Password 🔒</h1>
                  <p className="text-gray-500">
                    Save the new password in a safe place, if you forget it then you have to do a forgot password again.
                  </p>
                </div>

                <div className="space-y-5 pt-4">
                  <InputField
                    title={"Create a new password"}
                    type="password"
                    attribute="npass"
                    data={data}
                    setData={setData}
                    placeholder="New Password"
                  />
                  <InputField
                    title={"Confirm a new password"}
                    type="password"
                    attribute="cpass"
                    data={data}
                    setData={setData}
                    placeholder="Confirm Password"
                  />
                  <div className="flex gap-2 items-center">
                  <Checkbox/> Remember Me
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="p-6">
            <NextButton
              text={OTPSent && !OTPVerified ? "Confirm" : "Continue"}
              disabled={loading}
              onClick={
                OTPSent && OTPVerified
                  ? handleSubmit
                  : OTPSent
                  ? () => {
                      setOTPVerified(true);
                    }
                  : () => {
                      setOTPSent(true);
                    }
              }
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function OtpInput() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<any>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // allow only single digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next input
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-4">
      {otp.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          ref={(el: any) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="h-14 text-center text-xl font-semibold 
                     bg-primary/10 border-primary 
                     focus-visible:ring-primary"
        />
      ))}
    </div>
  );
}
