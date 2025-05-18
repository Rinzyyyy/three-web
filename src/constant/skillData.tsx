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
  title: "Front-End experience",
  content: [
    {
      subtitle: "React / Next.js",
      content: "API Routes , Metadata SEO",
    },
    {
      subtitle: "State & Data Management",
      content:
        "React Query , useSWR , useContext , Redux Toolkit",
    },
    {
      subtitle: "UI Frameworks",
      content: "Ant Design,  Tailwind CSS, Sass (SCSS)",
    },
    {
      subtitle: "Responsive Design",
      content: "Next.js userAgent , CSS Media Queries, Tailwind",
    },
    {
      subtitle: "Libraries",
      content:
        "dnd-kit (drag-and-drop sorting) , React Quill (rich text editor) ",

      contentTwo: "react-pdf (export as PDF) , ExcelJS (export as Excel",
    },
    {
      subtitle: "3D Interactive Development",
      content: "React Three Fiber",
      mt: 0.25,
    },
  ],
};

const BackEndArticle: ArticleDataInfo = {
  title: "Back-End experience",
  content: [
    {
      subtitle: "Authentication & Encryption",
      content: "JWT with Refresh Token , RSA + AES hybrid encryption",
    },
    {
      subtitle: "Supabase",
      content:
        "PostgreSQL , Realtime , RLS (Row Level Security) for permission policies",
    },
    {
      subtitle: "Drizzle ORM + Deno Oak",
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
  ballColor: string;
  lightColor: string;
  titleColor: string;
  rotation: number;
  content: ArticleDataInfo;
};

export const skills: Skill[] = [
  {
    name: "Project",
    sPosition: [-5, 2, -2],
    ballColor: "#fdfdfc",
    lightColor: "#f9f9f9",
    titleColor: "",
    rotation: 0,
    content: projectArticle,
  },
  {
    name: "Front-End",
    sPosition: [0, 2, 3.5],
    ballColor: "#acd6dd",
    lightColor: "#b3f0fc",
    titleColor: "#c31f1f",
    rotation: 0,
    content: frontEndArticle,
  },
  {
    name: "Back-End",
    sPosition: [4, 2, -1.5],
    ballColor: "#f9e3f9",
    lightColor: "#f2f2f2",
    titleColor: "#fcd306",
    rotation: -1.96,
    content: BackEndArticle,
  },
];
