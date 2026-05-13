import { useState } from 'react';

interface BlogFilterBarProps {
  categories?: string[];
  onCategoryChange?: (category: string) => void;
  onSearch?: (query: string) => void;
}

export function BlogFilterBar({
  categories = ['All Topics', 'Study Tips', 'Japanese Culture', 'Grammar'],
  onCategoryChange,
  onSearch,
}: BlogFilterBarProps) {
  const [activeCategory, setActiveCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onCategoryChange?.(category);
  };

  return (
    <section className="bg-surface-container-low border-b border-outline-variant">
      <div className="max-w-[1280px] mx-auto px-margin-desktop py-stack-lg flex flex-col md:flex-row justify-between items-center gap-gutter">
        <div className="flex flex-wrap gap-stack-sm">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-2 font-label-md text-label-md rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface text-on-surface-variant border border-outline-variant hover:bg-surface-container-high'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <input
            className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
            placeholder="Search articles..."
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
          />
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
            search
          </span>
        </div>
      </div>
    </section>
  );
}
