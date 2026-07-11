export const navItems = [
  { label: "Find a Tailor", href: "/tailors" },
  { label: "AI Design Studio", href: "/design-studio" },
  { label: "Community", href: "/community" },
  { label: "How It Works", href: "/faqs" },
  { label: "Pricing", href: "/checkout" },
];

export const tailors = [
  {
    id: "rekha-tailors",
    name: "Rekha Tailors",
    handle: "@rekhatailors",
    owner: "Rekha Verma",
    rating: "4.8",
    reviews: "128",
    distance: "0.6 km",
    price: "Rs1,000",
    delivery: "3-5 days",
    specialty: "Women's Wear",
    city: "Jaipur, Rajasthan",
    status: "Verified",
  },
  {
    id: "stitch-craft",
    name: "Stitch Craft",
    handle: "@stitchcraft",
    owner: "Neha Sharma",
    rating: "4.6",
    reviews: "64",
    distance: "1.2 km",
    price: "Rs1,500",
    delivery: "4-6 days",
    specialty: "Men's Wear",
    city: "Mumbai, Maharashtra",
    status: "Verified",
  },
  {
    id: "aarav-bespoke",
    name: "Aarav Bespoke",
    handle: "@aaravbespoke",
    owner: "Aarav Khan",
    rating: "4.7",
    reviews: "96",
    distance: "2.1 km",
    price: "Rs2,000",
    delivery: "5-7 days",
    specialty: "Ethnic Wear",
    city: "Bengaluru, Karnataka",
    status: "Pending",
  },
  {
    id: "noor-thread",
    name: "Noor & Thread",
    handle: "@noorandthread",
    owner: "Noor Fatima",
    rating: "4.5",
    reviews: "34",
    distance: "3.4 km",
    price: "Rs1,200",
    delivery: "7-10 days",
    specialty: "Bridal Wear",
    city: "Delhi, India",
    status: "Verified",
  },
];

export const designs = [
  { title: "Pastel Anarkali", type: "Anarkali", saved: "10 May, 2024" },
  { title: "Blue Lehenga", type: "Lehenga", saved: "12 May, 2024" },
  { title: "Oman Kurta Set", type: "Kurta", saved: "14 May, 2024" },
  { title: "Floral Gown", type: "Gown", saved: "18 May, 2024" },
  { title: "Peach Sharara", type: "Sharara", saved: "21 May, 2024" },
  { title: "Tulip Saree", type: "Saree", saved: "22 May, 2024" },
];

export const orders = [
  { id: "SD1256", item: "Custom Anarkali Suit", tailor: "Rekha Tailors", date: "20 May, 2024", amount: "Rs2,000", status: "In Progress" },
  { id: "SD1250", item: "Lehenga Set", tailor: "Stitch Craft", date: "18 May, 2024", amount: "Rs1,200", status: "Processing" },
  { id: "SD1048", item: "Sherwani", tailor: "Aarav Bespoke", date: "18 May, 2024", amount: "Rs1,800", status: "Delivered" },
  { id: "SD1040", item: "Kurta Set", tailor: "Noor & Thread", date: "10 May, 2024", amount: "Rs1,600", status: "Delivered" },
];

export const appointments = [
  { tailor: "Rekha Tailors", service: "Custom Stitching", date: "20 May, 2024", time: "2:00 PM", status: "Upcoming" },
  { tailor: "Stitch Craft", service: "Blouse Stitching", date: "23 May, 2024", time: "11:00 AM", status: "Upcoming" },
  { tailor: "Aarav Bespoke", service: "Men's Sherwani", date: "25 May, 2024", time: "4:00 PM", status: "Upcoming" },
];

export const adminUsers = [
  { name: "Ayesha Khan", role: "Customer", email: "ayesha.khan@email.com", status: "Active" },
  { name: "Rahul Verma", role: "Customer", email: "rahul.verma@email.com", status: "Active" },
  { name: "Stitch Craft", role: "Tailor", email: "stitchcraft@email.com", status: "Active" },
  { name: "Design Lover", role: "Customer", email: "design.lover@email.com", status: "Blocked" },
  { name: "Tailor Pro", role: "Tailor", email: "tailorpro@email.com", status: "Active" },
];
