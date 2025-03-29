import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { CreatePost, Home } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Navbar />
        </header>
        <main className="px-0 sm:px-8 md:px-12 lg:px-16 xl:px-20 md:py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
