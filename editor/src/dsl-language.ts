import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { parser } from "./dsl-parser.js";
import { completeCLPattern } from "./dsl-autocomplete.js"

export function dsl() {
  const dslLanguage = LRLanguage.define({
    parser
  });
  const dslCompletion = dslLanguage.data.of({
    autocomplete: completeCLPattern
  });
  return new LanguageSupport(dslLanguage, [dslCompletion]);
}
