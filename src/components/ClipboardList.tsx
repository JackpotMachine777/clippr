import ClipboardItem from "./ClipboardItem";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

import { useFilter } from "../hooks/useFilters";
import { useClipboard } from "../hooks/useClipboard";
import { useSearch } from "../hooks/useSearch";

export default function ClipboardList() {
    const { items, remove, togglePin, copyToClipboard } = useClipboard();
    const { searchTerm, setSearchTerm } = useSearch(items);
    const { filteredTags, filterTags, setFilterTags} = useFilter(items);

    const sorted = [...filteredTags].sort((a, b) => Number(b[3]) - Number(a[3]));

    return (
        <div className="p-3">
            <div className="flex flex-col gap-3">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <FilterBar value={filterTags} onChange={setFilterTags} />
            </div>

            <div className="mt-3">
                {sorted.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-zinc-600 font-mono">
                        <span className="text-2xl mb-2">📋</span>
                        <span className="text-xs tracking-widest uppercase">No entries</span>
                    </div>
                ) : (
                    sorted.map((item) => (
                        <ClipboardItem
                            key={item[0]}
                            id={item[0]}
                            content={item[1]}
                            tag={item[2]}
                            pinned={item[3]}
                            createdAt={item[4]}
                            itemType={item[5]}
                            imagePath={item[6]}
                            onRemove={remove}
                            onTogglePin={togglePin}
                            onCopy={copyToClipboard}
                        />
                    ))
                )}
            </div>
        </div>
    );
}