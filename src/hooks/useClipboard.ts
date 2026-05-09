import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export type ClipboardItem = [number, string, string, boolean, string, string, string];

export function useClipboard(){
    const [items, setItems] = useState<ClipboardItem[]>([]);

    async function fetchItems(){
        const clipboardItems = await invoke<ClipboardItem[]>("get_clipboard");

        setItems(clipboardItems);
    }

    useEffect(() => {
        fetchItems();

        const interval = setInterval(() => {
            fetchItems();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    async function remove(id: number){
        await invoke("remove", {id});
        fetchItems();
    }

    async function togglePin(id: number, pinned: boolean){
        await invoke("toggle_pin", {id, pinned});
        fetchItems();
    }

    async function copyToClipboard(content: String, itemType: string, imagePath: string){
        await invoke("copy_to_clipboard", { content, itemType, imagePath });
    }

    async function clearHistory() {
        await invoke("clear_history");
        fetchItems();
    }

    return { items, remove, togglePin, copyToClipboard, clearHistory };
}