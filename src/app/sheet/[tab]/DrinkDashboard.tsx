"use client";

import { DrinkSummary } from "@/app/models/drinkSummary";
import { useEffect, useState } from "react";
import { Order } from "@/app/models/order";

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

export default function DrinkDashboard({
  orders,
}: {
  orders: Order[];
}) {
  const [selectedDrink, setSelectedDrink] = useState<string>("");
  const [drinkSummary, setDrinkSummary] = useState<DrinkSummary>({});
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const summary = calculateDrinkSummary(orders);
    setDrinkSummary(summary);
  }, [orders]);

  // Calculate total drinks
  const totalDrinks = Object.values(drinkSummary).reduce(
    (acc, curr) => acc + (curr.total || 0),
    0
  );

  const totalSales = Object.values(drinkSummary).reduce(
    (acc, curr) => acc + (curr.totalPrice || 0),
    0
  );

  const toggleExpanded = (drink: string) => {
    if (drink === selectedDrink) {
      setIsExpanded(false);
      setSelectedDrink("");
    } else {
      setSelectedDrink(drink);
      setIsExpanded(true);
    }
  };

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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
        Drink Dashboard
      </h2>

      {/* drinkSummary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#fff4eb] p-4 rounded-lg border border-[#D2B48C]">
          <h3 className="text-lg font-semibold text-[#8B4513]">Total Orders</h3>
          <p className="text-3xl font-bold text-[#8B4513]">
            {orders.length || 0}
          </p>
        </div>
        <div className="bg-[#fff4eb] p-4 rounded-lg border border-[#D2B48C]">
          <h3 className="text-lg font-semibold text-[#8B4513]">Total Drinks</h3>
          <p className="text-3xl font-bold text-[#8B4513]">
            {totalDrinks || 0}
          </p>
        </div>
        <div className="bg-[#fff4eb] p-4 rounded-lg border border-[#D2B48C]">
          <h3 className="text-lg font-semibold text-[#8B4513]">Total Sales</h3>
          <p className="text-3xl font-bold text-[#8B4513]">
            RM {totalSales || 0}
          </p>
        </div>
      </div>

      {/* Drink Details */}
      {isExpanded && drinkSummary[selectedDrink] && (
        <div className="mt-8 p-6 border border-[#D2B48C] rounded-lg bg-[#fff4eb]">
          <h3 className="text-xl font-semibold text-[#8B4513] mb-4">
            {selectedDrink} Details
          </h3>
          <div className="space-y-4">
            {Object.entries(
              drinkSummary[selectedDrink].customizations || {}
            ).map(([custom, quantity]) => (
              <div key={custom} className="flex justify-between items-center">
                <span className="text-[#8B4513]">{custom}</span>
                <span className="font-bold text-[#8B4513]">
                  {quantity || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Drinks List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-[#8B4513] mb-4">
          All Drinks
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(drinkSummary).map(([drink, details]) => (
            <div
              key={drink}
              className="p-4 border border-[#D2B48C] rounded-lg hover:bg-[#fff4eb] cursor-pointer transition-colors duration-300"
              onClick={() => toggleExpanded(drink)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#8B4513]">{drink}</span>
                <span className="text-lg font-bold text-[#8B4513]">
                  {details.total || 0}
                </span>
              </div>
              <div className="w-full bg-[#D2B48C] rounded-full h-2.5 mt-2">
                <div
                  className="bg-[#8B4513] h-2.5 rounded-full"
                  style={{
                    width: `${
                      totalDrinks
                        ? ((details.total || 0) / totalDrinks) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
