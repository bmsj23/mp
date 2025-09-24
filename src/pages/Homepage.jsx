import { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SpaceCard from '../components/SpaceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import spacesData from '../data/spaces.json';

export default function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [spaces, setSpaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setSpaces(spacesData);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const filteredSpaces = useMemo(() => {
    if (!searchTerm) return spaces;

    return spaces.filter(space =>
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [spaces, searchTerm]);

  return (
    <div className="min-h-screen bg-stone-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-stone-50 via-white to-amber-50 min-h-[calc(100vh-4rem)] flex items-center">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/5 to-amber-900/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(120, 113, 108, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(180, 83, 9, 0.05) 0%, transparent 50%)`
        }}></div>

        <div className="relative container mx-auto px-8 lg:px-16 xl:px-24 2xl:px-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="mb-6">
              <h1 className="text-6xl lg:text-7xl font-extralight text-stone-900 mb-2 tracking-tight">
                StudySpot
                <span className="block text-5xl lg:text-6xl font-light text-amber-800 mt-1">
                  Philippines
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-12">
              <p className="text-xl lg:text-2xl text-stone-700 font-light leading-relaxed max-w-3xl mx-auto">
                Discover exceptional co-working spaces and study sanctuaries designed for
                <span className="text-amber-800 font-medium"> productivity</span> and
                <span className="text-amber-800 font-medium"> success</span>.
              </p>
              <p className="text-lg text-stone-600 mt-4 max-w-2xl mx-auto">
                Premium workspaces across the Philippines, curated for professionals and students who demand excellence.
              </p>
            </div>

            {/* Enhanced Search Section */}
            <div className="mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50 p-8 max-w-2xl mx-auto">
                <h3 className="text-lg font-medium text-stone-800 mb-4">
                  Find Your Perfect Workspace
                </h3>
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search by space name or location..."
                />
                {searchTerm && (
                  <p className="text-stone-600 mt-4 text-sm">
                    {filteredSpaces.length} premium space{filteredSpaces.length !== 1 ? 's' : ''} found for "{searchTerm}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Grid */}
      <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
        <div className="container mx-auto px-8 lg:px-16 xl:px-24 2xl:px-32">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-900 mb-4">
              {searchTerm ? 'Search Results' : 'Study and Working Spaces'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-800 to-stone-800 mx-auto mb-6"></div>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              {searchTerm
                ? `Discover ${filteredSpaces.length} exceptional space${filteredSpaces.length !== 1 ? 's' : ''} matching "${searchTerm}"`
                : 'Handpicked collection of exceptional co-working spaces designed for productivity and success'
              }
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-stone-200">
                <LoadingSpinner size="lg" />
                <p className="text-stone-600 mt-4 text-center">Curating premium spaces...</p>
              </div>
            </div>
          ) : filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {filteredSpaces.map(space => (
                <div key={space.id} className="group">
                  <SpaceCard space={space} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg border border-stone-200 p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-light text-stone-800 mb-4">
                  No spaces found
                </h3>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  We couldn't find any spaces matching your criteria. Try adjusting your search terms or explore our complete collection.
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-gradient-to-r from-amber-800 to-stone-800 text-white px-6 py-3 rounded-full hover:from-amber-700 hover:to-stone-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
                  >
                    View All Spaces
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}