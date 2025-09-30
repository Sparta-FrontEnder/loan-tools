"use client";
import { useState, useEffect } from "react";
import MortgageForm from "../mortgage-calculator/components/MortgageForm";
import PaymentChart from "../mortgage-calculator/components/PaymentChart";
import ResultSummary from "../mortgage-calculator/components/ResultSummary";
import Navbar from "../mortgage-calculator/navigation/Navbar";
import { calculateMonthlyPI, calculatePMI } from "../mortgage-calculator/utils/mortgage";
import AmortizationTable from "../mortgage-calculator/components/AmortizationTable";
// 导入州税率 JSON
import propertyTaxRates from "../mortgage-calculator/utils/propertyTaxRates.json";

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
    // <div className="grid grid-cols-2  gap-x-10">
    //     <div className="row-span-3 flex justify-center items-center">
    //         <table>
    //           <thead>
    //             <tr>
    //               <th className="border border-gray-300">
    //                 title
    //               </th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td>col-1</td>
    //             </tr>
    //             <tr>
    //               <td>col-2</td>
    //             </tr>
    //             <tr>
    //               <td>col-3</td>
    //             </tr>
    //             <tr>
    //               <td>col-4</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //     </div>
    //     <div className="flex pb-10">
    //       <img src="https://images.freeimages.com/images/large-previews/410/laptop-motherboard-1243423.jpg?fmt=webp&h=350" alt="" />
        
    //     </div>
    //     <div className="flex">
    //       <img src="https://images.freeimages.com/images/large-previews/922/colorful-circuit-board-0410-5708914.jpg?fmt=webp&h=350" alt="" />
    //     </div>
    // </div>
  <div className="min-h-screen flex flex-col items-center justify-center">
    <Navbar />
    {/* 左面是表格 右面是 图饼 + summary*/}
    <div className="grid grid-cols-2">
      <div className="rounded-lg">
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
      </div>
      <div className="flex flex-col justify-center items-center">
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
  </div>

  {/* 下面部分：表格 */}
  <div className="flex flex-col bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
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
