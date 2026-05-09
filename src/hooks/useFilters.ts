import { useState, useMemo } from "react";
import { ClipboardItem } from "./useClipboard";

export const useFilter = (clipboard: ClipboardItem[]) => {
  const [filterTags, setFilterTags] = useState("");

  const filteredTags = useMemo(() => {
    if (!filterTags.trim()) return clipboard;

    const term = filterTags.toLowerCase();
    return clipboard.filter(item => item[2] === term);
  }, [clipboard, filterTags]);

  return {
    filterTags,
    setFilterTags,
    filteredTags,
    hasResults: filteredTags.length > 0,
    isSearching: filterTags.trim().length > 0,
  };
};