"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-hot-toast";
import { Calendar, Globe, Phone, User, Loader2 } from "lucide-react";
import { AuthInput } from "@/components/AuthInput";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  phone: z.string().min(10, "Phone number is required"),
  country: z.string().min(2, "Country is required"),
  age: z.coerce.number().min(18, "You must be at least 18 years old").max(100), 
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function CompleteProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/complete-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      toast.success("Registration successful!");
      
      window.location.href = "/";
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
           <div className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 cursor-pointer">
              <span className="text-xl">←</span>
           </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create an account ✏️
          </h1>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            Please complete your profile. Don&apos;t worry, your data will remain private and only you can see it.
          </p>
        </div>

        {/* Profile Avatar Placeholder (from image) */}
        <div className="flex justify-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center relative">
                <User className="w-10 h-10 text-blue-600" />
                <div className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-md">
                    <span className="text-white text-xs">✏️</span>
                </div>
            </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1 mb-1 block">Full Name</label>
            <AuthInput
                placeholder="Andrew Ainsley"
                error={errors.fullName?.message}
                {...register("fullName")}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1 mb-1 block">Date of Birth</label>
            <div className="relative">
                <AuthInput
                    type="date"
                    icon={Calendar}
                    error={errors.dob?.message}
                    {...register("dob")}
                />
            </div>
          </div>

          <div>
             <label className="text-sm font-bold text-gray-700 ml-1 mb-1 block">Phone Number</label>
             <AuthInput
                icon={Phone}
                type="tel"
                placeholder="+1 300 555 0399"
                error={errors.phone?.message}
                {...register("phone")}
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1 mb-1 block">Country</label>
            {/* Simple Select for Country */}
            <div className="relative">
                <Globe className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 z-10" />
                <select 
                    {...register("country")}
                    className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-2xl border border-transparent focus:border-blue-500 focus:bg-blue-50/30 outline-none text-gray-900 appearance-none font-medium"
                >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="UK">United Kingdom</option>
                </select>
                <span className="absolute right-4 top-4 text-gray-400 pointer-events-none">▼</span>
            </div>
             {errors.country && <p className="text-red-500 text-xs ml-4 mt-1">{errors.country.message}</p>}
          </div>
        
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1 mb-1 block">Age</label>
            <AuthInput
                type="number"
                placeholder="25"
                error={errors.age?.message}
                {...register("age")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-600/30 transition-all mt-4 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}