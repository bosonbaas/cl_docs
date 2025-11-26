import { EditorState, Prec } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { minimalSetup } from "codemirror";
import {syntaxHighlighting, defaultHighlightStyle} from "@codemirror/language";
import { autocompletion } from "@codemirror/autocomplete";
import { dsl } from "./dsl-language";
import { convertDslToLatex } from "./dsl-to-latex";

function oneLineFilter() {
  return EditorState.transactionFilter.of(tr => tr.newDoc.lines > 1 ? [] : tr);
}

function enterIsSubmit(onSubmit: (view: EditorView) => boolean) {
  return Prec.highest(keymap.of([{ key: "Enter", run: onSubmit }]));
}

declare global {
  interface Window {
    mountSingleLineEditor?: (opts: { target: HTMLElement; onChange: (value: string) => void }) => EditorView;
    typesetMath?: (el: HTMLElement) => Promise<void>;
    convertDslToLatex?: typeof convertDslToLatex;
  }
}

export function mountSingleLineEditor({ target, onChange }: { target: HTMLElement; onChange: (value: string) => void }) {
  return new EditorView({
    parent: target,
    state: EditorState.create({
      doc: "p.fraction(p.exponent(p.literal(\"a\"), p.number), p.number)",
      extensions: [
        minimalSetup,
        dsl(),
        syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
        autocompletion(),
        oneLineFilter(),
        EditorView.lineWrapping,
        enterIsSubmit(v => {
          onChange(v.state.doc.toString());
          return true;
        }),
        EditorView.updateListener.of(update => {
          if (update.docChanged) onChange(update.state.doc.toString());
        })
      ]
    })
  });
}

export async function typesetMath(el: HTMLElement, latex: string) {
  // @ts-ignore
  if (window.MathJax?.tex2chtmlPromise && window.MathJax?.startup.document.reset && window.MathJax?.startup.document.updateDocument()
  ) {
    console.log(latex)
    // @ts-ignore
    const promise = window.MathJax.tex2chtmlPromise(latex).then(
      (res:Node) => {
        el.replaceChildren(res)
        // @ts-ignore
        window.MathJax.startup.document.reset();
        // @ts-ignore
        window.MathJax.startup.document.updateDocument();
      }
    )
    // @ts-ignore
    await promise;
  }
}

(window as any).mountSingleLineEditor = mountSingleLineEditor;
(window as any).typesetMath = typesetMath;
(window as any).convertDslToLatex = convertDslToLatex;
