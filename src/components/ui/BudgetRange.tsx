import type { CSSProperties } from 'react';
import { formatAriary } from '@/utils/formatAriary';
import { cn } from '@/utils/cn';

type BudgetRangeProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  className?: string;
};

export const BudgetRange = ({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  className,
}: BudgetRangeProps) => {
  const progress = ((value - min) / (max - min)) * 100;
  const rangeStyle: CSSProperties & { '--range-progress': string } = {
    '--range-progress': `${progress}%`,
  };

  return (
    <div className={cn('budget-control', className)}>
      <div className="budget-control__heading">
        <label id={`${id}-label`} htmlFor={id} className="budget-control__label">
          {label}
        </label>
        <output id={`${id}-value`} className="budget-control__value" aria-hidden="true">
          {formatAriary(value)}
        </output>
      </div>
      <input
        id={id}
        name={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="budget-control__range"
        style={rangeStyle}
        aria-valuetext={`${value} ariary`}
      />
      <div className="budget-control__limits" aria-hidden="true">
        <span>{formatAriary(min)}</span>
        <span>{formatAriary(max)}</span>
      </div>
    </div>
  );
};
