import * as THREE from "three";

export const projectArticleList: {
  title: string;
  subtitle: string;
  article: string[];
  position: THREE.Vector3;
  tagPosition: THREE.Vector3;
  tagSize: [number, number];
  side: "right" | "left";
  size: {
    width: number;
    height: number;
    thick: number;
  };
}[] = [
  {
    title: "E-commerce Platform",
    subtitle: "* Next.js + Supabase + useSWR + Tailwind *",
    article: [
      "• SEO Optimization (Next.js Metadata)",
      "• Authentication & Encryption (JWT authentication, RSA + AES hybrid encryption)",
      "• Store-to-store map integration (Next.js API Routes)",
      "• Infinite scrolling with pagination(useSWRInfinite)",
      "• Dynamic Tree Diagram (React-d3-tree)",
      "• Real-Time Chat (Socket.io + Supabase Realtime)",
    ],
    position: new THREE.Vector3(29, 20, 40),
    size: { width: 23, height: 9, thick: 1 },
    tagPosition: new THREE.Vector3(-15, 7, 20),
    tagSize: [15, 2],
    side: "right",
  },
  {
    title: "Admin Dashboard",
    subtitle: "* React + Ant Design + useQuery *",
    article: [
      "• Advanced product filtering and keyword search",
      "• Export single/multiple orders to Excel",
      "• Support for printing PDF shipping labels",
      "• Role-based access control (useOutletContext for content visibility restrictions)",
      "• Frontend display ordering (dnd-kit drag-and-drop sorting)",
      "• Rich Text Editor (React Quill)",
    ],
    position: new THREE.Vector3(29, 20, 70),
    size: { width: 22, height: 9, thick: 1 },
    tagPosition: new THREE.Vector3(-10, 8, 1),
    tagSize: [12, 2],
    side: "right",
  },
  {
    title: "Game Platform",
    subtitle: "* React + Redux Toolkit *",
    article: [
      "• API integration (useQuery)",
      "• responsive design & animation effects",
      "• Line LIFF Integration-Auto-login (ngrok tunneling)",
    ],

    position: new THREE.Vector3(-29, 24, 30),
    size: { width: 14, height: 6, thick: 1 },
    tagPosition: new THREE.Vector3(20, 8, 22),
    tagSize: [10, 2],
    side: "left",
  },
  {
    title: "Landing Pages",
    subtitle: "* Next.js + Lerna Mono-Repo *",
    article: [
      "• Mono-Repo (setup to manage multiple landing page versions)",
      "• sharing components and templates,to improve development efficiency",
    ],
    position: new THREE.Vector3(-29, 20, 50),
    size: { width: 19, height: 6, thick: 1 },
    tagPosition: new THREE.Vector3(9, 8, 8),
    tagSize: [10, 2],
    side: "left",
  },
  {
    title: "EDM",
    subtitle: "* Email Marketing *",
    article: ["• HTML + CSS development of EDM email templates"],
    size: { width: 14, height: 4, thick: 1 },
    position: new THREE.Vector3(-29, 15, 70),
    tagPosition: new THREE.Vector3(6, 9, 1),
    tagSize: [5, 1.5],
    side: "left",
  },
];
