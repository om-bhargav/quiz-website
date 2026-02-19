import { Button } from "@/components/ui/button";

export default function TopBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-4">
            <div className="flex items-center justify-end gap-4">
                {/* Profile Section */}
                <Button variant={"ghost"} size={"lg"}>
                    <div className="flex items-center justify-center text-white text-sm font-bold w-9 h-9 rounded-full bg-gradient-to-tr from-primary/50 to-primary shadow-sm shadow-orange-200">
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