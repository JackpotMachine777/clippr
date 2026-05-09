type Props = {
    value: string;
    onChange: (val: string) => void;
}

const tags = ["all", "url", "sql", "json", "code", "text", "image"];

export default function FilterBar({ value, onChange }: Props){
    return (
        <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onChange(tag === "all" ? "" : tag)}
                    className={`text-[11px] font-mono px-3 py-1 rounded-md border uppercase tracking-widest transition-all ${
                        (tag === "all" && value === "") || value === tag
                            ? "border-violet-500 text-violet-400 bg-violet-500/10"
                            : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    )
}