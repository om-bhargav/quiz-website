import { Button } from "@/components/ui/button";
import { Hamburger, Menu } from "lucide-react";

export default function TopBar({setOpen}:{setOpen: any}) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-4">
            <div className="flex items-center max-md:justify-between md:justify-end gap-4">
                <Button className="md:hidden" size={"icon"} onClick={()=>setOpen((prev: boolean)=>!prev)}><Menu/></Button>
                {/* Profile Section */}
                <Button variant={"ghost"}>
                    <div className="flex items-center justify-center text-white text-sm font-bold w-9 h-9 rounded-full bg-gradient-to-tr from-primary/50 to-primary shadow-sm shadow-primary">
                        A
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-semibold text-slate-900 leading-none">Admin Name</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-1 uppercase tracking-wider">Admin</p>
                    </div>
                </Button>
            </div>
        </header >
    );
}