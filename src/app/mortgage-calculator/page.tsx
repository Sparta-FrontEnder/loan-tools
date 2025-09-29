"use client";
import { useState, useEffect } from "react";
import MortgageForm from "./components/MortgageForm";
import PaymentChart from "./components/PaymentChart";
import ResultSummary from "./components/ResultSummary";
import { calculateMonthlyPI, calculatePMI } from "./utils/mortgage";
import AmortizationTable from "./components/AmortizationTable";
// 导入州税率 JSON
import propertyTaxRates from "./utils/propertyTaxRates.json";

export default function MortgageCalculatorPage() {
  // 基础状态：⚡ 改成字符串
  const [homePrice, setHomePrice] = useState("425000");
  const [downPayment, setDownPayment] = useState("85000");
  const [loanTerm, setLoanTerm] = useState("30"); // 这里也用字符串
  const [interestRate, setInterestRate] = useState("6.458");
  const [insurance, setInsurance] = useState("66");
  const [hoa, setHoa] = useState("0");

  // 新增: 州选择
  const [state, setState] = useState("TX"); // 默认德州

  // 计算相关
  const [propertyTax, setPropertyTax] = useState(0);
  const [pmi, setPmi] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyPI, setMonthlyPI] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // 自动计算 Property Tax 和 PMI
  useEffect(() => {
    const homePriceNum = parseFloat(homePrice) || 0;
    const downPaymentNum = parseFloat(downPayment) || 0;
    const loanAmt = homePriceNum - downPaymentNum;
    setLoanAmount(loanAmt);

    // 找到当前州税率
    const selectedState = propertyTaxRates.find((s) => s.code === state);
    if (selectedState) {
      const annualTax =
        homePriceNum * (selectedState.effective_property_tax_rate / 100);
      setPropertyTax(annualTax / 12); // 月度税
    }

    // PMI 自动算
    setPmi(calculatePMI(loanAmt, homePriceNum));
  }, [homePrice, downPayment, state]);

  // 点击计算按钮
  const handleCalculate = () => {
    const homePriceNum = parseFloat(homePrice) || 0;
    const downPaymentNum = parseFloat(downPayment) || 0;
    const interestRateNum = parseFloat(interestRate) || 0;
    const insuranceNum = parseFloat(insurance) || 0;
    const hoaNum = parseFloat(hoa) || 0;
    const loanTermNum = parseInt(loanTerm) || 0;

    const loanAmt = homePriceNum - downPaymentNum;
    const newMonthlyPI = calculateMonthlyPI(
      loanAmt,
      interestRateNum,
      loanTermNum
    );
    const newMonthlyPayment =
      newMonthlyPI + propertyTax + insuranceNum + pmi + hoaNum;

    setLoanAmount(loanAmt);
    setMonthlyPI(newMonthlyPI);
    setMonthlyPayment(newMonthlyPayment);
  };

  return (
<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 space-y-6">
  {/* 上面部分：表单 + 结果 + 饼图 */}
  <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-6xl">
    {/* 左边表单 */}
    <MortgageForm
      homePrice={homePrice}
      setHomePrice={setHomePrice}
      downPayment={downPayment}
      setDownPayment={setDownPayment}
      loanTerm={loanTerm}
      setLoanTerm={setLoanTerm}
      interestRate={interestRate}
      setInterestRate={setInterestRate}
      state={state}
      setState={setState}
      propertyTax={propertyTax}
      setPropertyTax={setPropertyTax}
      insurance={insurance}
      setInsurance={setInsurance}
      pmi={pmi}
      setPmi={setPmi}
      hoa={hoa}
      setHoa={setHoa}
      onCalculate={handleCalculate}
      propertyTaxRates={propertyTaxRates}
    />

    {/* 右边结果 */}
    <ResultSummary
      loanAmount={loanAmount}
      monthlyPayment={monthlyPayment}
      monthlyPI={monthlyPI}
      propertyTax={propertyTax}
      interestRate={parseFloat(interestRate) || 0}
      insurance={parseFloat(insurance) || 0}
      pmi={pmi}
      hoa={parseFloat(hoa) || 0}
    />

    {/* 饼图 */}
    <PaymentChart
      monthlyPayment={monthlyPayment}
      monthlyPI={monthlyPI}
      propertyTax={propertyTax}
      insurance={parseFloat(insurance) || 0}
      pmi={pmi}
      hoa={parseFloat(hoa) || 0}
    />
  </div>

  {/* 下面部分：表格 */}
  <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
    <AmortizationTable
      loanAmount={loanAmount}
      interestRate={parseFloat(interestRate) || 0}
      loanTerm={parseInt(loanTerm) || 0}
      monthlyPI={monthlyPI}
    />
  </div>
</div>

    

  );
}
