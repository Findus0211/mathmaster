/**
 * Safely evaluates a math expression for a given x.
 * Supports basic JS Math functions and ^ for power.
 */
export const evaluateFunction = (expression: string, x: number): number | null => {
  try {
    // Replace common math notation with JS syntax
    // 1. Replace ^ with **
    let jsExpr = expression.replace(/\^/g, '**');
    
    // 2. Insert * between number and variable (e.g., 2x -> 2*x)
    jsExpr = jsExpr.replace(/(\d)([a-zA-Z])/g, '$1*$2');
    
    // 3. Insert * between closing parenthesis and variable/number (e.g., )x -> )*x)
    jsExpr = jsExpr.replace(/\)([\w\d])/g, ')*$1');

    // 4. Handle common Math functions (sin, cos, tan, log, sqrt) to Math.function
    // We want to map "sin" to "Math.sin" but avoid double mapping if user typed Math.sin
    const mathFunctions = ['sin', 'cos', 'tan', 'log', 'sqrt', 'abs', 'pow', 'exp', 'PI'];
    
    mathFunctions.forEach(fn => {
      const regex = new RegExp(`\\b${fn}\\b(?!\.)`, 'g');
      jsExpr = jsExpr.replace(regex, `Math.${fn}`);
    });

    // Create a safe function execution
    // Note: 'new Function' is generally safer than 'eval' but still requires care.
    // In a production app, we would use a library like mathjs.
    const func = new Function('x', `return ${jsExpr};`);
    const result = func(x);

    if (isNaN(result) || !isFinite(result)) return null;
    return result;
  } catch (e) {
    // console.error("Error evaluating function:", e);
    return null;
  }
};

export const generateGraphData = (
  expression: string, 
  xMin: number, 
  xMax: number, 
  points: number = 100
): { x: number; y: number | null }[] => {
  const data = [];
  const step = (xMax - xMin) / points;

  for (let i = 0; i <= points; i++) {
    const x = xMin + i * step;
    // Fix floating point precision for display (e.g., 0.000000001 -> 0)
    const cleanX = parseFloat(x.toFixed(2)); 
    const y = evaluateFunction(expression, x);
    data.push({ x: cleanX, y: y });
  }
  return data;
};
