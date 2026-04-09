export type Gender = "M" | "F";

export type LabItem = {
  key: string;
  label: string;
  unit: string;
  ref?: (age: number, gender: Gender) => [number, number];
  step?: number;
  options?: string[];
  normalValues?: string[];
  group?: string;
};

export type LabPanel = {
  id: string;
  label: string;
  items: LabItem[];
  interpret: (values: Record<string, string>, age: number, gender: Gender) => string;
};

/* ── CBC ──────────────────────────────────────────────────── */
const CBC_ITEMS: LabItem[] = [
  { key: "wbc",   label: "WBC",        unit: "×10³/μL",  ref: () => [4.5, 11.0],                                  step: 0.1  },
  { key: "rbc",   label: "RBC",        unit: "×10⁶/μL",  ref: (_, g) => g === "M" ? [4.5, 5.5] : [4.0, 5.0],    step: 0.01 },
  { key: "hgb",   label: "Hemoglobin", unit: "g/dL",     ref: (_, g) => g === "M" ? [13.5, 17.5] : [12.0, 15.5], step: 0.1  },
  { key: "hct",   label: "Hematocrit", unit: "%",        ref: (_, g) => g === "M" ? [41, 53] : [36, 46],          step: 0.1  },
  { key: "mcv",   label: "MCV",        unit: "fL",       ref: () => [80, 100],                                     step: 0.1  },
  { key: "mch",   label: "MCH",        unit: "pg",       ref: () => [27, 33],                                      step: 0.1  },
  { key: "mchc",  label: "MCHC",       unit: "g/dL",     ref: () => [32, 36],                                      step: 0.1  },
  { key: "plt",   label: "Platelets",  unit: "×10³/μL",  ref: () => [150, 400],                                    step: 1    },
];

/* ── UA (Urinalysis) ──────────────────────────────────────── */
const DIPSTICK = ["Negative", "Trace", "1+", "2+", "3+", "4+"];
const UA_ITEMS: LabItem[] = [
  { key: "ua_color",   label: "Color",           unit: "", options: ["Yellow","Pale Yellow","Amber","Brown","Red","Colorless"], normalValues: ["Yellow","Pale Yellow"] },
  { key: "ua_appear",  label: "Appearance",      unit: "", options: ["Clear","Slightly turbid","Turbid","Cloudy"],              normalValues: ["Clear"]               },
  { key: "ua_ph",      label: "pH",              unit: "", ref: () => [4.5, 8.0],    step: 0.5  },
  { key: "ua_sg",      label: "Sp. Gravity",     unit: "", ref: () => [1.005, 1.030], step: 0.001 },
  { key: "ua_glu",     label: "Glucose",         unit: "", options: DIPSTICK,                normalValues: ["Negative"]               },
  { key: "ua_pro",     label: "Protein",         unit: "", options: DIPSTICK,                normalValues: ["Negative","Trace"]       },
  { key: "ua_blood",   label: "Blood",           unit: "", options: ["Negative","Trace","1+","2+","3+"], normalValues: ["Negative"]   },
  { key: "ua_nitrite", label: "Nitrite",         unit: "", options: ["Negative","Positive"],             normalValues: ["Negative"]   },
  { key: "ua_ketone",  label: "Ketone",          unit: "", options: ["Negative","Trace","1+","2+","3+"], normalValues: ["Negative"]   },
  { key: "ua_bili",    label: "Bilirubin",       unit: "", options: ["Negative","1+","2+","3+"],         normalValues: ["Negative"]   },
  { key: "ua_ubg",     label: "Urobilinogen",    unit: "", options: ["Normal","2+","4+","8+"],           normalValues: ["Normal"]     },
  { key: "ua_le",      label: "Leukocyte Est",   unit: "", options: ["Negative","Trace","1+","2+","3+"], normalValues: ["Negative"]   },
  { key: "ua_wbc",     label: "WBC (micro)",     unit: "/hpf", ref: () => [0, 5],  step: 1 },
  { key: "ua_rbc",     label: "RBC (micro)",     unit: "/hpf", ref: () => [0, 2],  step: 1 },
];

/* ── Chemistry ────────────────────────────────────────────── */
const CHEM_ITEMS: LabItem[] = [
  { key: "fbs",  label: "Sugar (FBS)",  unit: "mg/dL", ref: () => [70, 100],                                        step: 1    },
  { key: "hba1c",label: "HbA1c",        unit: "%",     ref: () => [4.0, 5.6],                                       step: 0.1  },
  { key: "bun",  label: "BUN",          unit: "mg/dL", ref: () => [7, 20],                                          step: 0.1  },
  { key: "cr",   label: "Creatinine",   unit: "mg/dL", ref: (_, g) => g === "M" ? [0.74, 1.35] : [0.59, 1.04],    step: 0.01 },
];

/* ── Lipid ────────────────────────────────────────────────── */
const LIPID_ITEMS: LabItem[] = [
  { key: "trig", label: "Triglyceride", unit: "mg/dL", ref: () => [0, 150],                                         step: 1 },
  { key: "hdl",  label: "HDL",          unit: "mg/dL", ref: (_, g) => g === "M" ? [40, 200] : [50, 200],           step: 1 },
  { key: "ldl",  label: "LDL",          unit: "mg/dL", ref: () => [0, 100],                                         step: 1 },
];

/* ── Liver ────────────────────────────────────────────────── */
const LIVER_ITEMS: LabItem[] = [
  { key: "sgot", label: "SGOT (AST)", unit: "U/L", ref: (_, g) => g === "M" ? [10, 40] : [10, 35], step: 1 },
  { key: "sgpt", label: "SGPT (ALT)", unit: "U/L", ref: (_, g) => g === "M" ? [7, 56]  : [7, 45],  step: 1 },
];

/* ── Interpretations ──────────────────────────────────────── */
function interpretCBC(values: Record<string, string>, _age: number, gender: Gender): string {
  const hgb = parseFloat(values.hgb);
  const wbc = parseFloat(values.wbc);
  const plt = parseFloat(values.plt);
  const mcv = parseFloat(values.mcv);
  const hgbRef = gender === "M" ? [13.5, 17.5] : [12.0, 15.5];
  const out: string[] = [];
  if (!isNaN(hgb)) {
    if (hgb < hgbRef[0] && !isNaN(mcv)) {
      if (mcv < 80) out.push("Microcytic anemia — ควรตรวจ Iron studies");
      else if (mcv > 100) out.push("Macrocytic anemia — ควรตรวจ B12/Folate");
      else out.push("Normocytic anemia — ควรตรวจหาสาเหตุเพิ่มเติม");
    } else if (hgb > hgbRef[1]) out.push("Polycythemia — ควรติดตามอาการ");
  }
  if (!isNaN(wbc)) {
    if (wbc > 11.0) out.push("Leukocytosis — อาจมีการติดเชื้อหรือการอักเสบ");
    else if (wbc < 4.5) out.push("Leukopenia — ควรระวังภาวะภูมิคุ้มกันต่ำ");
  }
  if (!isNaN(plt)) {
    if (plt < 150) out.push("Thrombocytopenia — ระวังความเสี่ยงเลือดออก");
    else if (plt > 400) out.push("Thrombocytosis — อาจเกิดจากการอักเสบ");
  }
  return out.length ? out.join(" · ") : "ผลเลือดอยู่ในเกณฑ์ปกติทุกรายการ";
}

function interpretUA(values: Record<string, string>): string {
  const out: string[] = [];
  if (values.ua_glu && values.ua_glu !== "Negative")
    out.push(`Glucosuria (${values.ua_glu}) — พิจารณาตรวจ FBS / HbA1c`);
  if (values.ua_pro && !["Negative","Trace"].includes(values.ua_pro))
    out.push(`Proteinuria (${values.ua_pro}) — ควรติดตามการทำงานของไต`);
  if (values.ua_blood && values.ua_blood !== "Negative")
    out.push(`Hematuria (${values.ua_blood}) — ควรตรวจสอบสาเหตุ`);
  if (values.ua_nitrite === "Positive")
    out.push("Nitrite positive — อาจมีการติดเชื้อทางเดินปัสสาวะ");
  if (values.ua_le && values.ua_le !== "Negative")
    out.push(`Leukocyte Est (${values.ua_le}) — สงสัย UTI`);
  if (values.ua_ketone && values.ua_ketone !== "Negative")
    out.push(`Ketonuria (${values.ua_ketone})`);
  if (values.ua_bili && values.ua_bili !== "Negative")
    out.push(`Bilirubinuria (${values.ua_bili}) — ตรวจการทำงานของตับ`);
  const wbc = parseFloat(values.ua_wbc);
  const rbc = parseFloat(values.ua_rbc);
  if (!isNaN(wbc) && wbc > 5) out.push("Pyuria — อาจมีการติดเชื้อทางเดินปัสสาวะ");
  if (!isNaN(rbc) && rbc > 2) out.push("Hematuria (microscopy) — ควรตรวจสอบสาเหตุ");
  return out.length ? out.join(" · ") : "ผลปัสสาวะอยู่ในเกณฑ์ปกติ";
}

function interpretChem(values: Record<string, string>): string {
  const fbs   = parseFloat(values.fbs);
  const hba1c = parseFloat(values.hba1c);
  const bun   = parseFloat(values.bun);
  const cr    = parseFloat(values.cr);
  const out: string[] = [];
  if (!isNaN(fbs)) {
    if (fbs >= 126) out.push("FBS ≥ 126 — เข้าเกณฑ์ Diabetes Mellitus");
    else if (fbs >= 100) out.push("FBS 100–125 — Pre-diabetes (IFG)");
  }
  if (!isNaN(hba1c)) {
    if (hba1c >= 6.5) out.push("HbA1c ≥ 6.5% — เข้าเกณฑ์ Diabetes");
    else if (hba1c >= 5.7) out.push("HbA1c 5.7–6.4% — Pre-diabetes range");
  }
  if (!isNaN(bun) && bun > 20) out.push("Elevated BUN — พิจารณาการทำงานของไต");
  if (!isNaN(cr) && cr > 1.35) out.push("Elevated Creatinine — บ่งชี้ renal insufficiency");
  return out.length ? out.join(" · ") : "ระดับน้ำตาลและไตอยู่ในเกณฑ์ปกติ";
}

function interpretLipid(values: Record<string, string>): string {
  const trig = parseFloat(values.trig);
  const hdl  = parseFloat(values.hdl);
  const ldl  = parseFloat(values.ldl);
  const out: string[] = [];
  if (!isNaN(trig) && trig > 150) out.push("Hypertriglyceridemia — ปรับอาหาร/ออกกำลังกาย");
  if (!isNaN(ldl)  && ldl  > 100) out.push("LDL > 100 — พิจารณา statin therapy");
  if (!isNaN(hdl)  && hdl  < 40)  out.push("Low HDL — ความเสี่ยง cardiovascular สูง");
  return out.length ? out.join(" · ") : "ระดับไขมันอยู่ในเกณฑ์ปกติ";
}

function interpretLiver(values: Record<string, string>, _age: number, gender: Gender): string {
  const sgot = parseFloat(values.sgot);
  const sgpt = parseFloat(values.sgpt);
  const out: string[] = [];
  const astRef = gender === "M" ? 40 : 35;
  const altRef = gender === "M" ? 56 : 45;
  if (!isNaN(sgot) && sgot > astRef) out.push("Elevated SGOT — ควรตรวจหาสาเหตุ");
  if (!isNaN(sgpt) && sgpt > altRef) out.push("Elevated SGPT — อาจบ่งชี้ hepatitis/fatty liver");
  if (!isNaN(sgot) && !isNaN(sgpt) && sgpt > 0 && sgot / sgpt > 2)
    out.push("SGOT:SGPT > 2 — suggestive of alcoholic hepatitis");
  return out.length ? out.join(" · ") : "การทำงานของตับอยู่ในเกณฑ์ปกติ";
}

/* ── Export ───────────────────────────────────────────────── */
export const LAB_PANELS: LabPanel[] = [
  { id: "cbc",   label: "CBC",      items: CBC_ITEMS,   interpret: interpretCBC   },
  { id: "ua",    label: "UA",       items: UA_ITEMS,    interpret: (v) => interpretUA(v)    },
  { id: "chem",  label: "Chem",     items: CHEM_ITEMS,  interpret: (v) => interpretChem(v)  },
  { id: "lipid", label: "Lipid",    items: LIPID_ITEMS, interpret: (v) => interpretLipid(v) },
  { id: "liver", label: "Liver",    items: LIVER_ITEMS, interpret: interpretLiver },
];
