# CL Syntax

A great introduction to the Amplify Activity editing environment and CL programming language can be found in the [Amplify CL Documentation](https://classroom.amplify.com/computation-layer/documentation#getting-started). Below is a brief summary of the syntax, which will hopefully eventually be filled out more comprehensively

## Sinks and Sources

There are two ways to interact with CL components, and those are through _sinks_ and _sources_. Sinks are the way that you set attributes of a component (e.g. the text in a Note, or the drawings in a Sketch), and sources are the ways that you read from a component. The syntax for setting the value of a sink is as follows:

```desmoscl
sink_name: sink_value
```

Note that this will set the sink of the component whose CL code you are actively editing. Note that, sometimes, `sink_name` will be followed by parentheses containing some argument (for example, the `itemContent` source of the Ordered List component).

If we want to access the value of a source from a component, we can do that at any place in the activity using the syntax:

```desmoscl
component_name.source_name
```

For example, let's say that we have a Note component in which we want to display the answer a student put into a Math Response component called `math_resp`. In the Note component, we would write:

```desmoscl
content: math_resp.latex
```

This sets the `content` sink of the Note to the value of the `latex` source in the Math Response component.

For a more comprehensive list of sinks and sources corresponding to each component, take a look at the [Components page](components.md)

## Variable Assignment

In addition to sinks and sources, CL also allows you to define variables in the CL editor to store values. The basic format for this is:

```desmoscl
variable_name = variable_value
```

This can be incredibly useful to break up redundancy in your CL code and to make things more readable.
