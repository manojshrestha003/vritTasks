"use client";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Search...", label }: SearchBarProps) {
  return (
    <div className="w-full transition-all duration-300">
      {label && (
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl leading-5 placeholder-slate-400 focus:outline-none "
        />
      </div>
    </div>
  );
}