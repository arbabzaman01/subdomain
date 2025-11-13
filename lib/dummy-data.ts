export const dummyBrands = [
  { id: "1", name: "Samsung" },
  { id: "2", name: "Apple" },
  { id: "3", name: "Haier" },
  { id: "4", name: "LG" },
  { id: "5", name: "Sony" },
  { id: "6", name: "Dell" },
  { id: "7", name: "HP" },
  { id: "8", name: "Logitech" },
]

export const dummyProducts = [
  {
    id: "1",
    name: "Premium Laptop",
    price: 1500,
    category: "Electronics",
    brand: "Dell",
    images: ["/products/laptop-product.jpg"],
    availableInstallmentPlanIds: ["1", "2", "3"],
    dateAdded: new Date("2025-01-15"),
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 300,
    category: "Electronics",
    brand: "Sony",
    images: ["/products/headphones-product.jpg"],
    availableInstallmentPlanIds: ["1", "2"],
    dateAdded: new Date("2025-01-10"),
  },
  {
    id: "3",
    name: "Office Chair",
    price: 450,
    category: "Furniture",
    brand: "Samsung",
    images: ["/products/chair-product.jpg"],
    availableInstallmentPlanIds: ["1", "2", "3"],
    dateAdded: new Date("2025-01-08"),
  },
  {
    id: "4",
    name: "Desk Lamp",
    price: 80,
    category: "Furniture",
    brand: "Haier",
    images: ["/products/lamp-product.jpg"],
    availableInstallmentPlanIds: ["1"],
    dateAdded: new Date("2025-01-05"),
  },
  {
    id: "5",
    name: "USB Hub",
    price: 45,
    category: "Accessories",
    brand: "Logitech",
    images: ["/products/hub-product.jpg"],
    availableInstallmentPlanIds: ["1"],
    dateAdded: new Date("2025-01-02"),
  },
]

export const dummyInstallmentPlans = [
  {
    id: "1",
    months: 3,
    interestRate: 0,
    name: "3 Month Plan",
  },
  {
    id: "2",
    months: 6,
    interestRate: 2.5,
    name: "6 Month Plan",
  },
  {
    id: "3",
    months: 12,
    interestRate: 5,
    name: "12 Month Plan",
  },
]

export const dummyCarts = [
  {
    id: "1",
    userName: "Ahmed Hassan",
    product: "Premium Laptop",
    plan: "12 Month Plan",
    totalPrice: 1575,
    addedAt: new Date("2025-01-16T10:30:00"),
    status: "pending" as const,
  },
  {
    id: "2",
    userName: "Fatima Ali",
    product: "Wireless Headphones",
    plan: "3 Month Plan",
    totalPrice: 300,
    addedAt: new Date("2025-01-15T14:20:00"),
    status: "processed" as const,
  },
  {
    id: "3",
    userName: "Mohamed Saleh",
    product: "Office Chair",
    plan: "6 Month Plan",
    totalPrice: 461,
    addedAt: new Date("2025-01-15T09:15:00"),
    status: "pending" as const,
  },
]

export const dummyQueries = [
  {
    id: "1",
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    phone: "+966-555-123456",
    message: "I need more information about installment plans.",
    submittedAt: new Date("2025-01-16T08:00:00"),
    status: "open" as const,
  },
  {
    id: "2",
    name: "Hassan Mohamed",
    email: "hassan@example.com",
    phone: "+966-555-789012",
    message: "Can I get a discount on bulk orders?",
    submittedAt: new Date("2025-01-14T16:30:00"),
    status: "resolved" as const,
  },
  {
    id: "3",
    name: "Layla Karim",
    email: "layla@example.com",
    phone: "+966-555-345678",
    message: "Issue with payment processing.",
    submittedAt: new Date("2025-01-16T11:45:00"),
    status: "open" as const,
  },
]

export const dummyBranches = [
  {
    id: "1",
    name: "Main Branch",
    address: "Riyadh, Saudi Arabia",
    phone: "+966-11-1234567",
    mapLink: "https://maps.google.com",
  },
  {
    id: "2",
    name: "Eastern Region Branch",
    address: "Khobar, Saudi Arabia",
    phone: "+966-13-8765432",
    mapLink: "https://maps.google.com",
  },
  {
    id: "3",
    name: "Western Region Branch",
    address: "Jeddah, Saudi Arabia",
    phone: "+966-12-5555555",
    mapLink: "https://maps.google.com",
  },
]
