import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { generateGraphData } from '../utils/mathHelper';
import { DataPoint } from '../types';
import { Calculator, RefreshCw, AlertCircle } from 'lucide-react';

const GraphingCalculator: React.FC = () => {
  const [formula, setFormula] = useState<string>('x^2');
  const [data, setData] = useState<DataPoint[]>([]);
  const [xRange, setXRange] = useState({ min: -10, max: 10 });
  const [error, setError] = useState<string | null>(null);

  // Quadratic helpers
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0);
  const [c, setC] = useState<number>(0);
  const [mode, setMode] = useState<'custom' | 'quadratic'>('quadratic');

  useEffect(() => {
    if (mode === 'quadratic') {
      // Construct formula from a, b, c
      const termA = a !== 0 ? `${a}x^2` : '';
      const termB = b !== 0 ? `${b > 0 && termA ? '+' : ''}${b}x` : '';
      const termC = c !== 0 ? `${c > 0 && (termA || termB) ? '+' : ''}${c}` : '';
      
      let newFormula = `${termA}${termB}${termC}`;
      if (!newFormula) newFormula = '0';
      // Clean up cases like +-
      newFormula = newFormula.replace(/\+\-/g, '-');
      setFormula(newFormula);
    }
  }, [a, b, c, mode]);

  useEffect(() => {
    try {
      const points = generateGraphData(formula, xRange.min, xRange.max, 200);
      setData(points);
      setError(null);
    } catch (err) {
      setError("Invalid formula syntax");
    }
  }, [formula, xRange]);

  const handleCustomFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  const domain = useMemo(() => [xRange.min, xRange.max], [xRange]);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Calculator size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Parabola & Function Plotter</h2>
          </div>
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setMode('quadratic')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'quadratic' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Quadratic Mode
            </button>
            <button
              onClick={() => setMode('custom')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'custom' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Custom f(x)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="md:col-span-4 space-y-6">
            
            {mode === 'quadratic' ? (
              <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Coefficients</p>
                <div className="space-y-3">
                  <div>
                    <label className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>a (stretch/direction)</span>
                      <span className="font-mono font-bold">{a}</span>
                    </label>
                    <input 
                      type="range" min="-5" max="5" step="0.1" 
                      value={a} onChange={(e) => setA(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>b (slope at intercept)</span>
                      <span className="font-mono font-bold">{b}</span>
                    </label>
                    <input 
                      type="range" min="-10" max="10" step="0.5" 
                      value={b} onChange={(e) => setB(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>c (y-intercept)</span>
                      <span className="font-mono font-bold">{c}</span>
                    </label>
                    <input 
                      type="range" min="-10" max="10" step="0.5" 
                      value={c} onChange={(e) => setC(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-50 border border-indigo-100 rounded text-center">
                  <span className="text-indigo-900 font-mono text-lg">
                    f(x) = {a}x² {b >= 0 ? '+' : ''}{b}x {c >= 0 ? '+' : ''}{c}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <label className="block text-sm font-semibold text-slate-700">Function f(x) =</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formula}
                    onChange={handleCustomFormulaChange}
                    className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono text-slate-700"
                    placeholder="e.g. x^2 + 2x + 1"
                  />
                  {error && (
                    <div className="absolute right-3 top-2.5 text-red-500">
                      <AlertCircle size={20} />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Supported: +, -, *, /, ^, sin, cos, tan, sqrt, log. <br/>
                  Try: <code className="bg-slate-200 px-1 rounded">sin(x) * x</code>
                </p>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Axis Range</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">X Min</label>
                  <input
                    type="number"
                    value={xRange.min}
                    onChange={(e) => setXRange(p => ({ ...p, min: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">X Max</label>
                  <input
                    type="number"
                    value={xRange.max}
                    onChange={(e) => setXRange(p => ({ ...p, max: parseFloat(e.target.value) }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Graph Area */}
          <div className="md:col-span-8 h-[400px] md:h-[500px] bg-white rounded-lg border border-slate-200 relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="x" 
                  type="number" 
                  domain={domain} 
                  tickCount={11}
                  stroke="#64748b"
                  allowDataOverflow={true}
                />
                <YAxis 
                  stroke="#64748b"
                  width={40}
                />
                <Tooltip 
                  formatter={(value: number) => value.toFixed(3)}
                  labelFormatter={(label: number) => `x: ${label}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <ReferenceLine y={0} stroke="#94a3b8" />
                <ReferenceLine x={0} stroke="#94a3b8" />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#4f46e5" 
                  strokeWidth={3} 
                  dot={false} 
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded text-xs text-slate-500 pointer-events-none border border-slate-100">
               Graph of f(x)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphingCalculator;
