type Props = {
    value: string;
    onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm font-mono placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition-colors"
        />
    );
}