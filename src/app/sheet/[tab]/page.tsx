"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import DrinkDashboard from "@/app/sheet/[tab]/DrinkDashboard";
import OrderList from "@/app/sheet/[tab]/CustomerList";
import Loading from "@/app/loading";
import { Order } from "@/app/models/order";

export default function SheetPage() {
  const DRINKS_PRICES: {
    [key: string]: {
      drink: string;
      price: number;
    };
  } = {
    "DA HONG PAO MILK TEA🍃 (RM15.00 / RM17.00) - Regular": {
      drink: "Da Hong Pao Milk Tea",
      price: 15,
    },
    "DA HONG PAO MILK TEA🍃 (RM15.00 / RM17.00) - Large": {
      drink: "Da Hong Pao Milk Tea",
      price: 17,
    },
    "JASMINE GREEN MILK TEA🌸 (RM14.00 / RM16.00) - Regular": {
      drink: "Jasmine Green Milk Tea",
      price: 14,
    },
    "JASMINE GREEN MILK TEA🌸 (RM14.00 / RM16.00) - Large": {
      drink: "Jasmine Green Milk Tea",
      price: 16,
    },
    "WHITE PEACH OOLONG MILK TEA🍑 (RM14.00 / RM16.00) - Regular": {
      drink: "White Peach Oolong Milk Tea",
      price: 14,
    },
    "WHITE PEACH OOLONG MILK TEA🍑 (RM14.00 / RM16.00) - Large": {
      drink: "White Peach Oolong Milk Tea",
      price: 16,
    },
  };
  const router = useRouter();
  const { tab } = useParams();
  const [order, setOrder] = useState<Order[]>([]);
  const [drinkSummary, setDrinkSummary] = useState<DrinkSummary>({});
  const [loading, setLoading] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchSheetData = async () => {
      if (!isFirstRender.current) {
        return;
      }
      isFirstRender.current = false;

      setLoading(true);
      setOrder([]);
      setDrinkSummary({});

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
          if (!row || row.length === 0 || !row[0]) {
            return;
          }

          const drinks = [];
          for (let i = 5; i < row.length; i += 6) {
            if (row[i] === "No" || row[i] === "" || !row[i]) {
              break;
            }
            const drinkKey = `${row[i]} - ${row[i + 1]}`;
            // console.log("Drink Key : ", drinkKey);
            if (!DRINKS_PRICES[drinkKey]) {
              console.warn(`Drink not found in DRINKS_PRICES: ${drinkKey}`);
              continue;
            }

            if (i === 17) {
              const drink = {
                drink: DRINKS_PRICES[drinkKey].drink,
                size: row[i + 1],
                iceLevel: row[i + 2],
                sugarLevel: row[i + 4],
                quantity: row[i + 3],
                price: DRINKS_PRICES[drinkKey].price,
              };
              drinks.push(drink);
            } else {
              const drink = {
                drink: DRINKS_PRICES[drinkKey].drink,
                size: row[i + 1],
                iceLevel: row[i + 2],
                sugarLevel: row[i + 3],
                quantity: row[i + 4],
                price: DRINKS_PRICES[drinkKey].price,
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
          setOrder((prev) => [...prev, order as Order]);
          console.log(order);
        });
      }
      setLoading(false);
    };
    fetchSheetData();
  }, [tab]);

  useEffect(() => {
    // console.log("order", order);
    const summary = calculateDrinkSummary(order);
    setDrinkSummary(summary);
  }, [order]);

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
            totalPrice: 0,
          };
        }

        summary[key].total += parseInt(drink.quantity);
        summary[key].totalPrice += drink.price * parseInt(drink.quantity);

        if (!summary[key].customizations[customization]) {
          summary[key].customizations[customization] = 0;
        }
        summary[key].customizations[customization] += parseInt(drink.quantity);
      });
    });

    return summary;
  };


  return (
    <div className="min-h-screen bg-[#fff4eb]">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#8B4513]">
            {tab} Order Summary
          </h1>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2 bg-white text-[#8B4513] rounded-lg border border-[#D2B48C] hover:bg-[#fff4eb] transition-colors duration-300"
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
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="space-y-8">
            <DrinkDashboard orders={order} drinkSummary={drinkSummary} />

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
                Customer Orders
              </h2>
              <div className="space-y-4">
                {order.map((order, index) => (
                  <OrderList key={index} order={order} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
