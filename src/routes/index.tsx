import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Lidando com rotas não mapeadas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
