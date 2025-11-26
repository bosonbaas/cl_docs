const numberTypes = [
  "number",
  "integer",
  "mixedNumber",
  "scientific",
  "expression"
]

export const funcDescs: {[key: string]: any} = {
  literal: {
    n_args: 1,
    latex: (args:string[]):string => `${args[0]}`
  },
  contains: {
    n_args: 1,
    latex: (args:string[]):string => `\\text{contains }${args[0]}`
  },
  fraction: {
    n_args: 2,
    latex: (args:string[]):string => `\\frac{${args[0]}}{${args[1]}}`
  },
  division: {
    n_args: 2,
    latex: (args:string[]):string => `${args[0]}\\div${args[1]}`
  },
  difference: {
    n_args: 2,
    latex: (args:string[]):string => `${args[0]}-${args[1]}`
  },
  exponent: {
    n_args: 2,
    latex: (args:string[]):string => `{${args[0]}}^{${args[1]}}`
  },
  radical: {
    n_args: 2,
    latex: (args:string[]):string => `\\sqrt[${args[0]}]{${args[1]}}`
  },
  anyOf: {
    n_args: -1,
    latex: (args:string[]):string => args.join("\\text{\\quad or \\quad}")
  },
  sum: {
    n_args: -1,
    latex: (args:string[]):string => args.join("+"),
    warning: "Warning: Unless <code>strictOrder</code> is specified, <code>sum</code> will match any ordering of arguments."
  },
  product: {
    n_args: -1,
    latex: (args:string[]):string => args.join("\\cdot"),
    warning: "Warning: Unless `strictOrder` is specified, `product` will match any ordering of arguments."
  },
  juxt: {
    n_args: -1,
    latex: (args:string[]):string => args.join(""),
    warning: "Warning: `juxt` will not recognize a juxtaposition of two numbers. See `juxt` entry for more details."
  },
}

numberTypes.forEach((val)=>{
  funcDescs[val] = {
    n_args: 0,
    latex: (args:string[]):string => `\\text{${val}}`
  }
})