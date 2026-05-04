import { useState, useRef } from 'react';
import { Loader2, Plus, FileText, Globe, Type, Upload } from 'lucide-react';
import mammoth from 'mammoth';

const DocumentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    content: '',
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'docx') {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        try {
          const result = await mammoth.extractRawText({ arrayBuffer });
          setFormData(prev => ({
            ...prev,
            title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
            source: prev.source || file.name,
            content: result.value
          }));
        } catch (err) {
          console.error('Error parsing docx:', err);
          alert('Failed to parse .docx file. Please try a .txt or .md file.');
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // Support text-based files (.txt, .md, .json)
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          title: prev.title || file.name.replace(/\.[^/.]+$/, ""),
          source: prev.source || file.name,
          content: event.target.result
        }));
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;
    onSubmit(formData);
    setFormData({ title: '', source: '', content: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
            <Plus size={20} />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Add Knowledge</h2>
        </div>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept=".txt,.md,.doc,.docx,.json"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1.5 bg-primary-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          <Upload size={16} />
          Upload File
        </button>
      </div>

      {!formData.content && (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="mb-6 border-2 border-dashed border-slate-100 rounded-xl p-8 text-center hover:border-primary-200 hover:bg-primary-50/30 transition-all cursor-pointer group"
        >
          <div className="bg-slate-50 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
            <Upload size={24} className="text-slate-400 group-hover:text-primary-600" />
          </div>
          <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-400 mt-1">Supports .txt, .md, .doc (Text based)</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Document Title</label>
          <div className="relative">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Refund Policy"
              className="input pl-10"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-700 ml-1">Source (Optional)</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="source"
              placeholder="e.g. internal-handbook"
              className="input pl-10"
              value={formData.source}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5 mb-6">
        <label className="text-sm font-medium text-slate-700 ml-1">Content</label>
        <div className="relative">
          <Type className="absolute left-3 top-3 text-slate-400" size={18} />
          <textarea
            name="content"
            required
            rows={5}
            placeholder="Paste the document content here..."
            className="input pl-10 pt-2.5 min-h-[150px] resize-y"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !formData.title || !formData.content}
        className="btn btn-primary w-full md:w-auto px-8 h-11 flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            <Plus size={18} />
            <span>Index Document</span>
          </>
        )}
      </button>
    </form>
  );
};

export default DocumentForm;
