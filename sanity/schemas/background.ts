import { defineType, defineField } from "sanity";

const tabFields = [
  defineField({ name: "period",      title: "Period (เช่น 2019 — 2023)",  type: "string" }),
  defineField({ name: "role",        title: "Role / Degree",               type: "string" }),
  defineField({ name: "org",         title: "Organization / University",   type: "string" }),
  defineField({ name: "location",    title: "Location",                    type: "string" }),
  defineField({ name: "description", title: "Description",                 type: "text", rows: 3 }),
  defineField({
    name: "highlights", title: "Highlights (bullet points)",
    type: "array", of: [{ type: "string" }],
  }),
  defineField({ name: "badge",       title: "Badge text (เช่น GRADUATED)", type: "string" }),
  defineField({ name: "badgeAccent", title: "Badge สีเขียว (กำลังทำอยู่)?", type: "boolean", initialValue: false }),
  defineField({
    name: "metrics", title: "Metrics (4 ช่อง)",
    type: "array",
    of: [{
      type: "object",
      fields: [
        { name: "value",  title: "ค่า (เช่น -40%)",  type: "string" },
        { name: "label",  title: "Label",             type: "string" },
        { name: "accent", title: "สี Purple?",        type: "boolean", initialValue: false },
      ],
      preview: { select: { title: "value", subtitle: "label" } },
    }],
  }),
];

export const background = defineType({
  name: "background",
  title: "Background (Education · Experience · Freelance)",
  type: "document",
  fields: [
    defineField({ name: "education",  title: "Education",  type: "object", fields: tabFields }),
    defineField({ name: "experience", title: "Experience", type: "object", fields: tabFields }),
    defineField({ name: "freelance",  title: "Freelance",  type: "object", fields: tabFields }),
  ],
  preview: { prepare: () => ({ title: "Background" }) },
});
