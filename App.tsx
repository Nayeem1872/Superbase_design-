
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import WeekCard from './components/WeekCard';
import DatePickerModal from './components/DatePickerModal';
import { WeekOption } from './types';
import { ChevronLeft, Calendar } from 'lucide-react';

const WEEK_OPTIONS: WeekOption[] = [
  { id: 1, weeks: 1, price: 35, days: 5 },
  { id: 2, weeks: 2, price: 70, days: 10 },
  { id: 3, weeks: 3, price: 105, days: 15 },
  { id: 4, weeks: 4, price: 140, days: 20 },
];

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const selectedOption = selectedId ? WEEK_OPTIONS.find(o => o.id === selectedId) : null;

  const calculateEndDate = (start: string, weeks: number) => {
    try {
      const date = new Date(start);
      if (isNaN(date.getTime())) return "";
      
      // Add weeks
      const result = new Date(date);
      result.setDate(result.getDate() + (weeks * 7) - 1); // -1 to make it inclusive of the week
      
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return `${months[result.getMonth()]} ${result.getDate()}, ${result.getFullYear()}`;
    } catch (e) {
      return "";
    }
  };

  const handleConfirmDate = (dateStr: string) => {
    setStartDate(dateStr);
    if (selectedOption) {
      const end = calculateEndDate(dateStr, selectedOption.weeks);
      setEndDate(end);
    }
    setIsModalOpen(false);
  };

  const handleWeekSelect = (id: number) => {
    setSelectedId(id);
    // Recalculate end date if start date is already picked
    if (startDate) {
      const option = WEEK_OPTIONS.find(o => o.id === id);
      if (option) {
        setEndDate(calculateEndDate(startDate, option.weeks));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative main-gradient overflow-x-hidden">
      <Navbar />

      {/* Background Decorative Stars (Hidden on small screens to reduce clutter) */}
      <div className="absolute top-[140px] left-1/2 -translate-x-1/2 z-0 hidden md:block">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <path d="M25 0L30.6123 19.3877H50L34.3061 31.2246L39.9184 50.6123L25 38.7754L10.0816 50.6123L15.6939 31.2246L0 19.3877H19.3877L25 0Z" fill="url(#star_grad_1)"/>
          <defs>
            <linearGradient id="star_grad_1" x1="25" y1="0" x2="25" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD900"/>
              <stop offset="0.8" stopColor="#FF9C11"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-[480px] -right-8 z-0 hidden lg:block opacity-50">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-[15deg]">
          <path d="M50 0L61.2246 38.7754H100L68.6122 62.4492L79.8368 101.225L50 77.5508L20.1632 101.225L31.3878 62.4492L0 38.7754H38.7754L50 0Z" fill="url(#star_grad_2)"/>
          <defs>
            <linearGradient id="star_grad_2" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD900"/>
              <stop offset="0.8" stopColor="#FF9C11"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 sm:px-6 md:px-12 pt-10 sm:pt-16 pb-40 z-10">
        <div className="mb-8 md:mb-12">
          <button className="flex items-center text-[#555555] hover:text-[#5D06E9] transition-colors text-xs sm:text-sm font-light mb-4 sm:mb-6">
            <ChevronLeft size={14} className="mr-1 stroke-[1.5px]" />
            Regular aftercare program
          </button>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium text-[#070012] leading-tight">
              How many weeks you like to continue?
            </h1>
            <p className="text-[#555555] font-light text-xs sm:text-sm">
              Based on your selection Mon, Tue, Thu, Fri, Sat
            </p>
          </div>
        </div>

        {/* Grid of cards - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {WEEK_OPTIONS.map((option) => (
            <WeekCard
              key={option.id}
              option={option}
              isSelected={selectedId === option.id}
              onSelect={() => handleWeekSelect(option.id)}
            />
          ))}
        </div>

        {/* Selected Details Section */}
        {selectedId && selectedOption && (
          <div className="w-full bg-white rounded-2xl border border-[#DDDDDD] shadow-[0px_4px_16px_rgba(7,0,18,0.08)] p-6 sm:p-12 transition-all animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col items-center text-center space-y-3 mb-8 sm:mb-12">
              <h2 className="text-lg sm:text-xl font-bold text-[#070012] uppercase tracking-wider">
                {selectedOption.weeks} {selectedOption.weeks === 1 ? 'WEEK' : 'WEEKS'}
              </h2>
              <p className="text-[#555555] font-light text-sm">
                ({selectedOption.weeks} Weeks X 5 Days) = {selectedOption.days} Days
              </p>
            </div>
            
            <div className={`grid gap-6  mx-auto ${startDate ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {/* Start Date Field */}
              <div className="space-y-2">
                
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => setIsModalOpen(true)}
                >
                  <input 
                    type="text" 
                    placeholder="Select start date"
                    value={startDate}
                    readOnly
                    className="w-full px-6 py-4 bg-white border border-[#DDDDDD] rounded-xl text-[#070012] placeholder-[#A0A0A0] focus:outline-none group-hover:border-[#5D06E9] transition-all font-light cursor-pointer shadow-sm"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#5D06E9]">
                    <Calendar size={20} className="stroke-[2px]" />
                  </div>
                </div>
              </div>

              {/* End Date Field (Calculated) - Only show after start date is selected */}
              {startDate && (
                <div className="space-y-2">
                  
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Calculated automatically"
                      value={endDate}
                      readOnly
                      disabled
                      className="w-full px-6 py-4 bg-gray-100 border border-[#DDDDDD] rounded-xl text-[#888888] placeholder-[#A0A0A0] cursor-not-allowed transition-all font-light shadow-sm opacity-75"
                    />
                    {endDate && (
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <Calendar size={20} className="stroke-[1.5px]" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {startDate && (
              <div className="mt-8 text-center animate-in fade-in duration-500">
                <p className="text-[#555555] text-xs font-light italic">
                  Your program runs from {startDate} to {endDate}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Decorative Shark Illustration Bottom Left (Hidden on mobile) */}
        <div className="absolute bottom-[112px] left-8 w-[180px] h-[180px]  pointer-events-none select-none hidden lg:block">
          <img 
            src="/shark.png" 
            alt="Shark decoration" 
            className="w-full h-full object-contain"
          />
        </div>
      </main>

      {/* Persistent Footer CTA - Responsive Layout */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 sm:px-8 md:px-12 py-4 sm:py-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[#070012] font-semibold text-xs sm:text-sm md:text-base uppercase tracking-wider text-center sm:text-left">
            {selectedOption 
              ? `$${selectedOption.price} FOR ${selectedOption.days} DAYS (1 ACTIVITY PER DAY)` 
              : "SELECT A PACKAGE"}
          </div>
          <div className="flex items-center gap-6 sm:gap-12 w-full sm:w-auto justify-center">
            <button className="text-[#070012] font-semibold text-xs sm:text-sm hover:underline tracking-widest uppercase">
              BACK
            </button>
            <button 
              className={`flex-1 sm:flex-none px-8 sm:px-12 py-3 sm:py-3.5 rounded-lg font-bold text-xs sm:text-sm tracking-widest transition-all ${
                selectedId && startDate
                ? "btn-gradient text-white shadow-lg shadow-purple-200 hover:scale-[1.02]" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              NEXT
            </button>
          </div>
        </div>
      </footer>

      {/* Date Picker Modal */}
      {selectedOption && (
        <DatePickerModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDate}
          weeksCount={selectedOption.weeks}
        />
      )}
    </div>
  );
};

export default App;
