import { parser } from "./dsl-parser";
import { TreeCursor } from "@lezer/common";
import { funcDescs } from "./function-descriptions";

function incompText(text: string) : string {
  return `{\\color{red}\\text{${text}}}`
}

export function convertDslToLatex(input: string): { warnings: string[]; latex: string } {
  try {
    const tree = parser.parse(input);
    const cursor = tree.cursor();
    
    // Step into the Program to get to the Pattern
    cursor.firstChild()

    function walk(c: TreeCursor): {warnings: string[], latex: string} {
      const warnings: string[] = [];
      if (c.type.name === "Pattern") {
        c.firstChild();   // Prefix | String
        //@ts-ignore
        if(c.type.name === "String"){
          const str = input.slice(c.from + 1, c.to - 1)
          c.parent();
          return {warnings:[], latex:`\\text{${str}}`}
        }
        const pref = input.slice(c.from, c.to)

        c.nextSibling();  // Expression
        c.firstChild();   // Variable | FunctionCall
        const type = c.type.name;
        console.log(type)
        c.firstChild(); // Identifier
        const id = input.slice(c.from, c.to);
        let args: string[] = [];

        //@ts-ignore TS has problem with c itself changing
        if (type === "FunctionCall"){
          c.nextSibling() // Args
          c.firstChild() // First Argument
          do {
            if (c.type.name === "Pattern") {
              const walk_res = walk(c)
              warnings.push(...walk_res.warnings)
              args.push(walk_res.latex);
            }
          } while (c.nextSibling()) // next argument
          c.parent()
        //@ts-ignore
        }

        // Since this function is currently recursive and passes a reference,
        // reset the reference
        c.parent()
        c.parent()
        c.parent()
        
        // I wonder if we just want to do away with all prefixes for this?
        if(id in funcDescs && (pref == "patterns" || pref == "p")){
          const func = funcDescs[id]
          // n_args of -1 means variable args
          const var_args = (func.n_args === -1)
          const min_args = var_args ? 2 : func.n_args
          if("warning" in func){
            warnings.push(func.warning)
          }
          if(args.length === min_args || (var_args && args.length > min_args)){
            return {warnings: warnings, latex: func.latex(args)}
          } else if (args.length < min_args){
            const padding = new Array(min_args - args.length).fill("undefined")
            return {warnings: warnings, latex: func.latex(args.concat(padding))}
          } else {
            const arg_text = "(" + args.join(", ") + ")"
            return {warnings: warnings, latex: incompText(pref + "." + id) + arg_text}
          }
        } else {
          if (args.length > 0){
            const arg_text = "(" + args.join(", ") + ")"
            return {warnings: warnings, latex: incompText(pref + "." + id) + arg_text}
          } else {
            return {warnings: warnings, latex: incompText(pref + "." + id)}
          }
        }
      }
      const res = input.slice(c.from, c.to)
      return {warnings: warnings, latex: incompText(res)};
    }
    const res = walk(cursor)
    
    return res;
  } catch (e : any) {
    return { warnings: ["Parse Error"], latex: "" };
  }
}
