
import React, { useState, useRef, useEffect } from 'react';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (date: string) => void;
  weeksCount: number;
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const YEARS = Array.from({ length: 31 }, (_, i) => 2000 + i); // 2000 to 2030
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

const DatePickerModal: React.FC<DatePickerModalProps> = ({ isOpen, onClose, onConfirm, weeksCount }) => {
  const currentDate = new Date();
  const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[currentDate.getMonth()]);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const dayRef = useRef<HTMLDivElement>(null);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const startScrollRef = useRef(0);

  const handleScroll = (ref: React.RefObject<HTMLDivElement>, setter: (val: any) => void, items: any[]) => {
    if (!ref.current) return;
    
    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Debounce the scroll handler
    scrollTimeoutRef.current = setTimeout(() => {
      if (!ref.current) return;
      const scrollPos = ref.current.scrollTop;
      const itemHeight = 44;
      const index = Math.round(scrollPos / itemHeight);
      if (items[index] !== undefined) {
        setter(items[index]);
      }
    }, 50);
  };

  const handleMouseDown = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    startScrollRef.current = ref.current.scrollTop;
    ref.current.style.cursor = 'grabbing';
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!isDraggingRef.current || !ref.current) return;
    const deltaY = startYRef.current - e.clientY;
    ref.current.scrollTop = startScrollRef.current + deltaY;
  };

  const handleMouseUp = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    isDraggingRef.current = false;
    ref.current.style.cursor = 'grab';
  };

  const handleTouchStart = (e: React.TouchEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    isDraggingRef.current = true;
    startYRef.current = e.touches[0].clientY;
    startScrollRef.current = ref.current.scrollTop;
  };

  const handleTouchMove = (e: React.TouchEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!isDraggingRef.current || !ref.current) return;
    const deltaY = startYRef.current - e.touches[0].clientY;
    ref.current.scrollTop = startScrollRef.current + deltaY;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    if (!isOpen) return;
    
    const scrollToValue = (ref: React.RefObject<HTMLDivElement>, value: any, items: any[]) => {
      if (ref.current) {
        const index = items.indexOf(value);
        ref.current.scrollTop = index * 44;
      }
    };
    const timer = setTimeout(() => {
      scrollToValue(dayRef, selectedDay, DAYS);
      scrollToValue(monthRef, selectedMonth, MONTHS);
      scrollToValue(yearRef, selectedYear, YEARS);
    }, 150);
    return () => clearTimeout(timer);
  }, [isOpen]); // Only run when modal opens, not when values change

  const handleConfirm = () => {
    // Return formatted date based on selection
    onConfirm(`${selectedMonth} ${selectedDay}, ${selectedYear}`);
  };

  if (!isOpen) return null;

  const PickerColumn = ({ 
    items, 
    currentVal, 
    setter, 
    scrollRef 
  }: { 
    items: any[], 
    currentVal: any, 
    setter: (v: any) => void, 
    scrollRef: React.RefObject<HTMLDivElement | null> 
  }) => {
    return (
      <div className="flex-1 relative overflow-hidden">
        <div 
          ref={scrollRef}
          onScroll={() => handleScroll(scrollRef as React.RefObject<HTMLDivElement>, setter, items)}
          onMouseDown={(e) => handleMouseDown(e, scrollRef as React.RefObject<HTMLDivElement>)}
          onMouseMove={(e) => handleMouseMove(e, scrollRef as React.RefObject<HTMLDivElement>)}
          onMouseUp={() => handleMouseUp(scrollRef as React.RefObject<HTMLDivElement>)}
          onMouseLeave={() => handleMouseUp(scrollRef as React.RefObject<HTMLDivElement>)}
          onTouchStart={(e) => handleTouchStart(e, scrollRef as React.RefObject<HTMLDivElement>)}
          onTouchMove={(e) => handleTouchMove(e, scrollRef as React.RefObject<HTMLDivElement>)}
          onTouchEnd={handleTouchEnd}
          className="h-[220px] overflow-y-auto w-full cursor-grab select-none"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="h-[88px] flex-shrink-0" /> {/* Spacer: (220 - 44) / 2 */}
          {items.map((item, idx) => {
            const isSelected = currentVal === item;
            return (
              <div 
                key={idx} 
                className={`h-[44px] flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  isSelected ? "text-[#070012] text-2xl font-medium" : "text-[#D1D1D1] text-xl font-normal opacity-70"
                }`}
              >
                {item}
              </div>
            );
          })}
          <div className="h-[88px] flex-shrink-0" />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-black/5 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-[500px] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 flex flex-col">
        <div className="p-8 md:p-12 space-y-10">
          <h2 className="text-[26px] md:text-[30px] font-semibold text-[#070012] text-center tracking-tight">
            Please select your start date
          </h2>

          {/* iOS Style Wheel Picker */}
          <div className="relative h-[220px] flex items-center justify-center">
            {/* Center Selection Indicators (the lines) */}
            <div className="absolute top-1/2 left-0 right-0 h-[44px] border-t border-b border-gray-100 -translate-y-1/2 pointer-events-none z-20" />
            
            <div className="flex w-full relative z-10 px-6 gap-2">
              <PickerColumn items={DAYS} currentVal={selectedDay} setter={setSelectedDay} scrollRef={dayRef} />
              <PickerColumn items={MONTHS} currentVal={selectedMonth} setter={setSelectedMonth} scrollRef={monthRef} />
              <PickerColumn items={YEARS} currentVal={selectedYear} setter={setSelectedYear} scrollRef={yearRef} />
            </div>

            {/* Fading Gradients Top/Bottom */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-30" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-30" />
          </div>

          {/* Descriptive Text */}
          <div className="px-2">
            <p className="text-[#555555] text-sm md:text-[15px] leading-relaxed text-center font-normal">
              <span className="font-bold">NB:</span> You’ve chosen a {weeksCount}-week schedule starting on June 18, 2026, with sessions on Mon, Tue, Thu, Fri, and Sat. We’ll automatically set your end date, and you can renew whenever you like — no worries!
            </p>
          </div>
        </div>

        {/* Footer with Divider and Buttons */}
        <div className="border-t border-gray-50 p-6 md:px-12 md:pb-12 flex items-center justify-between gap-6">
          <button 
            onClick={onClose}
            className="text-[#FF4145] font-bold text-sm tracking-widest uppercase py-3 px-4 hover:opacity-80 transition-opacity"
          >
            CANCEL
          </button>
          <button 
            onClick={handleConfirm}
            className="bg-[#5D06E9] text-white px-10 py-3.5 rounded-lg font-bold text-sm tracking-widest shadow-lg shadow-purple-100 hover:bg-[#4c05c4] transition-all active:scale-95 uppercase"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
