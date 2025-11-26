document.addEventListener("DOMContentLoaded", () => {
  const host = document.querySelector('[data-editor="codemirror"]');
  const out = document.querySelector('[data-math="output"]');
  const err = document.querySelector('[data-math="error"]');
  const initialText = "p.fraction(p.exponent(p.literal(\"a\"), p.number), p.number)"

  if (!host || !out || !window.mountSingleLineEditor || !window.typesetMath || !window.convertDslToLatex) return;

  out.textContent = '';
  err.textContent = '';
  const res = window.convertDslToLatex(initialText);
  window.typesetMath(out, res.latex);

  window.mountSingleLineEditor({
    target: host,
    onChange: (dsl) => {
      const res = window.convertDslToLatex(dsl);
      
      window.typesetMath(out, res.latex);
      err.innerHTML = res.warnings.join("<br/>");
    }
  });
});