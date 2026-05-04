import { Search, Info, Target } from 'lucide-react';

const SearchResults = ({ results, query }) => {
  if (!query) return null;

  return (
    <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
          <Search size={20} />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Search Results for "{query}"</h2>
      </div>

      {results.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
          No relevant context found for this query.
        </div>
      ) : (
        <div className="space-y-4">
          {results.map((result, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="bg-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Match {idx + 1}
                  </span>
                  <h4 className="font-bold text-slate-900">{result.title}</h4>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium bg-slate-50 px-3 py-1 rounded-lg">
                  <Target size={14} className="text-primary-500" />
                  <span>{Math.round(result.similarity * 100)}% Match</span>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 italic text-slate-700 text-sm leading-relaxed relative">
                <Info size={16} className="absolute -left-2 -top-2 text-primary-300 bg-white rounded-full" />
                "...{result.content}..."
              </div>
              
              <div className="mt-4 flex items-center text-xs text-slate-400">
                <span className="font-medium mr-1 text-slate-500">Source:</span> {result.source}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
