import { Trash2, FileText, Calendar, Globe } from 'lucide-react';

const DocumentList = ({ documents, onDelete, loading }) => {
  if (documents.length === 0 && !loading) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
        <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
          <FileText className="text-slate-300" size={32} />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No documents yet</h3>
        <p className="text-slate-500 mt-1 max-w-xs mx-auto">
          Add documents to your Knowledge Base to give the AI context for your questions.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {documents.map((doc) => (
        <div 
          key={doc.id} 
          className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start justify-between group hover:border-primary-200 transition-colors"
        >
          <div className="flex gap-4">
            <div className="bg-primary-50 p-3 rounded-xl text-primary-600 h-fit">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">{doc.title}</h3>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Globe size={14} />
                  <span>{doc.source || 'No source'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onDelete(doc.id)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Delete Document"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
