import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ProjectInfo from "./components/ProjectInfo";
import Home from "./pages/Home";
import About from "./pages/About";
import Explorations from "./pages/Explorations";
import Error from "./pages/Error";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      if (sessionStorage.getItem("scrollTarget")) return;
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explorations" element={<Explorations />} />
          <Route path="/:projectId" element={<ProjectInfo />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;