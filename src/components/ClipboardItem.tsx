import { useState } from "react";
import { convertFileSrc } from "@tauri-apps/api/core";

export type Props = {
    id: number;
    content: string;
    tag: string;
    pinned: boolean;
    createdAt: string;
    itemType: string;
    imagePath: string;
    onRemove: (id: number) => void;
    onTogglePin: (id: number, pinned: boolean) => void;
    onCopy: (content: string, itemType: string, imagePath: string) => void;
}

export default function ClipboardItem({ id, content, tag, pinned, createdAt, itemType, imagePath, onRemove, onTogglePin, onCopy }: Props) {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    function handleCopy() {
        onCopy(content, itemType, imagePath);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const short = content.length > 100 ? content.slice(0, 100) + "..." : content;
    const displayContent = expanded ? content : short;
    const time = new Date(createdAt).toLocaleString("pl-PL", {
        day: "2-digit", month: "2-digit",
        hour: "2-digit", minute: "2-digit"
    });

    const tagColors: Record<string, string> = {
        url:  "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
        sql:  "text-amber-400 bg-amber-400/10 border-amber-400/20",
        json: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        text: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20",
    };
    const tagStyle = tagColors[tag?.toLowerCase()] ?? "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";

    return (
        <div className={`
            group relative rounded-xl border mb-2 transition-all duration-300 overflow-hidden
            ${pinned
                ? "border-violet-500/50 bg-gradient-to-br from-violet-950/40 to-zinc-900 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 hover:bg-zinc-900"
            }
        `}>
            {pinned && (
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
            )}

            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{background: "radial-gradient(circle at top right, rgba(139,92,246,0.05), transparent 70%)"}}
            />

            {itemType === "image" ? (
                <img
                    src={convertFileSrc(imagePath)}
                    onClick={handleCopy}
                    className="w-full max-h-64 object-contain cursor-pointer rounded-lg"
                />
            ) : (
                <pre onClick={handleCopy} className="text-sm text-zinc-200 px-4 pt-4 pb-2 break-words whitespace-pre-wrap font-mono leading-relaxed cursor-pointer">
                    {displayContent}
                </pre>
            )}

            {content.length > 100 && (
                <button
                    onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                    className="mx-4 mb-2 text-[11px] text-zinc-600 hover:text-violet-400 transition-colors font-mono tracking-wider"
                >
                    {expanded ? "▲ collapse" : "▼ expand"}
                </button>
            )}

            <div className="flex items-center justify-between px-4 pb-3 mt-1">
                <div className="flex items-center gap-2">
                    {tag && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md border uppercase tracking-widest ${tagStyle}`}>
                            {tag}
                        </span>
                    )}
                    <span className="text-[11px] text-zinc-600 font-mono">{time}</span>
                    {copied && (
                        <span className="text-[11px] text-emerald-400 font-mono">
                            ✓ copied
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button
                        onClick={() => onTogglePin(id, !pinned)}
                        className={`text-xs px-2 py-1 rounded-lg transition-all duration-200 ${
                            pinned
                                ? "text-violet-400 bg-violet-400/10 hover:bg-violet-400/20"
                                : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800"
                        }`}
                    >
                        {pinned ? "📌" : "📍"}
                    </button>
                    <button
                        onClick={() => onRemove(id)}
                        className="text-xs px-2 py-1 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}