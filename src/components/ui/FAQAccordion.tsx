import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl overflow-hidden border border-sand-100 transition-shadow duration-200 hover:shadow-sm"
        >
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 group"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
          >
            <span className="font-serif text-lg font-light text-stone-800 group-hover:text-nude-700 transition-colors duration-200">
              {item.question}
            </span>
            <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              openIndex === index ? 'bg-nude-600 text-white' : 'bg-sand-100 text-stone-500 group-hover:bg-nude-100 group-hover:text-nude-600'
            }`}>
              {openIndex === index ? <Minus size={14} /> : <Plus size={14} />}
            </span>
          </button>
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-5">
                <p className="text-stone-600 leading-relaxed text-sm md:text-base">{item.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
