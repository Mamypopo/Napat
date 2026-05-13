import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "name",     title: "ชื่อโปรเจกต์", type: "string",  validation: (r) => r.required() }),
    defineField({ name: "slug",     title: "Slug",          type: "slug",    options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "type",     title: "ประเภท",        type: "string",  options: { list: [{ value: "case-study", title: "Case Study" }, { value: "project", title: "Project" }] }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category",      type: "string",  validation: (r) => r.required() }),
    defineField({ name: "year",     title: "ปี",            type: "string",  validation: (r) => r.required() }),
    defineField({ name: "span",     title: "Grid Span (1-12)", type: "number", validation: (r) => r.required().min(1).max(12) }),
    defineField({ name: "tags",     title: "Tech Stack",    type: "array",   of: [{ type: "string" }] }),
    defineField({ name: "desc",     title: "คำอธิบาย",     type: "text",    rows: 3 }),
    defineField({ name: "img",      title: "ภาพหน้าปก",    type: "image",   options: { hotspot: true } }),
    defineField({
      name: "images", title: "รูปเพิ่มเติม (Gallery)", type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "url",      title: "Live URL",      type: "url" }),
    defineField({ name: "role",     title: "Role ที่รับผิดชอบ", type: "string" }),
    defineField({
      name: "modules", title: "Modules", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", title: "ชื่อ Module", type: "string" },
          { name: "desc", title: "คำอธิบาย",   type: "text", rows: 2 },
        ],
        preview: { select: { title: "name", subtitle: "desc" } },
      }],
    }),
    defineField({ name: "problem",   title: "Problem",         type: "text",   rows: 3 }),
    defineField({ name: "solution",  title: "Solution",        type: "text",   rows: 3 }),
    defineField({ name: "outcome",   title: "ผลลัพธ์ (Impact)", type: "text",  rows: 2 }),
    defineField({ name: "duration",  title: "ระยะเวลา",        type: "string" }),
    defineField({ name: "scale",     title: "Scale / ขนาด",    type: "string" }),
    defineField({ name: "teamSize",  title: "Team Size",        type: "string" }),
    defineField({ name: "featured",      title: "แสดงใน Slider",    type: "boolean", initialValue: false }),
    defineField({ name: "sliderQuote",   title: "Slider Quote",      type: "text",    rows: 2 }),
    defineField({ name: "accentColor",   title: "Accent Color (hex)", type: "string"  }),
    defineField({
      name: "sliderStats", title: "Slider Stats (3 ช่อง)", type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "value", title: "ค่า", type: "string" },
          { name: "label", title: "Label", type: "string" },
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),
    defineField({ name: "order",     title: "ลำดับการแสดง",    type: "number" }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "img" },
  },
});
