"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
export default function Home() {
  const [sheetTabs, setSheetTabs] = useState<string[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSheetTabs = async () => {
      const response = await fetch("/api/sheet/sheet-tab");
      const data = await response.json();
      setSheetTabs(data.sheets);
      setLoading(false);
    };
    fetchSheetTabs();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff4eb]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif text-[#8B4513] text-center mb-8">
          Welcome to View ChaTEAA order summary
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sheetTabs.map((tab) => (
              <div
                key={tab}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-[#D2B48C]"
                onClick={() => {
                  router.push(`/sheet/${tab}`);
                }}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-[#8B4513]">
                    {tab}
                  </h2>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#D2B48C]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
