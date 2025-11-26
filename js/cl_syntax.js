
const KEYWORDS = {
  keyword: ["when", "otherwise", "and", "or", "not",
            "number", "boolean", "string", "latex", 
            "List", 
  ],
  built_in: ["map", "filter", "first", "all", "any", "range", "slice", "join", "reverse", "reduce"]
}

const FUNCTION = {
          className: 'title.function.invoke',
          begin: /[a-zA-Z0-9_\.]+\(/,
          end: /\)/,
          keywords: KEYWORDS
        }

// Basic parts of the language are variables, strings, properties, and function calls
// We will ensure that each of these kinds of things can fit into the formatted string
const STRING_ESCAPE  = {
  className: "stringEscape",
  keywords: KEYWORDS,
  begin:/\${/,
  end:"}"
}
const FORMAT_STRING_MODE = {
  scope: 'string',
  begin: '"',
  end: '"',
  contains: [
    hljs.BACKSLASH_ESCAPE,
    STRING_ESCAPE
  ]
};

// Currently abandoned, can't figure out how to get the conditional to extend until the end of its parent without recursing terribly
const CONDITIONAL = {
  scope: "conditional_when",
  keywords: "when otherwise",
  begin: "when",
  end: /otherwise/,
  starts:{
    scope: "conditional_otherwise",
    begin: /\s+(?=[^\s])/,
    end: /$/
  }
}

const FORMAT_LTX_MODE = {
  scope: 'string',
  name: 'ltx_string',
  begin: '`',
  end: '`',
  contains: [
    hljs.BACKSLASH_ESCAPE,
    STRING_ESCAPE
  ]
};

const STANDARD_ARG_MODES = [
  FORMAT_STRING_MODE,
  FORMAT_LTX_MODE,
  FUNCTION,
  hljs.C_NUMBER_MODE,
//  CONDITIONAL
]

STRING_ESCAPE.contains = STANDARD_ARG_MODES
FUNCTION.contains = STANDARD_ARG_MODES
//CONDITIONAL.contains = STANDARD_ARG_MODES
//CONDITIONAL.starts.contains = STANDARD_ARG_MODES


var cllang = function (hljs)
{
  return {
    case_insensitive: false,
    keywords: KEYWORDS,
    contains:
      [
        ...STANDARD_ARG_MODES,
        hljs.HASH_COMMENT_MODE,
        
        // Stuff before the colon
        {
          scope: 'title.function',
          begin: /^(?=[^\n]*:)/,
          end:/:/,
          endScope: "punctuation",
          contains:[
            {
              scope: 'punctuation', 
              begin: /\(/,
              end: /\)/,
              contains:[
                hljs.QUOTE_STRING_MODE,
                hljs.C_NUMBER_MODE,
              ]
            }
          ],
          starts:{
            scope: 'post_sink',
            end: /$/,
            keywords: KEYWORDS,
            contains:[
              ...STANDARD_ARG_MODES
            ]
          }
        },
        {
          scope: 'declaration',
          begin: /^.*=/,
          end: "$",
          keywords: KEYWORDS,
          contains:[
            ...STANDARD_ARG_MODES
          ]
        }
      ]
  }
}

hljs.registerLanguage("desmoscl", cllang)