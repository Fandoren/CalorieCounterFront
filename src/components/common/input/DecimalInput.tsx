"use client";

import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "@/components/ui/input";

interface DecimalInputProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  placeholder?: string;
  decimalScale?: number; // количество знаков после точки
}

export const DecimalInput = forwardRef<HTMLInputElement, DecimalInputProps>(
  ({ value, onChange, placeholder, decimalScale = 1, ...props }, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        value={value}
        placeholder={placeholder}
        decimalScale={decimalScale}
        fixedDecimalScale={false}
        allowNegative={false}
        decimalSeparator="."
        thousandSeparator={false}
        allowLeadingZeros={false}
        onValueChange={(vals) => {
          let val = vals.value.replace(",", "."); // заменяем запятую на точку
          const num = val === "" ? undefined : parseFloat(val);
          onChange?.(num);
        }}
        customInput={Input}
        {...props}
      />
    );
  }
);
