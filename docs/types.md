# Types

CL supports a variety of data types. One non-primitive data type is `List<Type>`, which is parameterized by other data types (including, potentially, more lists).

> **NEEDS WORK**: The list of types presented below are far from comprehensive, and could be further filled out.

## Primitive Types

### `boolean`

The simplest datatype in CL, `boolean` variables can either be `true` or `false`.

### `string`

A `string` object is, like in most languages, a list of characters. However, it cannot be indexed directly (i.e. `"test"[1]` will return an error). Strings can be explicitly defined, and support string interpolation. Only variables of type `string`, `latex`, or `number` can be used for string interpolation. For example:

```desmoscl
x = 5
my_string = "The value of x is ${x}"
# m_string now contains "The value of x is 5"

y = true
broken_str = "The value of y is ${y}"
# This returns an error, as boolean-type variables cannot be interpolated
```

### `latex`

The `latex` object is similar to the `string` object, but specifically supports latex-like formatting. **MORE DETAILS NEEDED**

### `number`

A `number` object in CL can contain any real (well, technically rational) number (positive, negative, and decimal). However, note that no number-based operations can happen directly in CL. Instead, operations like adding two numbers together must be formatted as a string using string interpolation, and then sent through the `numericValue` function to get a value. For example:

```desmoscl
x = 5
y = 3
z = numericValue("${x} + ${y}")
```

### `sketch`

**DETAILS NEEDED**

### `component`

All components have an attribute `script` of type `componentScript`, which allows access to variables defined in other components.

**DETAILS NEEDED**
