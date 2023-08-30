import { Category } from '@/data/categories';
import { CropList } from '@/data/crops';
import React, { useState } from 'react';

interface SearchProps {
    categories: Category[];
    onSearch: (results: CropList[]) => void; // Callback to handle search results
}

const CropSearchComponent: React.FC<SearchProps> = ({ categories, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = () => {
        const results: CropList[] = [];

        categories.forEach(category => {
            if (category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (category.effect && category.effect.toLowerCase().includes(searchTerm.toLowerCase()))) {
                results.push(...category.crops);
            }
        });

        // Remove duplicates
        const uniqueResults = Array.from(new Set(results));

        onSearch(uniqueResults);
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Search for crops..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default CropSearchComponent;
