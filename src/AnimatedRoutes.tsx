// src/AnimatedRoutes.tsx
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pages = [
  { path: "/", label: "Home" },
  { path: "/page1", label: "Page 1" },
  { path: "/page2", label: "Page 2" },
  { path: "/page3", label: "Page 3" },
  { path: "/page4", label: "Page 4" },
];

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    key={location.pathname}
    initial={{ rotateY: -90, opacity: 0 }}
    animate={{ rotateY: 0, opacity: 1 }}
    exit={{ rotateY: 90, opacity: 0 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
    style={{ transformStyle: "preserve-3d" }}
    className="absolute w-full min-h-screen bg-white"
  >
    {children}
  </motion.div>
);

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Home</h1>
      <div className="grid grid-cols-2 gap-4">
        {pages.slice(1).map((p) => (
          <button
            key={p.path}
            onClick={() => navigate(p.path)}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const Page = ({ num }: { num: number }) => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6">
      <h1 className="text-4xl font-bold text-blue-600">Page {num}</h1>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Home
      </button>
    </div>
  );
};

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="relative w-full min-h-screen bg-gray-100 overflow-hidden perspective-[1000px]">
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/page1" element={<PageWrapper><Page num={1} /></PageWrapper>} />
          <Route path="/page2" element={<PageWrapper><Page num={2} /></PageWrapper>} />
          <Route path="/page3" element={<PageWrapper><Page num={3} /></PageWrapper>} />
          <Route path="/page4" element={<PageWrapper><Page num={4} /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
