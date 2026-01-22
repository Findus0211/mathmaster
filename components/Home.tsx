import React from 'react';
import { ViewState } from '../types';
import { TrendingUp, BookOpen, FunctionSquare } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Master Math with <span className="text-indigo-600">Visuals</span> & <span className="text-amber-500">AI</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Explore the beauty of functions with our interactive graphing tools and get instant help from our Gemini-powered tutor.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button 
            onClick={() => onChangeView(ViewState.GRAPH)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200"
          >
            Start Graphing
          </button>
          <button 
            onClick={() => onChangeView(ViewState.TUTOR)}
            className="px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition shadow-sm"
          >
            Ask Tutor
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <FunctionSquare size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Parabola Builder</h3>
          <p className="text-slate-600">
            Intuitively tweak coefficients (a, b, c) and watch how the parabola transforms in real-time.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-4">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">AI Explanations</h3>
          <p className="text-slate-600">
            Stuck on a concept? Ask the Gemini-powered assistant for step-by-step proofs and explanations.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Custom Functions</h3>
          <p className="text-slate-600">
            Go beyond quadratics. Plot polynomials, trigonometric functions, and more with our formula engine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
