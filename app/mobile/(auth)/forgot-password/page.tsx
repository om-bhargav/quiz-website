"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/FormComponents";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useGoBack } from "@/components/useGoBack";
import { Checkbox } from "@/components/ui/checkbox";
import PasswordConfirmationModal from "@/components/PasswordConfirmationModal";
import { NextButton } from "@/components/FormComponents";
import toast from "react-hot-toast";
import { EMAIL_PATTERN } from "@/lib/constants";
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
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    npass: "",
    cpass: "",
    phase: "",
    otp: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [OTPSent, setOTPSent] = useState(false);
  const [OTPVerified, setOTPVerified] = useState(false);
  const [open, setOpen] = useState(false);
  const goBack = useGoBack();
  const handleSubmit = async (e: React.FormEvent) => {
    if(!EMAIL_PATTERN.test(data.email)){
      toast.error("Email Pattern is invalid!");
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      let headers = { "Content-Type": "application/json" };
      let body = { ...data };
      if (!OTPSent && !OTPVerified) {
        body.phase = "request";
      } else if (OTPSent && !OTPVerified) {
        body.phase = "verify";
      } else {
        if(data.cpass!==data.npass){
          toast.error("Passwords doesn't match!");
          return;
        }
        body.phase = "reset";
        body.password = data.cpass;
      }
      const request = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      if (!OTPSent && !OTPVerified) {
        setOTPSent(true);
      } else if (OTPSent && !OTPVerified) {
        setOTPVerified(true);
      } else {
        setOpen(true);
        toast.success(response.message);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            setOpen(false);
            router.push("/mobile");
            resolve(3);
          }, 3000);
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
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
        <PasswordConfirmationModal open={open} onOpenChange={setOpen} />
        <form
          onSubmit={handleSubmit}
          className="flex h-full flex-1 justify-between flex-col"
        >
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
                  <input
                    type="text"
                    value={data.otp}
                    onChange={(e) =>
                      setData({...data,otp:e.target.value.replace(/\D/g, "").slice(0, 6)})
                    }
                    className="w-full py-4 text-2xl text-center border-2 border-black rounded-lg tracking-widest"
                    maxLength={6}
                  />
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
                  <h1 className="text-2xl font-semibold">
                    Create New Password 🔒
                  </h1>
                  <p className="text-gray-500">
                    Save the new password in a safe place, if you forget it then
                    you have to do a forgot password again.
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
                    <Checkbox /> Remember Me
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <div className="p-6">
            <NextButton
              text={OTPSent && !OTPVerified ? "Confirm" : "Continue"}
              disabled={loading}
              type={"submit"}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
}
