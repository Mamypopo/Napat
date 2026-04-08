"use client";

import { useEffect } from "react";

export default function ScrollRestore() {
  useEffect(() => {
    const y = sessionStorage.getItem("scrollY");
    if (y) {
      sessionStorage.removeItem("scrollY");
      window.scrollTo({ top: parseInt(y), behavior: "instant" });
    }
  }, []);

  return null;
}
