import { useState, useCallback } from 'react';

export interface CalculatorResult {
  systemSize: string;
  paybackPeriod: string;
  lifetimeSavings: string;
}

export function useCalculator() {
  const [bill, setBill] = useState<string>('');
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const calculate = useCallback((value: string) => {
    const numBill = parseFloat(value);
    if (isNaN(numBill) || numBill <= 0) {
      setResult(null);
      return;
    }

    const systemSize = (numBill / 3500).toFixed(1);
    const lifetimeSavings = Math.round(numBill * 12 * 25);
    const formattedSavings = lifetimeSavings.toLocaleString('en-PK');

    setResult({
      systemSize: `${systemSize} kW System`,
      paybackPeriod: '~3.5 Years',
      lifetimeSavings: `PKR ${formattedSavings}`,
    });
  }, []);

  const handleBillChange = useCallback((value: string) => {
    setBill(value);
    calculate(value);
  }, [calculate]);

  return { bill, result, handleBillChange };
}
