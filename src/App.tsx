import { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const rotate = (direction: "left" | "right" | "up" | "down") => {
    setRotation((prev) => {
      let next = { ...prev };
      switch (direction) {
        case "left":
          next.y -= 90;
          break;
        case "right":
          next.y += 90;
          break;
        case "up":
          next.x += 90;
          break;
        case "down":
          next.x -= 90;
          break;
      }

      // Clamp X to multiples of 360 to prevent upside-down text
      next.x = ((next.x % 360) + 360) % 360;

      return next;
    });
  };

  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-6">Cube Controls</h1>
          <div className="flex flex-col gap-2">
            <button onClick={() => rotate("left")} className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded">
              ◀ Rotate Left
            </button>
            <button onClick={() => rotate("right")} className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded">
              ▶ Rotate Right
            </button>
            <button onClick={() => rotate("up")} className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded">
              ▲ Rotate Up
            </button>
            <button onClick={() => rotate("down")} className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded">
              ▼ Rotate Down
            </button>
          </div>
        </div>
      </div>

      {/* Cube Scene */}
      <div className="flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-zinc-300">
        <div
          className="relative w-[400px] h-[300px]"
          style={{ perspective: "1200px" }}
        >
          <motion.div
            animate={{ rotateX: rotation.x, rotateY: rotation.y }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              position: "relative",
            }}
          >
            {/* Front Face */}
            <div
              className="absolute w-full h-full bg-cyan-500 text-white flex items-center justify-center text-3xl font-bold shadow-xl rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(200px)",
              }}
            >
              Front
            </div>

            {/* Right Face */}
            <div
              className="absolute w-full h-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(90deg) translateZ(200px)",
              }}
            >
              Right
            </div>

            {/* Back Face */}
            <div
              className="absolute w-full h-full bg-red-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg) translateZ(200px)",
              }}
            >
              Back
            </div>

            {/* Left Face */}
            <div
              className="absolute w-full h-full bg-green-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(-90deg) translateZ(200px)",
              }}
            >
              Left
            </div>

            {/* Top Face */}
            <div
              className="absolute w-full h-full bg-yellow-400 text-black flex items-center justify-center text-3xl font-bold shadow-xl rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(90deg) translateZ(150px)",
              }}
            >
              Top
            </div>

            {/* Bottom Face */}
            <div
              className="absolute w-full h-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold shadow-xl rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(-90deg) translateZ(150px)",
              }}
            >
              Bottom
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}