type Props = {
    onClear: () => void;
}

export default function Header({ onClear }: Props){
    return (
        <>
            <div className="sticky top-0 z-10 px-4 py-3 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800/50">
                <div className="flex items-center gap-2">
                    <span className="text-lg">📋</span>
                    <h1 className="text-sm font-mono font-bold tracking-widest uppercase text-zinc-300">
                        Clippr
                    </h1>
                    <div className="ml-auto flex items-center gap-3">
                        <button
                            onClick={onClear}
                            className="text-[11px] font-mono px-3 py-1 rounded-md border border-red-900 text-red-500 hover:bg-red-500/10 transition-all uppercase tracking-widest"
                        >
                            Clear history
                        </button>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                </div>
            </div>
        </>
    )
}