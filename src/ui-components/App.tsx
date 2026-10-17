import React, { useState } from "react";
import "./App.css";

interface AppProps {
    title?: string;
}

export const App: React.FC<AppProps> = ({ title = "Hello React + TypeScript!" }) => {
    const [count, setCount] = useState<number>(0);

    return (
        <main className="container">
            <h1>{title}</h1>
            <div className="card">
                <button onClick={() => setCount((prev) => prev + 1)}>Count is: {count}</button>
            </div>
        </main>
    );
};

export default App;
