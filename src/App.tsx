import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "@/components/common/navbar/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import Products from "./pages/Products";
import ProductCard from "./features/products/components/ProductCard";
import ProductCreate from "./features/products/pages/ProductCreate";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductCard />} />
            <Route path="/products/create" element={<ProductCreate />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
