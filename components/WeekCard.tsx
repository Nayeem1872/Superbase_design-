
'use client'

import React from 'react';
import { WeekOption } from '@/types';
import { Check } from 'lucide-react';

interface WeekCardProps {
  option: WeekOption;
  isSelected: boolean;
  onSelect: () => void;
}

const WeekCard: React.FC<WeekCardProps> = ({ option, isSelected, onSelect }) => {
  return (
    <div 
      onClick={onSelect}
      className={`relative cursor-pointer bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 border flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] ${
        isSelected 
        ? "border-[#5D06E9] shadow-[0px_12px_32px_rgba(93,6,233,0.12)] -translate-y-1" 
        : "border-[#DDDDDD] shadow-[0px_4px_16px_rgba(7,0,18,0.08)] hover:border-[#5D06E9]/30 hover:shadow-lg"
      }`}
    >
      {/* Radio/Check Indicator */}
      <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center transition-all ${
        isSelected ? "border-[#852DFE] bg-[#852DFE]" : "border-[#DDDDDD] bg-white"
      }`}>
        {isSelected ? (
          <Check size={12} className="text-white stroke-[4px]" />
        ) : null}
      </div>

      {/* Week Card Image */}
      <div className="mb-4 sm:mb-6">
        <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
            <img 
                src="/weeksCard.png" 
                alt="Week card" 
                className="w-full h-full object-contain"
            />
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-bold text-[#070012] text-base sm:text-lg uppercase tracking-wider mb-1 sm:mb-2">
          {option.weeks} {option.weeks === 1 ? 'WEEK' : 'WEEKS'}
        </h3>
        <p className="text-[#555555] font-light text-xs sm:text-sm">
          ${option.price} for {option.days} days
        </p>
      </div>
    </div>
  );
};

export default WeekCard;
