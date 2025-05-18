import * as THREE from "three";

export const projectArticleList: {
  id: string;
  title: string;
  subtitle: string;
  article: string[];
  position: THREE.Vector3;
  tagPosition: THREE.Vector3;
  tagSize: [number, number];
  iconBarSize: number;
  side: "right" | "left";
  size: {
    width: number;
    height: number;
    thick: number;
  };
}[] = [
  {
    id: "e-commerce",
    title: "E-commerce",
    subtitle: "* Next.js + Supabase + Tailwind + Deno *",
    article: [
      "• SEO Optimization (Next.js Metadata)",
      "• Authentication & Encryption (JWT authentication, RSA + AES hybrid encryption)",
      "• Store-to-store map integration (Next.js API Routes)",
      "• Infinite scrolling with pagination(useSWRInfinite)",
      "• Dynamic Tree Diagram (React-d3-tree)",
      "• Real-Time Chat (Socket.io + Supabase Realtime)",
      "• Type-safe API development (Drizzle ORM + Deno Oak + Redis)",
    ],
    position: new THREE.Vector3(28.5, 25, 40),
    size: { width: 25, height: 10, thick: 1 },
    tagPosition: new THREE.Vector3(-15, 6, 20),
    tagSize: [10, 2],
    iconBarSize: 25,
    side: "right",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    subtitle: "* React + Ant Design + useQuery *",
    article: [
      "• Advanced product filtering and keyword search",
      "• Export single/multiple orders to Excel",
      "• Support for printing PDF shipping labels",
      "• Role-based access control (useOutletContext for content visibility restrictions)",
      "• Frontend display ordering (dnd-kit drag-and-drop sorting)",
      "• WYSIWYG Editor Editor (React Quill)",
    ],
    position: new THREE.Vector3(28.5, 25, 70),
    size: { width: 22, height: 9, thick: 1 },
    tagPosition: new THREE.Vector3(-10, 6, 2),
    tagSize: [8, 2],
    iconBarSize: 22,
    side: "right",
  },
  {
    id: "game",
    title: "Game Platform",
    subtitle: "* React + Redux Toolkit *",
    article: [
      "• API integration (ReactQuery)",
      "• responsive design & animation effects",
      "• Line LIFF Integration-Auto-login (ngrok tunneling)",
    ],

    position: new THREE.Vector3(-28.5, 30, 30),
    size: { width: 14, height: 6, thick: 1 },
    tagPosition: new THREE.Vector3(18, 4, 22),
    tagSize: [10, 2],
    iconBarSize: 8,
    side: "left",
  },
  {
    id: "landingPage",
    title: "Landing Pages",
    subtitle: "* Next.js + Lerna Mono-Repo *",
    article: [
      "• Mono-Repo (setup to manage multiple landing page versions)",
      "• sharing components and templates,to improve development efficiency",
    ],
    position: new THREE.Vector3(-28.5, 24, 50),
    size: { width: 19, height: 6, thick: 1 },
    tagPosition: new THREE.Vector3(10, 5, 10),
    tagSize: [10, 2],
    iconBarSize: 8,
    side: "left",
  },
  {
    id: "edm",
    title: "EDM",
    subtitle: "* Email Marketing *",
    article: ["• HTML + CSS development of EDM email templates"],
    size: { width: 14, height: 4, thick: 1 },
    position: new THREE.Vector3(-28.5, 20, 70),
    tagPosition: new THREE.Vector3(5, 5, 1),
    tagSize: [5, 2],
    iconBarSize: 4,
    side: "left",
  },
];
