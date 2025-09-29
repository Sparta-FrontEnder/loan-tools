import React from "react";

type Props = {
  loanAmount: number;
  interestRate: number; // 年利率 %
  loanTerm: number; // 年数
  monthlyPI: number;
};

export default function AmortizationTable({
  loanAmount,
  interestRate,
  loanTerm,
  monthlyPI,
}: Props) {
  if (!loanAmount || !interestRate || !loanTerm || !monthlyPI) {
    return null;
  }

  const monthlyRate = interestRate / 100 / 12;
  let balance = loanAmount;

  const rows = [];
  for (let year = 1; year <= loanTerm; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;

      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;

      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
    }

    rows.push({
      year,
      principal: yearPrincipal,
      interest: yearInterest,
      total: yearPrincipal + yearInterest,
      balance: balance > 0 ? balance : 0,
    });

    if (balance <= 0) break;
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Amortization Schedule (Yearly)</h2>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Year</th>
            <th className="border px-2 py-1">Principal Paid</th>
            <th className="border px-2 py-1">Interest Paid</th>
            <th className="border px-2 py-1">Total Payment</th>
            <th className="border px-2 py-1">Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.year}>
              <td className="border px-2 py-1">{r.year}</td>
              <td className="border px-2 py-1">${r.principal.toFixed(2)}</td>
              <td className="border px-2 py-1">${r.interest.toFixed(2)}</td>
              <td className="border px-2 py-1">${r.total.toFixed(2)}</td>
              <td className="border px-2 py-1">${r.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
