import {styleTags, tags} from "@lezer/highlight"

export const patternHighlight = styleTags({
  // "patterns" is a keyword
  Prefix: tags.keyword,
  String: tags.string,
  // Parentheses
  "( )": tags.paren,
  // Should give Identifiers a different style :P
  Identifier: tags.variableName 
})