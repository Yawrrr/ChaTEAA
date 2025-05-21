"use client";

import { useState } from "react";
import { format, parse } from "date-fns";

interface GroupedOrders {
  [date: string]: {
    noon: Order[];
    evening: Order[];
  };
}

export default function CustomerList({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">{order.name}</span>
          <span className="text-gray-500">
            (
            {format(
              parse(order.timestamp, "M/d/yyyy H:mm:ss", new Date()),
              "h:mm a"
            )}
            )
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isExpanded && (
        <>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="font-semibold">Customer Details:</p>
              <p>Email: {order.email}</p>
              <p>Contact: {order.contact}</p>
              <p>Block: {order.block}</p>
            </div>
            <div>
              <p className="font-semibold">Order Time:</p>
              <p>
                {format(
                  parse(order.timestamp, "M/d/yyyy H:mm:ss", new Date()),
                  "h:mm a"
                )}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="font-semibold mb-2">Drinks:</p>
            {order.drinks.map((drink, drinkIndex) => (
              <div key={drinkIndex} className="ml-4 mb-2">
                <p>
                  • {drink.quantity} x {drink.drink}
                </p>
                <p className="ml-4">Size: {drink.size}</p>
                <p className="ml-4">Ice: {drink.iceLevel}</p>
                <p className="ml-4">Sugar: {drink.sugarLevel}</p>
              </div>
            ))}
          </div>

          {order.remarks && (
            <div className="mt-2">
              <p className="font-semibold">Remarks:</p>
              <p className="text-gray-600">{order.remarks}</p>
            </div>
          )}

          {order.paymentProof && (
            <div className="mt-2">
              <p className="font-semibold">Payment Proof:</p>
              <div className="flex items-center gap-2">
                <a
                  href={order.paymentProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  {order.paymentProof.toLowerCase().endsWith(".pdf") ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View PDF Receipt
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      View Image Receipt
                    </>
                  )}
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {}
