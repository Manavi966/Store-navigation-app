"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Milk, Croissant, Egg, Coffee, Droplet, GlassWater, Utensils, AlertCircle, CheckCircle2, Flame, Plus } from "lucide-react";
import { Product } from "./ProductList";
import { RecommendedProduct } from "@/utils/recommendations";

interface ProductDetailsProps {
  product: Product;
  recommendations: RecommendedProduct[];
  onBack: () => void;
  onSelectRecommendation: (product: Product) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'leaf': return <Leaf className="w-8 h-8" />;
    case 'milk': return <Milk className="w-8 h-8" />;
    case 'croissant': return <Croissant className="w-8 h-8" />;
    case 'egg': return <Egg className="w-8 h-8" />;
    case 'coffee': return <Coffee className="w-8 h-8" />;
    case 'droplet': return <Droplet className="w-8 h-8" />;
    case 'glass-water': return <GlassWater className="w-8 h-8" />;
    case 'utensils': return <Utensils className="w-8 h-8" />;
    default: return <Leaf className="w-8 h-8" />;
  }
};

const getSmallIcon = (iconName: string) => {
  switch (iconName) {
    case 'leaf': return <Leaf className="w-5 h-5" />;
    case 'milk': return <Milk className="w-5 h-5" />;
    case 'croissant': return <Croissant className="w-5 h-5" />;
    case 'egg': return <Egg className="w-5 h-5" />;
    case 'coffee': return <Coffee className="w-5 h-5" />;
    case 'droplet': return <Droplet className="w-5 h-5" />;
    case 'glass-water': return <GlassWater className="w-5 h-5" />;
    case 'utensils': return <Utensils className="w-5 h-5" />;
    default: return <Leaf className="w-5 h-5" />;
  }
};

export default function ProductDetails({ product, recommendations, onBack, onSelectRecommendation }: ProductDetailsProps) {
  const isOutOfStock = product.stockStatus === "Out of Stock";
  const isLowStock = product.stockStatus === "Low Stock";

  return (
    <div className="w-full flex justify-center animate-in fade-in zoom-in-95 duration-300 pb-20">
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Header / Back */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-full bg-white/20 dark:bg-slate-800/50 hover:bg-white/40 dark:hover:bg-slate-700/50 backdrop-blur-md transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold flex-1">Product Details</h2>
        </div>

        {/* Main Product Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-bl from-primary/30 to-transparent rounded-full blur-2xl" />
          
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="p-6 rounded-2xl bg-primary/10 text-primary shrink-0 transition-transform hover:scale-105 duration-300">
              {getIcon(product.icon)}
            </div>
            
            <div className="flex-1 space-y-3 relative z-10 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block mb-2">
                    {product.category}
                  </div>
                  <h1 className="text-3xl font-extrabold tracking-tight">{product.name}</h1>
                </div>
                <div className="text-3xl font-black text-primary">
                  ₹{product.price.toFixed(2)}
                </div>
              </div>

              <p className="text-foreground/70 text-lg">{product.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {isOutOfStock ? (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-red-600 bg-red-500/10 px-3 py-1.5 rounded-xl border border-red-500/20">
                    <AlertCircle className="w-4 h-4" /> Out of Stock
                  </span>
                ) : isLowStock ? (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                    <AlertCircle className="w-4 h-4" /> Low Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" /> In Stock
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Detailed Location Card */}
          <div className="mt-8 w-full bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-4 sm:p-5 relative z-10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary/80 mb-3 ml-1">Store Location</h3>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between bg-white/60 dark:bg-slate-900/40 p-4 rounded-xl shadow-sm border border-white/40 dark:border-white/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 flex-1 sm:justify-start">
                <div className="text-2xl drop-shadow-sm">🏢</div>
                <div>
                  <div className="text-xs text-foreground/60 font-medium">Floor</div>
                  <div className="font-bold text-foreground">{product.floor}</div>
                </div>
              </div>
              
              <div className="w-full h-px sm:w-px sm:h-12 bg-foreground/10"></div>
              
              <div className="flex items-center gap-3 flex-1">
                <div className="text-2xl drop-shadow-sm">📍</div>
                <div>
                  <div className="text-xs text-foreground/60 font-medium">Aisle</div>
                  <div className="font-bold text-foreground">{product.aisle}</div>
                </div>
              </div>
              
              <div className="w-full h-px sm:w-px sm:h-12 bg-foreground/10 hidden sm:block"></div>
              
              <div className="flex items-center gap-3 flex-1 sm:justify-center">
                <div className="text-2xl drop-shadow-sm">🗂</div>
                <div>
                  <div className="text-xs text-foreground/60 font-medium">Shelf</div>
                  <div className="font-bold text-foreground">{product.shelf}</div>
                </div>
              </div>
              
              <div className="w-full h-px sm:w-px sm:h-12 bg-foreground/10"></div>
              
              <div className="flex items-center gap-3 flex-1 sm:justify-end">
                <div className="text-2xl drop-shadow-sm">🏬</div>
                <div className="sm:text-right">
                  <div className="text-xs text-foreground/60 font-medium">Section</div>
                  <div className="font-bold text-foreground">{product.section}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 mt-4"
          >
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                Frequently bought together
              </h3>
            </div>
            
            {/* Horizontal Scroll Area */}
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 snap-x snap-mandatory hide-scrollbars -mx-4 px-4 sm:mx-0 sm:px-0">
              {recommendations.map((rec, i) => (
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + (i * 0.05) }}
                  key={rec.id}
                  onClick={() => onSelectRecommendation(rec)}
                  className={`relative flex-none w-[200px] sm:w-[220px] snap-center glass-card rounded-2xl p-5 cursor-pointer hover:bg-white/60 dark:hover:bg-slate-800/80 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl ${rec.isPopular ? 'ring-2 ring-amber-400/50 from-amber-50/50' : ''}`}
                >
                  {rec.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-10 whitespace-nowrap">
                      <Flame className="w-3 h-3" /> Most Popular
                    </div>
                  )}

                  <div className="flex flex-col h-full gap-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl bg-secondary/10 text-secondary transition-transform group-hover:scale-110 duration-300`}>
                        {getSmallIcon(rec.icon)}
                      </div>
                      <div className="text-xs font-medium text-foreground/50 bg-foreground/5 px-2 py-1 rounded-md">
                        {rec.category}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground line-clamp-2 min-h-[40px] leading-tight mt-1">{rec.name}</h4>
                      <div className="text-xs text-secondary/80 mt-1 font-medium">{rec.reason}</div>
                    </div>
                    
                    <div className="flex items-end justify-between mt-1">
                      <span className="font-bold text-lg">₹{rec.price.toFixed(0)}</span>
                      <button className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 active:scale-90">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
