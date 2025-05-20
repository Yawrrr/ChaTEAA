"use client";

import { useState, useEffect } from "react";
import { format, parse } from "date-fns";

interface DrinkSummary {
  [key: string]: {
    total: number;
    customizations: {
      [key: string]: number;
    };
  };
}

interface Order {
  timestamp: string;
  drinks: Array<{
    drink: string;
    size: string;
    iceLevel: string;
    sugarLevel: string;
    quantity: string;
  }>;
}

export default function DrinkDashboard({
  orders,
  drinkSummary,
}: {
  orders: Order[];
  drinkSummary: DrinkSummary;
}) {
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  // Calculate total drinks
  const totalDrinks = Object.values(drinkSummary).reduce(
    (acc, curr) => acc + (curr.total || 0),
    0
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Drink Dashboard</h2>

      {/* drinkSummary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-700">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-900">
            {orders.length || 0}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-700">Total Drinks</h3>
          <p className="text-3xl font-bold text-green-900">
            {totalDrinks || 0}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-700">
            Unique Drinks
          </h3>
          <p className="text-3xl font-bold text-purple-900">
            {Object.keys(drinkSummary).length || 0}
          </p>
        </div>
      </div>

      {/* Drink Details */}
      {selectedDrink && drinkSummary[selectedDrink] && (
        <div className="mt-8 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            {selectedDrink} Details
          </h3>
          <div className="space-y-4">
            {Object.entries(
              drinkSummary[selectedDrink].customizations || {}
            ).map(([custom, quantity]) => (
              <div key={custom} className="flex justify-between items-center">
                <span className="text-gray-600">{custom}</span>
                <span className="font-bold">{quantity || 0}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Drinks List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">All Drinks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(drinkSummary).map(([drink, details]) => (
            <div
              key={drink}
              className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedDrink(drink)}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{drink}</span>
                <span className="text-lg font-bold">{details.total || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
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
