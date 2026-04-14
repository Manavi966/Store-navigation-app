import { Product } from "@/components/ProductList";

export interface RecommendedProduct extends Product {
  reason?: string;
  isPopular?: boolean;
}

// Predefined frequently bought together relationships
// Maps product ID to an array of related product IDs
const RELATIONSHIPS: Record<string, string[]> = {
  "p1": ["p2", "p3", "p4", "p5"], // Onion -> Potato, Tomato, Coriander, Chilli
  "p7": ["p8", "p23", "p24"],     // Milk -> Butter, Parle-G, Good Day
  "p8": ["p7"],                   // Butter -> Milk
  "p13": ["p17", "p12", "p16"],   // Atta -> Dal, Ghee, Oil
  "p17": ["p13", "p18"],          // Dal -> Atta, Garam Masala
  "p20": ["p23", "p24"],          // Tea -> Biscuits
};

export const getRecommendations = (
  scannedProduct: Product,
  allProducts: Product[],
  limit: number = 4
): RecommendedProduct[] => {
  const recommendations: RecommendedProduct[] = [];
  const addedIds = new Set<string>([scannedProduct.id]);
  
  // 1. First add Predefined Relationships
  if (RELATIONSHIPS[scannedProduct.id]) {
    const relatedIds = RELATIONSHIPS[scannedProduct.id];
    for (const rid of relatedIds) {
      if (recommendations.length >= limit) break;
      const prod = allProducts.find((p) => p.id === rid);
      if (prod && !addedIds.has(prod.id)) {
        recommendations.push({
          ...prod,
          reason: "Frequently bought together",
          isPopular: recommendations.length === 0, // Make the first relationship the popular one
        });
        addedIds.add(prod.id);
      }
    }
  }

  // 2. Keyword Matching (Simple AI)
  // Look for keywords in the description or name
  if (recommendations.length < limit) {
    const keywords = scannedProduct.name.toLowerCase().split(' ').concat(scannedProduct.description.toLowerCase().split(' '));
    // Filter out common small words
    const ignoreWords = ['and', 'the', 'of', 'in', 'with', 'a', 'to', 'fresh', 'premium'];
    const meaningfulKeywords = keywords.filter(w => w.length > 2 && !ignoreWords.includes(w));

    for (const prod of allProducts) {
      if (recommendations.length >= limit) break;
      if (addedIds.has(prod.id)) continue;
      
      const prodText = `${prod.name} ${prod.description}`.toLowerCase();
      const hasMatch = meaningfulKeywords.some(kw => prodText.includes(kw));

      if (hasMatch) {
        recommendations.push({
          ...prod,
          reason: "Similar match",
        });
        addedIds.add(prod.id);
      }
    }
  }

  // 3. Category Similarity Match
  if (recommendations.length < limit) {
    for (const prod of allProducts) {
      if (recommendations.length >= limit) break;
      if (addedIds.has(prod.id)) continue;

      if (prod.category === scannedProduct.category) {
        recommendations.push({
          ...prod,
          reason: "In same category",
        });
        addedIds.add(prod.id);
      }
    }
  }

  return recommendations;
};
