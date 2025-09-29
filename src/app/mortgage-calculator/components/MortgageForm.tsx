"use client";
import React from "react";

type StateRate = {
  state: string;
  code: string;
  effective_property_tax_rate: number;
};

type Props = {
  homePrice: string;
  setHomePrice: (val: string) => void;
  downPayment: string;
  setDownPayment: (val: string) => void;
  loanTerm: string;
  setLoanTerm: (val: string) => void;
  interestRate: string;
  setInterestRate: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  propertyTax: number;
  setPropertyTax: (val: number) => void;
  insurance: string;
  setInsurance: (val: string) => void;
  pmi: number;
  setPmi: (val: number) => void;
  hoa: string;
  setHoa: (val: string) => void;
  onCalculate: () => void;
  propertyTaxRates: StateRate[];
};

export default function MortgageForm({
  homePrice, setHomePrice,
  downPayment, setDownPayment,
  loanTerm, setLoanTerm,
  interestRate, setInterestRate,
  state, setState,
  propertyTax, setPropertyTax,
  insurance, setInsurance,
  pmi, setPmi,
  hoa, setHoa,
  onCalculate,
  propertyTaxRates
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCalculate();
      }}
      className="w-full md:w-1/2 p-6 border-r"
    >
      <h2 className="text-xl font-bold mb-4">Mortgage Details</h2>

      {/* Home Price */}
      <label className="block mb-3">
        Home Price
        <input
          type="number"
          value={homePrice}
          onChange={(e) => setHomePrice(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* Down Payment */}
      <label className="block mb-3">
        Down Payment
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* Loan Term */}
      <label className="block mb-3">
        Loan Term (years)
        <select
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </label>

      {/* Interest Rate */}
      <label className="block mb-3">
        Interest Rate (%)
        <input
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <h3 className="text-lg font-semibold mt-6 mb-2">Taxes & Fees</h3>

      {/* State Select */}
      <label className="block mb-3">
        State
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        >
          {propertyTaxRates.map((s) => (
            <option key={s.code} value={s.code}>
              {s.state} ({s.code})
            </option>
          ))}
        </select>
      </label>

      {/* Property Tax */}
      <label className="block mb-3">
        Property Tax
        <input
          type="number"
          value={propertyTax.toFixed(2)}
          onChange={(e) => setPropertyTax(Number(e.target.value))}
          className="w-full border p-2 rounded mt-1"
        />
        <small className="text-gray-500">
          Auto-calculated from state tax rate, but editable
        </small>
      </label>

      {/* Insurance */}
      <label className="block mb-3">
        Insurance
        <input
          type="number"
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* PMI */}
      <label className="block mb-3">
        PMI
        <input
          type="number"
          value={pmi}
          onChange={(e) => setPmi(Number(e.target.value))}
          className="w-full border p-2 rounded mt-1"
        />
        <small className="text-gray-500">
          Auto-calculated from LTV, but editable
        </small>
      </label>

      {/* HOA */}
      <label className="block mb-3">
        HOA Fees
        <input
          type="number"
          value={hoa}
          onChange={(e) => setHoa(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition"
      >
        Calculate
      </button>
    </form>
  );
}
