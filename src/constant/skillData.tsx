export type ArticleDataInfo = {
  title: string;
  content: {
    subtitle: string;
    content: string;
    contentTwo?: string;
    mt?: number;
  }[];
};

const frontEndArticle: ArticleDataInfo = {
  title: "Front-End Skills",
  content: [
    {
      subtitle: "React / Next.js",
      content: "API Routes , Metadata SEO",
    },
    {
      subtitle: "State & Data Management",
      content:
        "useQuery , useSWR , useSWRInfinite , useContext , Redux Toolkit",
    },
    {
      subtitle: "UI Frameworks",
      content: "Ant Design,  Tailwind CSS, Sass (SCSS) Responsive",
    },
    {
      subtitle: "Responsive Design",
      content: "Next.js userAgent ,  CSS Media Queries, Tailwind",
    },
    {
      subtitle: "Libraries",
      content:
        "dnd-kit (drag-and-drop sorting) , React Quill (rich text editor) ",

      contentTwo: "react-pdf (export as PDF) , ExcelJS (export as Excel",
    },
    {
      subtitle: "3D Interactive Development",
      content: "React Three Fibe",
      mt: 0.25,
    },
  ],
};

const BackEndArticle: ArticleDataInfo = {
  title: "Back-End Skills",
  content: [
    {
      subtitle: "Authentication & Encryption",
      content: "JWT with Refresh Token、 RSA + AES hybrid encryption",
    },
    {
      subtitle: "Supabase",
      content:
        "PostgreSQL , Realtime , RLS (Row Level Security) for permission policies",
    },
    {
      subtitle: "Drizzle ORM + Deno",
      content: "Type-safe API development within Supabase Edge Functions,",
      contentTwo: "with flexible database migrations",
    },
    {
      subtitle: "Redis",
      content: " Caches request data to reduce redundant database queries",
      contentTwo: " enhancing performance and reducing latency",
      mt: 0.25,
    },
    {
      subtitle: "Google Cloud Platform (GCP)",
      content: "Deploy applications to Cloud Run,",
      contentTwo: "and use Cloud Build to automate CI/CD pipelines",
      mt: 0.5,
    },
  ],
};

const projectArticle: ArticleDataInfo = {
  title: "",
  content: [
    {
      subtitle: "",
      content: "",
    },
  ],
};

export type SkillEnumType = "Front-End" | "Back-End" | "Project";

export type Skill = {
  name: SkillEnumType;
  sPosition: [number, number, number];
  color: string;
  lightColor: string;
  rotation: number;
  content: ArticleDataInfo;
};

export const skills: Skill[] = [
  {
    name: "Front-End",
    sPosition: [0, 1.2, 1],
    color: "#BDDADF",
    lightColor: "#b3f0fc",
    rotation: 0,
    content: frontEndArticle,
  },
  {
    name: "Back-End",
    sPosition: [1.3, 1.3, -0.6],
    color: "#f9eff9",
    lightColor: "#b3f0fc",
    rotation: -2,
    content: BackEndArticle,
  },
  {
    name: "Project",
    sPosition: [-1.3, 1.5, -0.6],
    color: "#f9ebd9",
    lightColor: "#f9ebd9",
    rotation: 2,
    content: projectArticle,
  },
];
