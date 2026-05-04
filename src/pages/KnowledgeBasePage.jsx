import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DocumentForm from '../components/DocumentForm';
import DocumentList from '../components/DocumentList';
import SearchResults from '../components/SearchResults';
import { getDocuments, addDocument, deleteDocument, searchDocuments } from '../services/rag';
import { Database, Search, Loader2, AlertCircle } from 'lucide-react';

const KnowledgeBasePage = () => {
  const [documents, setDocuments] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocs = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data.documents || []);
    } catch {
      setError('Failed to fetch documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        const data = await getDocuments();
        if (isMounted) {
          setDocuments(data.documents || []);
        }
      } catch {
        if (isMounted) {
          setError('Failed to fetch documents.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, []);

  const handleAddDocument = async (formData) => {
    setActionLoading(true);
    setError('');
    try {
      await addDocument(formData);
      setLoading(true); // Explicitly show loading state when refreshing list
      await fetchDocs();
    } catch (err) {
      setError('Failed to add document.');
      console.error('Add document error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document? This will remove all associated context.')) return;
    setActionLoading(true);
    try {
      await deleteDocument(id);
      setLoading(true); // Explicitly show loading state when refreshing list
      await fetchDocs();
    } catch (err) {
      setError('Failed to delete document.');
      console.error('Delete document error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    try {
      const data = await searchDocuments(searchQuery);
      setSearchResults(data.documents || []);
    } catch (err) {
      setError('Search failed.');
      console.error('Search error:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <Database className="text-primary-600" size={32} />
              Knowledge Base
            </h1>
            <p className="text-slate-500 mt-1">Manage documents and context for your AI assistant.</p>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 animate-in fade-in duration-300">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DocumentForm onSubmit={handleAddDocument} loading={actionLoading} />
            
            <div className="space-y-6">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  My Documents
                  <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                    {documents.length}
                  </span>
                </h2>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-primary-600" size={32} />
                </div>
              ) : (
                <DocumentList 
                  documents={documents} 
                  onDelete={handleDeleteDocument} 
                  loading={actionLoading} 
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-8">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                    <Search size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-800">Test Search</h2>
                </div>
                <p className="text-sm text-slate-500 mb-6">
                  Verify how your documents are indexed by running a similarity search.
                </p>
                <form onSubmit={handleSearch} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Search query..."
                    className="input h-11"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={searchLoading || !searchQuery.trim()}
                    className="btn btn-secondary w-full h-11 flex items-center justify-center gap-2"
                  >
                    {searchLoading ? <Loader2 className="animate-spin" size={18} /> : <span>Search Knowledge</span>}
                  </button>
                </form>
              </div>

              {searchResults.length > 0 && (
                <div className="hidden lg:block overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                  <SearchResults results={searchResults} query={searchQuery} />
                </div>
              )}
            </div>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="lg:hidden mt-8">
            <SearchResults results={searchResults} query={searchQuery} />
          </div>
        )}
      </main>
    </div>
  );
};

export default KnowledgeBasePage;
