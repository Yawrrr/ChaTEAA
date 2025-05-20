"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [sheetTabs, setSheetTabs] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchSheetTabs = async () => {
      const response = await fetch("/api/sheet/sheet-tab");
      const data = await response.json();
      setSheetTabs(data.sheets);
    };
    fetchSheetTabs();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col gap-4">
        {sheetTabs.map((tab) => (
          <div
            key={tab}
            className="bg-white p-4 rounded-lg border border-gray-300 m-4"
            onClick={() => {
              router.push(`/sheet/${tab}`);
            }}
          >
            <h1>{tab}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
