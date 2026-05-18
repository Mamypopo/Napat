import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name",       title: "ชื่อ",           type: "string" }),
    defineField({ name: "nickname",   title: "ชื่อเล่น",       type: "string" }),
    defineField({ name: "jobTitle",   title: "Job Title",      type: "string" }),
    defineField({ name: "location",   title: "Location",       type: "string" }),
    defineField({ name: "heroTagline",   title: "Hero Tagline (TH)",           type: "text",   rows: 2 }),
    defineField({ name: "heroTaglineEn", title: "Hero Tagline (EN)",           type: "text",   rows: 2 }),
    defineField({ name: "bio",           title: "Bio ย่อหน้า 1 (TH)",         type: "text",   rows: 3 }),
    defineField({ name: "bioEn",         title: "Bio ย่อหน้า 1 (EN)",         type: "text",   rows: 3 }),
    defineField({ name: "bio2",          title: "Bio ย่อหน้า 2 (TH)",         type: "text",   rows: 3 }),
    defineField({ name: "bio2En",        title: "Bio ย่อหน้า 2 (EN)",         type: "text",   rows: 3 }),
    defineField({ name: "available",          title: "Available for Work",          type: "boolean", initialValue: true }),
    defineField({ name: "availabilityText",   title: "Availability Text (TH)",      type: "string",  initialValue: "Available · Freelance & Full-time" }),
    defineField({ name: "availabilityTextEn", title: "Availability Text (EN)",      type: "string",  initialValue: "Available · Freelance & Full-time" }),
    defineField({ name: "avatar",     title: "รูปโปรไฟล์",    type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImage",  title: "Hero Background Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "resumeUrl",  title: "Resume URL (PDF)", type: "url" }),
    defineField({ name: "resumeFile", title: "Resume File (อัปโหลดไฟล์ PDF)", type: "file", options: { accept: ".pdf" } }),

    // Contact
    defineField({ name: "phone",      title: "เบอร์โทร (optional)", type: "string" }),
    defineField({ name: "workMode",   title: "Work Mode",      type: "string", options: { list: ["Remote", "Onsite", "Hybrid", "Remote & Onsite"] } }),
    defineField({
      name: "languages", title: "ภาษา",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "lang",  title: "ภาษา",  type: "string" },
          { name: "level", title: "ระดับ", type: "string", options: { list: ["Native", "Fluent", "Conversational", "Basic"] } },
        ],
        preview: { select: { title: "lang", subtitle: "level" } },
      }],
    }),
    defineField({ name: "email",      title: "Email",          type: "string" }),
    defineField({ name: "github",     title: "GitHub URL",     type: "url" }),
    defineField({ name: "linkedin",   title: "LinkedIn URL",   type: "url" }),
    defineField({ name: "line",       title: "LINE ID",        type: "string" }),
    defineField({ name: "instagram",  title: "Instagram URL",  type: "url" }),
    defineField({ name: "discord",    title: "Discord URL",    type: "url" }),
    defineField({ name: "facebook",   title: "Facebook URL",   type: "url" }),

    // Skills (About section)
    defineField({
      name: "skills", title: "Skills", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name",  title: "ชื่อ Skill",  type: "string" },
          { name: "level", title: "ระดับ",        type: "string", options: { list: ["Expert", "Advanced", "Proficient"] } },
        ],
        preview: { select: { title: "name", subtitle: "level" } },
      }],
    }),

    // Stats
    defineField({
      name: "stats", title: "Stats", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "value",   title: "ค่า (เช่น 24+)", type: "string" },
          { name: "label",   title: "Label (TH)",      type: "string" },
          { name: "labelEn", title: "Label (EN)",      type: "string" },
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "jobTitle", media: "avatar" },
  },
});
