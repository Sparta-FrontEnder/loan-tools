"use client";
import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

type Props = {
  monthlyPayment: number;
  monthlyPI: number;
  propertyTax: number;
  insurance: number;
  pmi: number;
  hoa: number;
};

export default function PaymentChart({
  monthlyPayment, monthlyPI, propertyTax, insurance, pmi, hoa
}: Props) {
  const data = [
    { name: "Principal & Interest", value: monthlyPI, color: "#4CAF50" },
    { name: "Property Tax", value: propertyTax, color: "#FFC107" },
    { name: "Insurance", value: insurance, color: "#FF5722" },
    { name: "PMI", value: pmi, color: "#9C27B0" },
    { name: "HOA", value: hoa, color: "#2196F3" },
  ];
  return (
    <div className="w-full md:w-1/2 p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Monthly Payment</h2>
      <p className="text-lg text-gray-600 mb-6">
        Total: <span className="font-semibold">${monthlyPayment.toFixed(2)}</span>
      </p>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={3} dataKey="value">
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `$${v.toFixed(2)}`} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
