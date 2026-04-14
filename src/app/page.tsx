"use client";

import { useState, useEffect, useMemo } from "react";
import QRScanner from "@/components/QRScanner";
import ProductList, { Product } from "@/components/ProductList";
import ProductDetails from "@/components/ProductDetails";
import StoreMap from "@/components/StoreMap";
import { getRecommendations } from "@/utils/recommendations";
import { QrCode, Store } from "lucide-react"; 

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [storeEntered, setStoreEntered] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // Load products on mount
  useEffect(() => {
    import("@/data/products.json").then((data) => {
      setProducts(data.default || data);
    }).catch(error => {
      console.error("Failed to load products:", error);
    });
  }, []);

  const handleScan = (decodedText: string) => {
    // Hide scanner inside handleScan to guarantee it closes
    setShowScanner(false);
    
    // Scan represents entering a store
    setStoreEntered(true);
  };

  const recommendations = useMemo(() => {
    if (!selectedProduct || products.length === 0) return [];
    return getRecommendations(selectedProduct, products, 4);
  }, [selectedProduct, products]);

  return (
    <div className="flex-1 w-full flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto relative min-h-[calc(100vh-60px)]">
      <div className="w-full flex-1 flex flex-col items-center justify-center">
        {showScanner ? (
          <div className="w-full">
            <QRScanner 
              onScanSuccess={handleScan} 
              onClose={() => setShowScanner(false)} 
            />
          </div>
        ) : storeEntered ? (
          selectedProduct ? (
            <div className="w-full pb-8 flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-1/3 shrink-0 animate-in fade-in slide-in-from-left-4 duration-500 sticky top-8">
                <StoreMap highlightedAisle={selectedProduct.aisle} highlightedFloor={selectedProduct.floor} />
              </div>
              <div className="w-full lg:w-2/3 flex-1">
                <ProductDetails 
                  product={selectedProduct} 
                  recommendations={recommendations}
                  onBack={() => setSelectedProduct(null)} 
                  onSelectRecommendation={(p) => {
                    setSelectedProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
               <div className="mb-8 self-start">
                 <h2 className="text-3xl font-bold">Store Products</h2>
                 <p className="text-foreground/60">Browse the catalogue and select items to view details.</p>
               </div>
               <div className="w-full">
                 <ProductList 
                   products={products}
                   selectedProductId={null}
                   onSelectProduct={(p) => {
                     setSelectedProduct(p);
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                   }}
                 />
               </div>
            </div>
          )
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center w-full animate-in fade-in zoom-in duration-500 max-w-lg mx-auto py-12">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Store className="w-12 h-12 text-primary" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pb-1">
              Smart Scanner
            </h1>
            <p className="text-foreground/60 text-center mb-10 max-w-sm text-lg">
              Scan store QR to explore products.
            </p>
            
            <div className="flex flex-col gap-4 w-full max-w-xs transition-all duration-300 hover:scale-[1.02]">
              <button
                onClick={() => setShowScanner(true)}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <QrCode className="w-5 h-5" />
                Enter Store
              </button>
              
              <button
                onClick={() => handleScan("dummy-store-id")}
                className="w-full py-3 px-6 rounded-2xl bg-foreground/5 dark:bg-white/10 border border-foreground/10 dark:border-white/20 text-foreground font-medium text-md hover:bg-foreground/10 dark:hover:bg-white/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Demo Mode (Skip Scan)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
