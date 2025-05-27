"use client";

import React, { useState, useMemo } from "react";
import { Order } from "@/app/models/order";

const AddressDashboard = ({ orders }: { orders: Order[] }) => {
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const addressSummary = useMemo(() => {
    const summary: { [key: string]: { blocks: Set<string>; orders: Order[] } } =
      {};

    orders.forEach((order) => {
      if (!order.college) return;

      if (!summary[order.college]) {
        summary[order.college] = {
          blocks: new Set([order.block]),
          orders: [order],
        };
      } else {
        summary[order.college].blocks.add(order.block);
        summary[order.college].orders.push(order);
      }
    });

    return summary;
  }, [orders]);

  const toggleCollege = (college: string) => {
    setExpandedCollege(expandedCollege === college ? null : college);
    setExpandedBlock(null);
  };

  const toggleBlock = (block: string) => {
    setExpandedBlock(expandedBlock === block ? null : block);
  };

  const getTotalDrinksForCollege = (college: string) => {
    return orders
      .filter((order) => order.college === college)
      .reduce((total, order) => {
        return (
          total +
          order.drinks.reduce((sum, drink) => sum + parseInt(drink.quantity), 0)
        );
      }, 0);
  };

  const getTotalDrinksForBlock = (college: string, block: string) => {
    return orders
      .filter((order) => order.college === college && order.block === block)
      .reduce((total, order) => {
        return (
          total +
          order.drinks.reduce((sum, drink) => sum + parseInt(drink.quantity), 0)
        );
      }, 0);
  };

  const sortBlocks = (blocks: Set<string>): string[] => {
    return Array.from(blocks).sort((a, b) => {
      // Extract numbers from block strings (e.g., "Block 1" -> 1)
      const numA = parseInt(a.replace(/\D/g, ""));
      const numB = parseInt(b.replace(/\D/g, ""));
      return numA - numB;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#8B4513] mb-6">
        Delivery Address Summary
      </h2>
      <div className="space-y-4">
        {Object.entries(addressSummary).map(([college, data]) => (
          <div
            key={college}
            className="border border-[#D2B48C] rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleCollege(college)}
              className="w-full px-4 py-3 bg-[#fff4eb] hover:bg-[#f5e6d9] transition-colors duration-300 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#8B4513]">{college}</span>
                <span className="text-sm text-gray-600">
                  ({getTotalDrinksForCollege(college)} drinks)
                </span>
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  expandedCollege === college ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {expandedCollege === college && (
              <div className="p-4 space-y-4">
                {sortBlocks(data.blocks).map((block) => (
                  <div
                    key={block}
                    className="border border-[#D2B48C] rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleBlock(block)}
                      className="w-full px-4 py-2 bg-[#fff4eb] hover:bg-[#f5e6d9] transition-colors duration-300 flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#8B4513]">
                          Block {block}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({getTotalDrinksForBlock(college, block)} drinks)
                        </span>
                      </div>
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          expandedBlock === block ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {expandedBlock === block && (
                      <div className="p-4 space-y-3">
                        {data.orders
                          .filter((order) => order.block === block)
                          .map((order, index) => (
                            <div
                              key={index}
                              className="bg-[#fff4eb] p-3 rounded-lg"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-[#8B4513]">
                                    {order.name}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {order.contact}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">
                                    {order.drinks.reduce(
                                      (sum, drink) =>
                                        sum + parseInt(drink.quantity),
                                      0
                                    )}{" "}
                                    drinks
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-gray-600">
                                {order.drinks.map((drink, drinkIndex) => (
                                  <p key={drinkIndex}>
                                    {drink.quantity}x {drink.drink} (
                                    {drink.size}, {drink.iceLevel},{" "}
                                    {drink.sugarLevel})
                                  </p>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressDashboard;
