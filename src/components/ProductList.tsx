"use client";

import { motion } from "framer-motion";
import { Leaf, Milk, Croissant, Egg, Coffee, Droplet, GlassWater, Utensils, AlertCircle, CheckCircle2 } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  stockStatus: string;
  aisle: string;
  floor: string;
  shelf: string;
  section: string;
  description: string;
  category: string;
  icon: string;
}

interface ProductListProps {
  products: Product[];
  selectedProductId: string | null;
  onSelectProduct: (product: Product) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'leaf': return <Leaf className="w-6 h-6" />;
    case 'milk': return <Milk className="w-6 h-6" />;
    case 'croissant': return <Croissant className="w-6 h-6" />;
    case 'egg': return <Egg className="w-6 h-6" />;
    case 'coffee': return <Coffee className="w-6 h-6" />;
    case 'droplet': return <Droplet className="w-6 h-6" />;
    case 'glass-water': return <GlassWater className="w-6 h-6" />;
    case 'utensils': return <Utensils className="w-6 h-6" />;
    default: return <Leaf className="w-6 h-6" />;
  }
};

export default function ProductList({ products, selectedProductId, onSelectProduct }: ProductListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {products.map((product) => {
        const isSelected = selectedProductId === product.id;
        const isOutOfStock = product.stockStatus === "Out of Stock";
        const isLowStock = product.stockStatus === "Low Stock";

        return (
          <motion.button
            key={product.id}
            variants={item}
            onClick={() => onSelectProduct(product)}
            className={`text-left w-full relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ${
              isSelected 
                ? "bg-primary/10 border-primary ring-2 ring-primary/50 shadow-md transform scale-[1.02]" 
                : "glass-card hover:bg-white/50 dark:hover:bg-slate-800/50 hover:shadow-md border border-transparent"
            }`}
          >
            {isSelected && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary to-transparent opacity-20" />
            )}
            
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${isSelected ? 'bg-primary text-white' : 'bg-secondary/10 text-secondary'}`}>
                {getIcon(product.icon)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg text-foreground truncate pl-1 pr-2">{product.name}</h3>
                  <span className="font-bold text-lg">₹{product.price.toFixed(2)}</span>
                </div>
                
                <p className="text-sm text-foreground/60 mb-3 pl-1">{product.category}</p>
                
                <div className="flex items-center gap-2 pl-1">
                  {isOutOfStock ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-500/10 px-2 py-1 rounded-full">
                      <AlertCircle className="w-3 h-3" /> Out of Stock
                    </span>
                  ) : isLowStock ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                      <AlertCircle className="w-3 h-3" /> Low Stock
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> In Stock
                    </span>
                  )}
                  
                  <span className="text-xs font-medium bg-foreground/5 text-foreground/70 px-2 py-1 rounded-full border border-foreground/10">
                    {product.aisle}
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
