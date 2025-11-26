import {syntaxTree} from "@codemirror/language"
import {CompletionContext} from "@codemirror/autocomplete"
import { funcDescs } from "./function-descriptions"

const patternOptions = Object.keys(funcDescs).map(tag => ({label: tag, type: "keyword"}))

export function completeCLPattern(context: CompletionContext) {
  let word = context.matchBefore(/\w*/)
  if (!word || word.from == word.to && !context.explicit){
    return null
  }
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1)
  const cur_type = nodeBefore.name
  switch(cur_type){
    case "Identifier":
      return {
        from: word.from,
        options: patternOptions,
        validFor: /^(@\w*)?$/
      }
    case "Prefix":
      return {
        from: word.from,
        options: [
          {
            label: "patterns.",
            type: "keyword"
          },
          {
            label: "p.",
            type: "keyword"
          }
        ]
      }
    default:
      return null
  }
}
