"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import GoogleButton from "@/components/GoogleButton";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/FormComponents";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, ChevronDown, Loader2 } from "lucide-react";
import { useGoBack } from "@/components/useGoBack";
import { motion } from "framer-motion";
import SuccessModal from "@/components/SuccessModal";
import toast from "react-hot-toast";
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
export default function RegisterPage() {
  const router = useRouter();
  const [open,setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    dob: "",
    country: "",
    username: "",
  });
  const goBack = useGoBack();
  const [loading, setLoading] = useState(false);
  const [basicInfoFilled, setBasicInfo] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Registration failed");
        setLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.ok) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
    setOpen(true);
  };

  const handleNext = () => {
    setBasicInfo(true);
  };
  const handlePrev = () => {
    setBasicInfo(false);
  };
  return (
    <div className="mx-auto flex items-start justify-center">
      <SuccessModal open={open} onOpenChange={setOpen}/>
      <motion.div
        key="phase1"
        variants={phaseVariants.phase3}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex-1 max-w-lg flex flex-col rounded-lg"
      >

        <form className="flex flex-1 justify-start flex-col">
          <div className="px-6 pt-8 pb-4 space-y-8">
            {/* Back + Progress */}
            <div className="flex items-center gap-4">
              <ArrowLeft
                className="w-6 h-6 cursor-pointer"
                onClick={basicInfoFilled ? handlePrev : goBack}
              />
              <Progress
                value={basicInfoFilled ? 100 : 50}
                className="h-2.5 w-50 mx-auto bg-gray-200"
              />
            </div>
            {basicInfoFilled ? (
              <motion.div
                key="phase1"
                variants={phaseVariants.phase2}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-1 h-full flex flex-col"
              >
                {/* Heading */}
                <div className="space-y-5 text-center">
                  <h1 className="text-3xl font-bold">Create an account ✏️</h1>
                  <p className="text-gray-700 text-md leading-relaxed">
                    Please enter your username, email address and password. If
                    you forget it then you have to do forgot password.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-8 pt-4">
                  <InputField
                    title={"Username"}
                    attribute="username"
                    data={data}
                    setData={setData}
                    placeholder="Username"
                  />
                  <InputField
                    title={"Email"}
                    type="email"
                    attribute="email"
                    data={data}
                    setData={setData}
                    placeholder="Email"
                  />
                  <InputField
                    title={"Password"}
                    attribute="password"
                    type="password"
                    data={data}
                    setData={setData}
                    placeholder="Password"
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
                {/* Heading */}
                <div className="space-y-5 text-center">
                  <h1 className="text-3xl font-bold">Create an account ✏️</h1>
                  <p className="text-gray-700 text-md leading-relaxed">
                    Please complete your profile. <br />
                    Don't worry, your data will remain private and only you can
                    see it.
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-8 pt-4">
                  {/* Full Name */}
                  <InputField
                    title={"Full Name"}
                    attribute="name"
                    data={data}
                    setData={setData}
                    placeholder="Andrew Ainsley"
                  />
                  <InputField
                    title={"Date of Birth"}
                    attribute="dob"
                    data={data}
                    type="date"
                    setData={setData}
                    Icon={Calendar}
                  />
                  <InputField
                    title={"Phone Number"}
                    attribute="phone"
                    data={data}
                    type="tel"
                    setData={setData}
                    placeholder="+1-300-555-0399"
                  />
                  <InputField
                    title={"Country"}
                    attribute="country"
                    data={data}
                    setData={setData}
                    placeholder="United States"
                    Icon={ChevronDown}
                  />
                  <InputField
                    title={"Age"}
                    attribute="age"
                    data={data}
                    setData={setData}
                    placeholder="25"
                  />
                </div>
              </motion.div>
            )}
          </div>
          {/* Bottom Button */}
          <div className="p-6">
            {basicInfoFilled ? (
              <NextButton text={"Sign Up"} disabled={loading} onClick={handleSubmit} />
            ) : (
              <NextButton text={"Continue"} onClick={handleNext} />
            )}
          </div>
        </form>
        <div className="mx-5">
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <GoogleButton />

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}



