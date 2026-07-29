export interface BlogAuthor {
  name: string;
  avatar: string;
  role: string;
  bio: string;
}

export interface BlogContentSection {
  type: 'paragraph' | 'heading' | 'blockquote' | 'callout' | 'list' | 'key-takeaways';
  content?: string | string[];
  title?: string;
  authorQuote?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  badge: string;
  category: string;
  image: string;
  imageCaption: string;
  author: BlogAuthor;
  date: string;
  readTime: string;
  tags: string[];
  sections: BlogContentSection[];
  relatedSlugs: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "anarkali-styles",
    slug: "anarkali-styles",
    title: "Top 10 Anarkali Styles You Need This Season",
    excerpt: "From classic floor-length cuts to modern asymmetrical high-low skirts – find your perfect Anarkali silhouette crafted by expert tailors.",
    badge: "STYLE GUIDE",
    category: "Style Guides",
    image: "/images/blog/anarkali.png",
    imageCaption: "Intricate custom embroidered Anarkali flared suit handcrafted for festive occasions.",
    author: {
      name: "Meena Tailors",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Master Craftsman & Designer",
      bio: "Specializing in handcrafted bridal & ethnic wear with over 15 years of couture tailoring experience."
    },
    date: "20 May 2024",
    readTime: "6 min read",
    tags: ["Anarkali", "Ethnic Wear", "Custom Tailoring", "Festive Fashion", "Style Guide"],
    relatedSlugs: ["perfect-fabric", "custom-vs-readymade", "embroidery-guide"],
    sections: [
      {
        type: "paragraph",
        content: "The Anarkali suit has stood as an undisputed emblem of royal grace and timeless elegance for centuries. Rooted in Mughal heritage, this silhouette continues to evolve every season, marrying traditional threadwork with contemporary cuts."
      },
      {
        type: "paragraph",
        content: "Whether you are preparing for a festive wedding, a grand sangeet night, or an intimate family celebration, choosing the right Anarkali style tailored specifically to your body type can transform your look entirely."
      },
      {
        type: "heading",
        title: "1. The Floor-Length Royal Anarkali"
      },
      {
        type: "paragraph",
        content: "Sweeping down to the ankle with grand flare, the floor-length Anarkali offers maximum volume and regal poise. Tailors often craft this style using lightweight georgette, silk, or heavy brocade to achieve a dramatic fall."
      },
      {
        type: "callout",
        title: "Tailor's Pro Tip: The Kali Math",
        content: "To achieve maximum volume without feeling heavy around the waist, ask your tailor to use 24 to 32 individual kalis (vertical panels). This distributes fabric weight evenly for a graceful flare."
      },
      {
        type: "heading",
        title: "2. Asymmetrical & High-Low Anarkalis"
      },
      {
        type: "paragraph",
        content: "For fashion enthusiasts looking for a modern twist, the asymmetrical cut creates dynamic movement. Shorter in the front and sweeping longer at the back, this style pairs brilliantly with cigarette pants or embellished leggings."
      },
      {
        type: "blockquote",
        content: "A custom fitted bodice combined with soft cascading layers gives every woman the poise of royalty, personalized to her exact measurements.",
        authorQuote: "Meena Tailors Studio"
      },
      {
        type: "heading",
        title: "3. Jacket-Style Layered Anarkali"
      },
      {
        type: "paragraph",
        content: "Layering an embroidered sheer jacket or a contrasting velvet waistcoat over a subtle inner flare adds instant richness. It allows you to mix textures—such as organza with raw silk—creating a multidimensional festive ensemble."
      },
      {
        type: "heading",
        title: "4. Angrakha-Style Wrap Anarkali"
      },
      {
        type: "paragraph",
        content: "Inspired by royal court attire, the Angrakha overlap with handcrafted latkans (tassels) at the side bust creates an instantly slimming V-neckline silhouette."
      },
      {
        type: "key-takeaways",
        title: "Key Takeaways for Designing Your Anarkali",
        content: [
          "Choose breathable fabrics like georgette or chanderi for daytime events.",
          "Ensure the bodice length terminates exactly 1 inch above your natural waistline for ideal proportions.",
          "Pair high-flare suits with statement earrings and minimal neckpieces.",
          "Use AI Design Studio on Sui Dhaga to preview fabric combinations before sending your order to the tailor."
        ]
      }
    ]
  },
  {
    id: "perfect-fabric",
    slug: "perfect-fabric",
    title: "How to Choose the Perfect Fabric for Custom Outfits",
    excerpt: "A comprehensive guide to understanding fabrics, their feel, fall, drape, and occasion suitability.",
    badge: "FABRIC GUIDE",
    category: "Fabric Guides",
    image: "/images/blog/fabrics.png",
    imageCaption: "Exploring premium silk, cotton, chanderi, and organza swatches in the studio.",
    author: {
      name: "Stitch Craft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Fabric & Pattern Specialist",
      bio: "Curating luxury textiles and bespoke fit techniques for contemporary silhouettes."
    },
    date: "18 May 2024",
    readTime: "5 min read",
    tags: ["Fabric Guide", "Silk", "Cotton", "Textile Selection", "Custom Fit"],
    relatedSlugs: ["anarkali-styles", "summer-fabric-guide", "embroidery-guide"],
    sections: [
      {
        type: "paragraph",
        content: "Selecting the ideal fabric is the single most critical decision in custom tailoring. The right fabric dictates not only how an outfit looks under lighting, but also how it moves with your body and holds up over time."
      },
      {
        type: "heading",
        title: "Understanding Drape vs Structure"
      },
      {
        type: "paragraph",
        content: "Fabrics generally fall into two categories: fluid fabrics (like chiffon, crepe, georgette) which drape close to the silhouette, and structured fabrics (like raw silk, velvet, brocade, heavy linen) which hold distinct architectural shapes."
      },
      {
        type: "callout",
        title: "Fabric Rule of Thumb",
        content: "If your outfit features heavy embroidery or hand Zardozi work, select structured fabrics like Raw Silk or Chanderi that can support stitch weight without sagging."
      },
      {
        type: "heading",
        title: "Seasonal Fabric Recommendations"
      },
      {
        type: "list",
        title: "Best Choice by Season:",
        content: [
          "Summer Weddings: Chanderi silk, Tissue organza, Georgette, Fine Linen-cotton.",
          "Monsoon Celebrations: Rayon blends, Modal satin, Light synthetic silk.",
          "Winter Galas: Kanjeevaram silk, Velvet, Heavy Jacquard, Pashmina blends."
        ]
      },
      {
        type: "blockquote",
        content: "Never compromise on fabric quality—a great tailor can shape fabric, but high quality fabric gives the outfit its soul.",
        authorQuote: "Stitch Craft Master Weaver"
      }
    ]
  },
  {
    id: "custom-vs-readymade",
    slug: "custom-vs-readymade",
    title: "Custom Tailoring vs Ready-made: What's Better?",
    excerpt: "We break down the pros, cons, fit precision, durability, and value when choosing between custom tailoring and off-the-rack clothes.",
    badge: "TAILORING TIPS",
    category: "Tailoring Tips",
    image: "/images/blog/sketch.png",
    imageCaption: "Custom pattern drawing and precise body measurement mapping.",
    author: {
      name: "Aarav Bespoke",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      role: "Senior Tailoring Architect",
      bio: "Bespoke tailoring specialist dedicated to precision sizing and custom craftsmanship."
    },
    date: "15 May 2024",
    readTime: "4 min read",
    tags: ["Bespoke", "Ready-made", "Tailoring Tips", "Sizing", "Sustainability"],
    relatedSlugs: ["anarkali-styles", "embroidery-guide", "perfect-fabric"],
    sections: [
      {
        type: "paragraph",
        content: "In a world dominated by fast fashion, off-the-rack clothing promises instant gratification. However, anyone who has struggled with standard sizing charts knows the compromise that comes with ready-made garments."
      },
      {
        type: "heading",
        title: "1. The Fit Distinction: Standard vs Personal Anatomy"
      },
      {
        type: "paragraph",
        content: "Ready-made garments are standardized to average mass proportions. Custom tailoring on Sui Dhaga, however, accounts for asymmetrical shoulders, distinct armholes, torso lengths, and posture differences."
      },
      {
        type: "callout",
        title: "Did You Know?",
        content: "Over 85% of people require minor alterations on off-the-rack suits or ethnic sets. Custom tailoring eliminates alteration costs completely."
      },
      {
        type: "heading",
        title: "2. Personal Style & Customization Freedom"
      },
      {
        type: "paragraph",
        content: "When you tailor, you become the designer. You select sleeve styles, necklines, lining softness, pocket placements, and seam allowances."
      },
      {
        type: "key-takeaways",
        title: "Summary Comparison",
        content: [
          "Fit: Custom Tailoring offers 100% precision vs ready-made average sizing.",
          "Longevity: Custom garments feature generous inner seam margins for future adjustments.",
          "Uniqueness: Custom clothing guarantees zero wardrobe duplicates at events.",
          "Sustainability: Made-to-order models reduce textile waste dramatically."
        ]
      }
    ]
  },
  {
    id: "groom-wear-2024",
    slug: "groom-wear-2024",
    title: "Groom Wear Trends 2024: What's in Style",
    excerpt: "From sherwanis to indo-westerns, explore the top groom wear trends for your big day.",
    badge: "STYLE GUIDE",
    category: "Style Guides",
    image: "/images/blog/groomwear.png",
    imageCaption: "Bespoke velvet & raw silk sherwani design with intricate zardozi work.",
    author: {
      name: "Rohit Sharma",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      role: "Men's Fashion Consultant",
      bio: "Fashion strategist and stylist focusing on royal wedding attire and modern menswear."
    },
    date: "12 May 2024",
    readTime: "5 min read",
    tags: ["Groom Wear", "Sherwani", "Indo-Western", "Weddings", "Men's Fashion"],
    relatedSlugs: ["anarkali-styles", "perfect-fabric", "custom-vs-readymade"],
    sections: [
      {
        type: "paragraph",
        content: "Wedding menswear has evolved far beyond traditional heavy maroon sherwanis. The modern groom in 2024 embraces subtle pastels, textured jacquards, asymmetric cuts, and versatile Indo-Western jackets."
      },
      {
        type: "heading",
        title: "Pastel Royal Palette"
      },
      {
        type: "paragraph",
        content: "Mint green, ivory cream, dusty rose, and slate silver dominate wedding daytime ceremonies. Pairing these shades with fine gold thread accents creates a refined, understated elegance."
      },
      {
        type: "callout",
        title: "Groom Style Note",
        content: "Always coordinate your inner kurta fabric with the wedding theme, ensuring comfortable movement during rituals."
      }
    ]
  },
  {
    id: "embroidery-guide",
    slug: "embroidery-guide",
    title: "Hand Embroidery vs Machine Embroidery",
    excerpt: "Understand the differences, uses, art form, and which one is right for your custom outfit.",
    badge: "TAILORING TIPS",
    category: "Tailoring Tips",
    image: "/images/blog/embroidery.png",
    imageCaption: "Close-up of traditional hand threadwork and metallic thread detailing.",
    author: {
      name: "Stitch Craft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Master Embroidery Artisan",
      bio: "Promoting traditional craftsmanship and machine-assisted precision stitching."
    },
    date: "10 May 2024",
    readTime: "4 min read",
    tags: ["Embroidery", "Craftsmanship", "Handwork", "Zardozi", "Tailoring"],
    relatedSlugs: ["anarkali-styles", "perfect-fabric", "custom-vs-readymade"],
    sections: [
      {
        type: "paragraph",
        content: "Embroidery brings fabric to life with intricate textures, light reflection, and storytelling motifs. Understanding the distinction between artisanal handwork and computer-controlled machine stitching helps you choose the right style for your budget and timeline."
      },
      {
        type: "heading",
        title: "Artisanal Hand Embroidery (Zardozi, Aari, Chikankari)"
      },
      {
        type: "paragraph",
        content: "Hand embroidery is a labor of love. Master artisans spend dozens of hours crafting unique metallic wire, bead, and thread motifs. No two hand-embroidered motifs are identical, giving each outfit handcrafted soul."
      },
      {
        type: "heading",
        title: "Precision Machine Embroidery"
      },
      {
        type: "paragraph",
        content: "Machine stitching offers crisp uniformity, rapid turnaround times, and budget-friendly pricing. It is ideal for geometric borders, repeatable motifs, and daily wear accents."
      }
    ]
  },
  {
    id: "summer-fabric-guide",
    slug: "summer-fabric-guide",
    title: "Summer Fabric Guide: Stay Cool & Stylish",
    excerpt: "Beat the heat with these breathable fabrics perfect for summer outfits.",
    badge: "FABRIC GUIDE",
    category: "Fabric Guides",
    image: "/images/blog/summer.png",
    imageCaption: "Lightweight pastel summer collection fabrics with floral prints.",
    author: {
      name: "Meena Tailors",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      role: "Ethnic Fashion Stylist",
      bio: "Crafting lightweight, breathable silhouettes for everyday and festive summer wear."
    },
    date: "8 May 2024",
    readTime: "5 min read",
    tags: ["Summer Fashion", "Linen", "Mulmul", "Breathable Fabrics", "Style Tips"],
    relatedSlugs: ["perfect-fabric", "anarkali-styles", "custom-vs-readymade"],
    sections: [
      {
        type: "paragraph",
        content: "High temperatures demand fabrics that allow your skin to breathe while maintaining crisp structure. From pure organic mulmul to blended linens, here is how to curate your summer wardrobe."
      },
      {
        type: "heading",
        title: "1. Organic Mulmul & Cotton Satin"
      },
      {
        type: "paragraph",
        content: "Mulmul is revered for its soft weave and moisture-wicking properties. When tailored into loose-cut kurtas or flared skirts, it keeps you comfortable all day long."
      }
    ]
  }
];

// Helper functions for easy backend integration
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug || post.id === slug);
}

export function getRelatedPosts(currentSlug: string, count = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (currentPost && currentPost.relatedSlugs && currentPost.relatedSlugs.length > 0) {
    const related = currentPost.relatedSlugs
      .map((slug) => getBlogPostBySlug(slug))
      .filter((post): post is BlogPost => post !== undefined);
    if (related.length >= count) return related.slice(0, count);
  }

  // Fallback to other posts if relatedSlugs is short
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .slice(0, count);
}
