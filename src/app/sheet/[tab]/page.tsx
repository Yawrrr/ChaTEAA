"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DrinkDashboard from "@/app/sheet/[tab]/DrinkDashboard";
import OrderList from "@/app/sheet/[tab]/CustomerList";

export default function SheetPage({ params }: { params: { tab: string } }) {
  const router = useRouter();
  const { tab } = useParams();
  const [order, setOrder] = useState<Order[]>([]);
  const [drinkSummary, setDrinkSummary] = useState<DrinkSummary>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSheetData = async () => {
      const response = await fetch(`/api/sheet/${tab}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const rows = data.data;
      if (rows[0][0] === "Timestamp") {
        const order = rows.slice(1);
        order.forEach((row: string[]) => {
          const drinks = [];
          for (let i = 5; i < row.length; i += 6) {
            if (row[i] === "No" || row[i] === "") {
              break;
            }
            if (i === 17) {
              const drink = {
                drink: row[i],
                size: row[i + 1],
                iceLevel: row[i + 2],
                sugarLevel: row[i + 4],
                quantity: row[i + 3],
              };
              drinks.push(drink);
            } else {
              const drink = {
                drink: row[i],
                size: row[i + 1],
                iceLevel: row[i + 2],
                sugarLevel: row[i + 3],
                quantity: row[i + 4],
              };
            drinks.push(drink);
            }
          }
          const order = {
            timestamp: row[0],
            email: row[1],
            name: row[2],
            contact: row[3],
            block: row[4],
            drinks,
            paymentProof: row[row.length - 1],
            remarks: row[row.length] || "",
          };
          setOrder((prev) => [...prev, order]);
        });
      }
    };
    fetchSheetData();
  }, [tab]);

  useEffect(() => {});

  const calculateDrinkSummary = (orders: Order[]): DrinkSummary => {
    const summary: DrinkSummary = {};

    orders.forEach((order) => {
      order.drinks.forEach((drink) => {
        const key = `${drink.drink} (${drink.size})`;
        const customization = `${drink.iceLevel} , ${drink.sugarLevel} `;

        if (!summary[key]) {
          summary[key] = {
            total: 0,
            customizations: {},
          };
        }

        summary[key].total += parseInt(drink.quantity);

        if (!summary[key].customizations[customization]) {
          summary[key].customizations[customization] = 0;
        }
        summary[key].customizations[customization] += parseInt(drink.quantity);
      });
    });

    return summary;
  };
  useEffect(() => {
    console.log("order", order);
    const summary = calculateDrinkSummary(order);
    setDrinkSummary((prev) => ({ ...prev, ...summary }));
    setLoading(false);
  }, [order]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-8">Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto p-8">
        <button
          onClick={() => router.push("/")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </button>
        <DrinkDashboard orders={order} drinkSummary={drinkSummary} />
        <div className="mt-8">
          <div className="max-w-6xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Customer List</h1>

            <div className="p-4">
              <div className="mb-8">
                <>
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                    {order.map((order, index) => (
                      <OrderList key={index} order={order} />
                    ))}
                  </div>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
