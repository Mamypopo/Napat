export type Project = {
  id: string;
  slug: string;
  name: string;
  type: "case-study" | "project";
  category: string;
  year: string;
  tags: string[];
  desc: string;
  img: string;
  span: number; // grid column span (out of 12)
  url?: string;
  // case-study only
  modules?: string[];
  role?: string;
  problem?: string;
  solution?: string;
};

export const projects: Project[] = [
  // ── Large (case-study → /projects/[slug]) ──────────────────
  // ── Large (case-study → /projects/[slug]) — asymmetric spans
  { id: "parttime",       slug: "parttime",       span: 7, name: "เว็บ Parttime",          type: "case-study", category: "Web Platform · 2024", year: "2024", tags: ["Next.js", "TypeScript", "PostgreSQL", "REST API"],    desc: "ระบบจัดการงาน parttime ครบวงจร ตั้งแต่สมัครงาน ติดตามชั่วโมง จนถึงจ่ายเงิน",                                                  img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80", role: "Full-Stack Developer", modules: ["ระบบสมัครงาน", "Time Tracking", "Payroll", "Admin Dashboard"] },
  { id: "alien-health",   slug: "alien-health",   span: 5, name: "ตรวจสุขภาพต่างด้าว",    type: "case-study", category: "Healthcare · 2024",   year: "2024", tags: ["React", "Node.js", "MySQL", "PDF Generation"],        desc: "ระบบตรวจสุขภาพแรงงานต่างด้าว จัดการข้อมูลผู้ป่วย ออกใบรับรองแพทย์ และส่งข้อมูลหน่วยงานรัฐ",                               img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=80", role: "Full-Stack Developer", modules: ["Patient Registration", "ตรวจสุขภาพ", "ออกใบรับรอง", "รายงาน"] },
  { id: "checkup",        slug: "checkup",        span: 4, name: "เว็บ Checkup",            type: "case-study", category: "Healthcare · 2024",   year: "2024", tags: ["React", "TypeScript", "Express", "PostgreSQL"],       desc: "ระบบตรวจสุขภาพประจำปีสำหรับองค์กร จัดการนัดหมาย ผลแล็บ และรายงานสุขภาพรายบุคคล",                                            img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80", role: "Full-Stack Developer", modules: ["นัดหมาย", "ผลแล็บ", "Health Report", "Admin"] },
  { id: "his",            slug: "his",            span: 8, name: "HIS",                     type: "case-study", category: "Healthcare · 2023",   year: "2023", tags: ["React", "Node.js", "MySQL", "HL7"],                  desc: "Hospital Information System ระบบบริหารโรงพยาบาลครบวงจร ตั้งแต่ OPD/IPD จนถึงการเงินและคลังยา",                              img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&q=80", role: "Full-Stack Developer", modules: ["OPD", "IPD", "ห้องยา", "การเงิน", "คลังสินค้า", "รายงาน", "Admin"] },
  { id: "crm",            slug: "crm",            span: 5, name: "CRM",                     type: "case-study", category: "SaaS · 2024",         year: "2024", tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],      desc: "ระบบ CRM สำหรับทีมขาย จัดการลูกค้า ติดตาม deal pipeline และ analytics ยอดขาย",                                              img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80", role: "Full-Stack Developer", modules: ["Contact Management", "Deal Pipeline", "Analytics", "Email Integration"] },
  { id: "knowy",          slug: "knowy",          span: 7, name: "Knowy",                   type: "case-study", category: "AI · 2025",           year: "2025", tags: ["Next.js", "Python", "OpenCV", "FastAPI"],            desc: "ระบบกล้อง AI วิเคราะห์ภาพ real-time สำหรับงาน quality control และ object detection ในโรงงาน",                                img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&q=80", role: "Full-Stack Developer", modules: ["Camera Feed", "AI Detection", "Alert System", "Dashboard"] },
  { id: "ontrack",        slug: "ontrack",        span: 12, name: "OnTrack",                type: "case-study", category: "Management · 2025",   year: "2025", tags: ["React", "TypeScript", "Node.js", "WebSocket"],       desc: "ระบบจัดการ tablet ในองค์กร ติดตาม device status real-time ควบคุมจากส่วนกลาง",                                                img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=900&q=80", role: "Full-Stack Developer", modules: ["Device Management", "Real-time Monitor", "Remote Control", "Reports"] },

  // ── Small (project → modal) — asymmetric spans
  { id: "ocr",            slug: "ocr",            span: 4, name: "เว็บ OCR",               type: "project",    category: "Tool · 2024",         year: "2024", tags: ["React", "Tesseract.js"],                              desc: "เว็บแปลงรูปภาพเป็นข้อความด้วย OCR รองรับภาษาไทยและอังกฤษ",                                                                  img: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=600&q=80" },
  { id: "qrcode",         slug: "qrcode",         span: 3, name: "Gen QRCode",             type: "project",    category: "Tool · 2024",         year: "2024", tags: ["React", "qrcode.js"],                                 desc: "เว็บ generate QR Code พร้อม customize สี logo และ download",                                                                  img: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&q=80" },
  { id: "random-activity",slug: "random-activity",span: 5, name: "สุ่มกิจกรรม",            type: "project",    category: "Tool · 2023",         year: "2023", tags: ["React", "Framer Motion"],                             desc: "เว็บสุ่มกิจกรรมสำหรับทีมในบริษัท พร้อม animation และ customize รายการได้",                                                   img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" },
  { id: "school",         slug: "school",         span: 5, name: "เว็บโรงเรียน",           type: "project",    category: "Education · 2023",    year: "2023", tags: ["React", "Node.js", "MySQL"],                         desc: "ระบบทำข้อสอบออนไลน์และส่งงานสำหรับโรงเรียน",                                                                                img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80" },
  { id: "flowtrak",       slug: "flowtrak",       span: 4, name: "Flowtrak",               type: "project",    category: "Tool · 2024",         year: "2024", tags: ["React", "TypeScript", "Supabase"],                   desc: "เว็บติดตามงานและ task management สำหรับทีมเล็ก",                                                                              img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80" },
  { id: "cubic",          slug: "cubic",          span: 3, name: "Cubic",                  type: "project",    category: "Game · 2025",         year: "2025", tags: ["React", "Three.js", "WebSocket"],                    desc: "เว็บเกม office metaverse เดินในออฟฟิศ virtual พร้อม multiplayer",                                                             img: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=600&q=80" },
  { id: "padpro",         slug: "padpro",         span: 4, name: "PadPro",                 type: "project",    category: "Tool · 2024",         year: "2024", tags: ["React", "TypeScript"],                               desc: "แอปจดโน้ตและ notepad สำหรับ professional",                                                                                    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80" },
  { id: "translate",      slug: "translate",      span: 5, name: "Service Translation",    type: "project",    category: "AI · 2024",           year: "2024", tags: ["Next.js", "OpenAI API"],                             desc: "บริการแปลภาษาด้วย AI รองรับหลายภาษาพร้อม context-aware translation",                                                         img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80" },
  { id: "mooprompt",      slug: "mooprompt",      span: 3, name: "MooPrompt",              type: "project",    category: "F&B · 2024",          year: "2024", tags: ["Next.js", "Prisma", "Stripe"],                       desc: "เว็บสั่งอาหารออนไลน์สำหรับร้านหมูกระทะชาบู พร้อมระบบ queue และ table management",                                           img: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=80" },
];

export const largeProjects = projects.filter((p) => p.type === "case-study");
export const smallProjects = projects.filter((p) => p.type === "project");
