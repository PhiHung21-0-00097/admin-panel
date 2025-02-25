import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { New } from "./components/New/New";
import { Contact } from "./components/Contact/Contact";
import { Nav } from "./pages/Nav/Nav";

function App() {
    return (
        <div className="flex">
            <div className="h-full">
                <Nav />
            </div>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
