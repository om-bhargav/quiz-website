export default function TopBar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-3">
            <div className="flex items-center justify-end gap-4">
                {/* Profile Section */}
                <button className="flex items-center gap-3 p-1 rounded-lg hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center justify-center text-white text-sm font-bold w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 shadow-sm shadow-orange-200">
                        RS
                    </div>
                    <div className="hidden sm:block text-left">
                        <p className="text-sm font-semibold text-slate-900 leading-none">Rahul Singh</p>
                        <p className="text-[11px] font-medium text-slate-500 mt-1 uppercase tracking-wider">Admin</p>
                    </div>
                </button>
            </div>
        </header >
    );
}