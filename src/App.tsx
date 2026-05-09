import Header from "./components/Header";
import ClipboardList from "./components/ClipboardList";
import { useClipboard } from "./hooks/useClipboard";

function App() {
    const { clearHistory } = useClipboard();

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <Header onClear={clearHistory} />
            <ClipboardList />
        </div>
    );
}

export default App;