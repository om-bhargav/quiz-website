"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { BricolageFont, DMFont } from "@/lib/fonts";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
const phaseVariants = {
  phase1: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  },
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

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [phase, setPhase] = useState<number>(1);
  const [visited,setVisited] = useState(false);
  useEffect(() => {
    const val = localStorage?.getItem("visited");
    if(val){
      setVisited(val.toUpperCase()==="TRUE");
    }
    new Promise(async (resolve, reject) => {
      setTimeout(() => {
        setLoading(false);
        resolve("This is value");
      }, 3000);
    });
  }, []);
  const handleNext = () => {
    if(phase===1){
      localStorage.setItem("visited","true");
    }
    setPhase((prev) => prev + 1);
  };
  return (
    <div className="flex md:mx-auto max-w-md items-center justify-center">
      {!visited && loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col h-full w-full">
          {!visited && phase === 1 ? (
            <motion.div
              key="phase1"
              variants={phaseVariants.phase1}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 h-full flex flex-col"
            >
              <div className="relative flex-1 h-full w-full">
                <Image
                  src={"/first-phase.png"}
                  alt={"First Phase Png"}
                  className="object-contain"
                  fill
                />
                <Image alt={"icon"} height={100} width={100} className="w-20 absolute top-60! left-13" src={"/bulb.png"}/>
                <Image alt={"icon"} height={100} width={100} className="h-18 w-10 right-20 top-20 absolute" src={"/question.png"}/>
              </div>
              <div className="flex flex-col items-center min-h-[250px] justify-between gap-5 m-2">
                <div>
                  <div className="h-full space-y-2 text-center">
                    <div
                      className={`${BricolageFont.className} font-semibold text-4xl`}
                    >
                      Ultimate Answers with money
                    </div>
                    <div
                      className={`${DMFont.className} text-gray-400 mx-auto text-md max-w-xs`}
                    >
                      Earn ultimate money just by using your knowledge and
                      answer questions
                    </div>
                  </div>
                  <RenderNavigation active={phase}/>
                </div>
                <NextButton onClick={handleNext} />
              </div>
            </motion.div>
          ) : !visited && phase === 2 ? (
            <motion.div
              key="phase2"
              variants={phaseVariants.phase1}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex-1 h-full flex flex-col"
            >
              <div className="relative flex-1 h-full w-full">
                <Image
                  src={"/phase-2.png"}
                  alt={"First Phase Png"}
                  className="object-fit"
                  fill
                />
              </div>
              <div className="flex flex-col justify-between min-h-[220px]  gap-1 m-2 mt-4">
                <div>
                <div className="h-full text-center space-y-3">
                  <div
                    className={`${BricolageFont.className} font-semibold text-4xl max-w-md`}
                  >
                    Join With Ease
                  </div>
                  <div
                    className={`${DMFont.className} text-gray-400 mx-auto mb-4 text-md max-w-sm`}
                  >
                    You can login with us easily without any hazel process and
                    start playing!
                  </div>
                </div>
                <RenderNavigation active={phase}/>
                </div>
                <NextButton onClick={handleNext} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="phase3"
              variants={phaseVariants.phase1}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 h-full flex flex-col gap-8"
            >
              <div className="flex-1 flex flex-col items-center justify-center h-full">
                <div className="relative flex-1 w-full">
                  <Image
                    src={"/phase-3.png"}
                    alt={"First Phase Png"}
                    className="object-contain"
                    fill
                  />
                </div>
                <div
                  className={`${BricolageFont.className} text-center min-h-[200px] font-semibold text-3xl leading-loose max-w-sm`}
                >
                  Play And Take Quiz Challanges With Your Friends.
                </div>
              </div>
              <RenderNavigation active={phase}/>
              <Separator />
              <div className="flex flex-col items-center justify-between  gap-3 m-2">
                <Link href={"/register"} className="w-full">
                  <NextButton text={"Get Started"} />
                </Link>
                <Link href={"/login"} className="w-full">
                  <NextButton
                    variant={"outline"}
                    text={"i already have an account"}
                  />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

function NextButton({
  text = "next",
  variant = "default",
  onClick,
}: {
  text?: string;
  variant?: string;
  onClick?: () => void;
}) {
  return (
    <Button
      variant={variant as any}
      className={`shadow-[0px_4px_1px_0px_var(--second-primary)] uppercase w-full! rounded-full py-6! text-md`}
      onClick={onClick}
    >
      {text} {text === "next" && <ArrowRight className="scale-140" />}
    </Button>
  );
}

function RenderNavigation({ active }: { active: number }) {
  return (
    <div className="w-full flex justify-center mt-2 gap-3 mx-auto">
      {
        Array(3).fill(null).map((_,index)=><div key={index} className={`${active===(index+1) ?"w-8 bg-primary" :"w-2 bg-gray-200"} h-2 rounded-full`} />)
       }  
    </div>
  );
}
