import { useState, useMemo } from "react";
import { ClipboardItem } from "./useClipboard";

export const useSearch = (clipboard: ClipboardItem[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return clipboard;

    const term = searchTerm.toLowerCase();
    return clipboard.filter(item =>
      item[1].toLowerCase().includes(term) ||
      item[2].toLowerCase().includes(term)
    );
  }, [clipboard, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredItems,
    hasResults: filteredItems.length > 0,
    isSearching: searchTerm.trim().length > 0,
  };
};