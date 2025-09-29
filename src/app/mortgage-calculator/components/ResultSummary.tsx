"use client";
import React from "react";

type Props = {
  loanAmount: number;
  monthlyPayment: number;
  monthlyPI: number;
  interestRate: number;
  propertyTax: number;
  insurance: number;
  pmi: number;
  hoa: number;
};

export default function ResultSummary({
  loanAmount,
  monthlyPayment,
  monthlyPI,
  interestRate,
  propertyTax,
  insurance,
  pmi,
  hoa
}: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full mb-6">
      <h2 className="text-xl font-bold mb-4">Summary</h2>

      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Loan Amount:</span> ${loanAmount.toLocaleString()}
        </p>
        <p>
          <span className="font-semibold">Total Monthly Payment:</span> ${monthlyPayment.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">Principal & Interest:</span> ${monthlyPI.toFixed(2)}
        </p>
        <p>
            <span className="font-semibold">Interest Rate</span> {interestRate.toFixed(2)}%
        </p>
        <p>
          <span className="font-semibold">Property Tax:</span> ${propertyTax.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">Insurance:</span> ${insurance.toFixed(2)}
        </p>
        {pmi > 0 && (
          <p>
            <span className="font-semibold">PMI:</span> ${pmi.toFixed(2)}
          </p>
        )}
        {hoa > 0 && (
          <p>
            <span className="font-semibold">HOA:</span> ${hoa.toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}
