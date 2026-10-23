// Portfolio content adapted from Shaurya Gogia's supplied résumé.
// Add project repository/demo links only when their URLs are available.

export const profile = {
  name: "Shaurya Gogia",
  tagline: "Software Engineer · AI/ML Engineer · Data Engineer",
  roles: [
    "Software Engineer",
    "AI/ML Engineer",
    "Data Engineer",
    "Distributed Systems",
    "Cloud Services",
  ],
  intro:
    "Software Engineer with 2 years of experience across full-stack development, distributed systems, solution architecture, databases, AI/ML solutions, and cloud services.",
  location: "Delhi, India · Ready to relocate",
  openTo: "Software engineering opportunities",
  education: "MCA, Guru Nanak Institute of Management (GGSIPU) · 2025–2027",
  interests: "Distributed systems, solution architecture, AI/ML & cloud services",
  experience: "2 years in software development",
  github: "https://github.com/shauryagogia17",
  linkedin: "https://www.linkedin.com/in/shauryagogia17",
  email: "gogia.shaurya777@gmail.com",
  phone: "+91 99108 38777",
  phoneHref: "tel:+919910838777",
  resume: "/resume.pdf",
};

export const about = [
  "I'm Shaurya, a Software Engineer based in Delhi and ready to relocate. I have 2 years of experience building full-stack applications and backend services, with a focus on distributed systems, solution architecture, databases, AI/ML solutions, and cloud services.",
  "My work spans MERN applications, Python and Django APIs, and intelligent systems. My projects include AI-driven crop disease detection with IoT, facial emotion recognition, a Generative AI study assistant, and a healthcare assistant built with RAG, Agentic AI, and LLMs. I've also co-authored a peer-reviewed facial emotion detection paper and a book chapter on rural governance.",
  "I'm eager to learn and adopt emerging AI/ML technologies, explore new tools and frameworks, and apply them to practical problems. I enjoy adapting to new approaches and growing my skills across software, AI/ML, and data engineering.",
  "I'm pursuing a Master of Computer Applications at Guru Nanak Institute of Management (GGSIPU), with a first-year CGPA of 9.0/10. I completed my B.Sc. (Hons.) in Computer Science at Sharda University with a CGPA of 9.2/10 and First Division. My coursework includes data structures and algorithms, machine learning, artificial intelligence, databases, operating systems, computer networks, and web development.",
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "Java", "SQL", "HTML", "CSS"],
  "Tools, Frameworks & Libraries": [
    "React.js",
    "Node.js",
    "Express.js",
    "Django",
    "Git",
    "GitHub",
    "TensorFlow",
    "PyTorch",
    "OpenCV",
    "LangChain",
    "Docker",
    "Jupyter Notebook",
  ],
  "AI, ML & Generative AI": [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "YOLO",
    "NLP",
    "LLMs",
    "RAG",
    "AI Agents",
    "Prompt Engineering",
    "Vector Databases",
  ],
  "Data Engineering & Analytics": ["ETL", "Data Pipelines", "Data Warehousing", "Apache Spark"],
  "Software Architecture": [
    "Data Structures & Algorithms",
    "OOP",
    "System Design",
    "REST APIs",
    "Microservices",
    "Design Patterns",
    "Distributed Systems",
    "Unit Testing",
  ],
  "Cloud Services": ["AWS", "Azure", "Kubernetes", "Docker", "CI/CD", "GitHub Actions"],
  Databases: ["SQL", "NoSQL", "MongoDB", "PostgreSQL", "Vector Databases"],
};

export const categories = ["AI & IoT", "Machine Learning", "Generative AI"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  title: string;
  problem: string;
  category: Category;
  stack: string[];
  role: string;
  impact: string[];
  github?: string;
  demo?: string;
  diagram?: string[];
};

export const projects: Project[] = [
  {
    title: "AI-Driven IoT Crop Disease Management System",
    problem:
      "Identify plant diseases in real time and support smart agricultural monitoring with AI and IoT.",
    category: "AI & IoT",
    stack: ["Machine Learning", "YOLO", "IoT", "Web Development"],
    role: "Developer",
    impact: [
      "Developed an AI-powered crop disease detection system.",
      "Combined Machine Learning, YOLO, IoT, and web development for real-time plant disease identification.",
      "Enabled smart agricultural monitoring.",
    ],
  },
  {
    title: "Hybrid Facial Emotion Detection and Classification",
    problem:
      "Analyze facial expressions and classify human emotions using an intelligent recognition system.",
    category: "Machine Learning",
    stack: ["Machine Learning", "LLMs", "NLP"],
    role: "Developer",
    impact: [
      "Designed an intelligent emotion recognition system.",
      "Used Machine Learning, LLMs, and NLP to analyze facial expressions and classify emotions.",
    ],
  },
  {
    title: "AI Study Helper",
    problem:
      "Bring AI tutoring, study notes, quizzes, and summarization into a learning assistant.",
    category: "Generative AI",
    stack: ["Generative AI", "NLP"],
    role: "Developer",
    impact: [
      "Built a Generative AI and NLP-powered learning assistant.",
      "Integrated AI tutoring and automated notes generation.",
      "Added quiz creation and summarization to support learning.",
    ],
  },
  {
    title: "MedGuide AI",
    problem: "Simplify medical reports and make relevant medical information easier to understand.",
    category: "Generative AI",
    stack: ["RAG", "Agentic AI", "LLMs"],
    role: "Developer",
    impact: [
      "Developed an AI-powered healthcare assistant using RAG, Agentic AI, and LLMs.",
      "Simplified medical reports and retrieved relevant medical information.",
      "Generated context-aware explanations.",
    ],
  },
];

export type CertificateId =
  | "smart-india-hackathon-2024"
  | "deeksharambh-2024"
  | "persistent-infotech"
  | "academor-web-development";

export type Certificate = {
  id: CertificateId;
  title: string;
  kind: string;
  org: string;
  date?: string;
  issuedOn?: string;
  detail: string;
  tags: string[];
  file: string;
  preview: string;
  format: "PDF" | "JPG" | "PNG";
  signatories?: { role: string; name: string }[];
};

export type Credential = {
  kind: "Education" | "Certification";
  title: string;
  org?: string;
  year?: string;
  detail?: string;
  certificateId?: CertificateId;
};

export const credentials: Credential[] = [
  {
    kind: "Education",
    title: "Master of Computer Applications (MCA)",
    org: "Guru Nanak Institute of Management (GGSIPU) · Delhi, India",
    year: "2025 – 2027 · Pursuing",
    detail:
      "CGPA: 9.0/10 · First Division in First Year. Relevant coursework: Data Structures & Algorithms, Machine Learning, Artificial Intelligence.",
  },
  {
    kind: "Education",
    title: "Bachelor of Science (Hons.) in Computer Science",
    org: "Sharda University · Greater Noida, India",
    year: "2022 – 2025",
    detail:
      "CGPA: 9.2/10 · First Division. Relevant coursework: Python, Java, Data Structures, DBMS, Operating Systems, Computer Networks, Web Development.",
  },
  {
    kind: "Education",
    title: "Class XII · Senior Secondary Education",
    org: "Bal Bhavan Public School (CBSE) · Delhi, India",
    year: "2021 – 2022",
    detail: "91% · Scored 90%+ in all subjects.",
  },
  {
    kind: "Education",
    title: "Class X · Secondary Education",
    org: "Bal Bhavan Public School (CBSE) · Delhi, India",
    year: "2019 – 2020",
    detail: "85% · Scored 80%+ in all subjects.",
  },
  {
    kind: "Certification",
    title: "AI-103 · Developing AI Apps and Agents on Azure",
    org: "Microsoft",
  },
  {
    kind: "Certification",
    title: "Software Developer Internship Certificate",
    org: "Persistent Infotech",
    detail: "Successfully completed the Software Developer Intern program at Persistent Infotech.",
    certificateId: "persistent-infotech",
  },
  {
    kind: "Certification",
    title: "Web Development Internship Completion Certificate",
    org: "Academor",
    year: "2024",
    detail:
      "Completed a three-month Web Development internship and project from 1 May to 31 July 2024. Certificate issued on 3 September 2024.",
    certificateId: "academor-web-development",
  },
  {
    kind: "Certification",
    title: "Smart India Hackathon 2024 · Internal Round Participant",
    org: "Sharda University",
    year: "2024",
    detail: "Team AGREECULTURE",
    certificateId: "smart-india-hackathon-2024",
  },
  {
    kind: "Certification",
    title: "Deeksharambh 2024 · Volunteer Certificate of Appreciation",
    org: "Sharda University",
    year: "2024",
    certificateId: "deeksharambh-2024",
  },
];

// Existing certificate files retained for viewing and download.
export const certificates: Certificate[] = [
  {
    id: "academor-web-development",
    title: "Web Development Internship Completion Certificate",
    kind: "Internship Completion",
    org: "Academor",
    date: "2024",
    issuedOn: "3 September 2024",
    detail:
      "Awarded to Shaurya Gogia for completing a three-month internship and project in Web Development at Academor, from 1 May to 31 July 2024. Recognized as an energetic and keen learner during the internship program.",
    tags: ["Web Development", "Internship", "Academor"],
    file: "/certificates/academor-web-development-internship.png",
    preview: "/certificates/academor-web-development-internship.png",
    format: "PNG",
  },
  {
    id: "persistent-infotech",
    title: "Software Developer Internship Certificate",
    kind: "Internship Completion",
    org: "Persistent Infotech",
    detail:
      "Awarded to Shaurya Gogia for successfully completing the Software Developer Intern program at Persistent Infotech.",
    tags: ["Software Development", "Internship", "Persistent Infotech"],
    file: "/certificates/persistent-infotech-internship.jpg",
    preview: "/certificates/persistent-infotech-internship.jpg",
    format: "JPG",
    signatories: [
      { role: "Team Leader", name: "Sonam" },
      { role: "Authorized Signatory", name: "Prem Chandra" },
    ],
  },
  {
    id: "smart-india-hackathon-2024",
    title: "Smart India Hackathon 2024 · Internal Round",
    kind: "Participation",
    org: "Sharda University",
    date: "2024",
    detail:
      "Participated in the internal round of Smart India Hackathon 2024 at Sharda University as a member of Team AGREECULTURE.",
    tags: ["Hackathon", "Team AGREECULTURE", "Participation"],
    file: "/certificates/smart-india-hackathon-2024.pdf",
    preview: "/certificates/smart-india-hackathon-2024-preview.jpg",
    format: "PDF",
  },
  {
    id: "deeksharambh-2024",
    title: "Deeksharambh 2024 · Volunteer",
    kind: "Appreciation",
    org: "Sharda University",
    date: "2024",
    detail:
      "Received a Volunteer Certificate of Appreciation for contributing to Deeksharambh 2024 at Sharda University.",
    tags: ["Volunteering", "Appreciation", "Sharda University"],
    file: "/certificates/deeksharambh-2024-volunteer.pdf",
    preview: "/certificates/deeksharambh-2024-volunteer-preview.jpg",
    format: "PDF",
  },
];

export const research = [
  {
    title: "Hybrid Facial Emotion Detection and Classification",
    publication: "International Journal of Scientific Development and Research (IJSDR)",
    date: "April 2025 · Vol. 10, Issue 4",
    identifier: "ISSN: 2455-2631",
    detail:
      "Co-authored a peer-reviewed paper applying YOLO v3, deep learning, data preprocessing, and model evaluation to facial emotion detection, improving accuracy and processing efficiency over existing CNN-based approaches.",
  },
  {
    title: "Peace, Justice and Strong Institutions: A Survey of Rural Villages in Greater Noida",
    publication: "Book chapter · Bhumi Publishing",
    date: "May 2025",
    identifier: "ISBN: 978-93-48620-99-6",
    detail:
      "Co-authored a book chapter addressing the lack of rural governance data. Conducted a field survey and collected and analyzed data with a research team.",
  },
];

type Experience = {
  title: string;
  org: string;
  location: string;
  year: string;
  detail: string;
  certificateId?: CertificateId;
};

export const achievements: Experience[] = [
  {
    title: "Software Developer",
    org: "Viblin India Private Limited",
    location: "Noida, India",
    year: "Apr 2025 – Mar 2026",
    detail:
      "Developed scalable full-stack applications using React.js, Node.js, Express.js, and MongoDB (MERN). Designed RESTful APIs using OOP, System Design, and SDLC principles. Improved application performance through SEO, debugging, unit testing, and Git.",
  },
  {
    title: "Software Developer Intern",
    org: "Persistent Infotech",
    certificateId: "persistent-infotech",
    location: "Delhi NCR, India",
    year: "Jan 2025 – Mar 2025",
    detail:
      "Successfully completed the Software Developer Intern program. Built responsive web applications using React.js, Node.js, and JavaScript. Integrated RESTful APIs and AI chatbots to automate user interactions. Performed system testing, debugging, and Git-based version control.",
  },
  {
    title: "API Developer Intern",
    org: "Vivada Tech",
    location: "Chennai, India · Remote",
    year: "Jul 2024 – Jan 2025",
    detail:
      "Developed and tested RESTful APIs using Python and Django. Optimized backend services, database integration, and e-commerce transactions. Improved API reliability through debugging and backend testing.",
  },
  {
    title: "Web Developer Intern",
    org: "Academor Tech Solutions",
    certificateId: "academor-web-development",
    location: "Bengaluru, India · Remote",
    year: "May 2024 – Jul 2024",
    detail:
      "Built responsive websites using HTML, CSS, JavaScript, and Bootstrap. Increased user engagement by 15% through frontend improvements. Developed Django backend services and APIs for e-commerce applications.",
  },
];
