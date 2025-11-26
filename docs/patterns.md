# Patterns

The official documentation on patterns can be found [here](https://classroom.amplify.com/computation-layer/documentation#interpreting-math).

> **WARNING**: Patterns are currently a beta feature, so be careful while using them. For advanced pattern usage, take a look at the Desmos CL forums [here](https://cl.desmos.com).

## Brief Introduction

The different patterns in Desmos CL are tools which can be used to require student answers in certain formats or to parse complex student inputs. Some of these patterns can themselves contain other patterns, like the `fraction` pattern which requires a pattern for the numerator and denominator.

### Generating Patterns

I personally think that examples are the best way to learn the peculiar format for defining patterns. Let's say that we want to make a pattern that matches a basic fraction in the format \\(\frac{a}{b}\\). We could define that as:

```desmoscl
frac_pattern = patterns.fraction(patterns.number, patterns.number)
```

Then, let's say that students are putting their answer (as a fraction) into a math response component named `math_resp`. Then we could get the numerator of their response with:

```desmoscl
frac_pattern.parse(math_resp.latex).numerator().latex
```

The `parse` method parses the student response and returns an object which we can get the numerator, denominator, or latex from. Note that each pattern object will have different things you can parse out of it (fractions have numerators and denominators, exponents have bases and exponents, etc.).

For a more complex pattern example, let's say that we gave our students the challenge of converting \\(\left(\frac{a}{b}\right)^5\\) into a fraction, with an expected answer of \\(\frac{a^5}{b^5}\\). This would correspond to the following pattern. Note that we can assign `patterns` to a shorthand variable to reduce the size of our pattern definition.

```desmoscl
p = patterns
ans_pattern = p.fraction(p.exponent(p.literal("a"), p.integer), p.exponent(p.literal("b"), p.integer))
```

Now that we have the answer, we can first check _that_ the student answer is in this format. To do this, we would use `matches` like so:

```desmoscl
ans_matches = ans_pattern.matches(math_resp.latex)
```

Once we've checked that, we can confirm that the exponents are correct by using multiple applications of `parse` like so:

```desmoscl
a_exp = ans_pattern.parse(math_resp.latex).numerator().exponent().numericValue
b_exp = ans_pattern.parse(math_resp.latex).denominator().exponent().numericValue

is_correct = (a_exp = 5) and (b_exp = 5)
```

### Pattern Playground

If you want to play around with the different patterns that are possible, below you can find a kind of "pattern playground" which will render the latex that corresponds to the kind of pattern you are constructing. Note that "patterns." or "p." both work as prefixes, though only "patterns." will work as a prefix in the CL editor (unless you've included the line `p = patterns`). Additionally, this playground only includes a set of the more common patterns (the ones with explanations currently in this documentation).

**Input your pattern here:**

<div data-editor="codemirror" style="border-style:solid; border-color:grey"></div>

**Pattern Preview**

<div data-math="output"></div>

**Pattern Warnings**

<div data-math="error" style="color:red; padding-top:.5rem;"></div>

## Kinds of Patterns

{{ patterns() }}
