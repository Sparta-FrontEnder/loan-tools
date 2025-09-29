export function calculateMonthlyPI(
    loanAmount: number,
    interestRate: number,
    loanTerm: number
  ): number {
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTerm * 12;
    return (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalMonths));
  }
  
export function calculatePMI(
    loanAmount: number,
    homePrice: number
): number {
    const ltv = loanAmount / homePrice;
    if (ltv <= 0.8) return 0; // 首付 >= 20%，不用 PMI
    const annualPMIRate = 0.005; // 假设 0.5%（可以调节）
    return (loanAmount * annualPMIRate) / 12;
}