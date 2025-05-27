"use client";

import { useState } from "react";
import { format, parse } from "date-fns";
import { Order } from "@/app/models/order";

export default function CustomerList({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4 p-6 bg-white rounded-xl shadow-sm border border-[#D2B48C] hover:shadow-md transition-shadow duration-300">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <span className="font-serif text-[#8B4513] text-xl">
            {order.name}
          </span>
          <span className="text-[#D2B48C] text-sm font-sans">
            {format(
              parse(order.timestamp, "M/d/yyyy H:mm:ss", new Date()),
              "M/d/yyyy h:mm a"
            )}
          </span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-[#8B4513] transform transition-transform duration-300 ${
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
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#fff4eb] p-4 rounded-lg">
              <h3 className="font-serif text-[#8B4513] text-xl mb-3">
                Customer Details
              </h3>
              <div className="space-y-2 text-[#8B4513]">
                {/* <p className="flex items-center gap-2 font-serif">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {order.email}
                </p> */}
                <p className="flex items-center gap-2 font-serif">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {order.contact}
                </p>
                <p className="flex items-center gap-2 font-serif">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {order.college
                    ? `${order.block}, ${order.college}`
                    : `Block ${order.block}`}
                </p>
              </div>
            </div>
            <div className="bg-[#fff4eb] p-4 rounded-lg">
              <h3 className="font-serif text-[#8B4513] text-xl mb-3">
                Order Details
              </h3>
              <div className="space-y-2 text-[#8B4513]">
                {order.drinks.map((drink, drinkIndex) => (
                  <div key={drinkIndex} className="flex items-start gap-2">
                    <span className="text-[#D2B48C]">•</span>
                    <div>
                      <p className="font-serif">
                        {drink.quantity}x {drink.drink}
                      </p>
                      <div className="text-sm text-[#D2B48C] ml-2 font-sans">
                        <p>Size: {drink.size}</p>
                        <p>Ice: {drink.iceLevel}</p>
                        <p>Sugar: {drink.sugarLevel}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {order.remarks && (
            <div className="bg-[#fff4eb] p-4 rounded-lg">
              <h3 className="font-serif text-[#8B4513] text-xl mb-2">
                Remarks
              </h3>
              <p className="text-[#8B4513] font-serif">{order.remarks}</p>
            </div>
          )}

          {order.paymentProof && (
            <div className="bg-[#fff4eb] p-4 rounded-lg">
              <h3 className="font-serif text-[#8B4513] text-xl mb-2">
                Payment Proof
              </h3>
              <a
                href={order.paymentProof}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#8B4513] hover:text-[#D2B48C] transition-colors duration-300 font-serif"
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
          )}
        </div>
      )}
    </div>
  );
}
