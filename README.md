# The Unofficial Desmos CL Documentation

Welcome to the Unofficial Desmos CL Documentation, the community-made source for tips and tricks about using Desmos CL! The purpose of this website is to provide a space where the amazing information provided on the CL forum ([cl.desmos.com](https://cl.desmos.com)).

## Contributing

There are many ways to contribute to this project. The easiest is to open an Issue on this repository to share either (1) inaccuracies, (2) information that is missing which you would find useful, or (3) new features you would like to see added.

Another way to contribute is by making edits and then making a pull request to this repository!

### Content Standards

In order to maintain the quality of the content on this website, there are a few standards which should be upheld for any content which will be added.

1. All Desmos CL examples must be tested and actually function.
2. All content must be original or uploaded with the express permission of the original author.

### Building the Docs

This documentation is constructed with [MkDocs](https://www.mkdocs.org/). Additionally, the interactive Pattern playground uses [CodeMirror](https://codemirror.net/) for the UI and [Lezer](https://lezer.codemirror.net/) for input parsing. Thus, building the docs requires both building the editor library and building the docs.

1. Clone this repository.
2. [Install MkDocs](https://www.mkdocs.org/user-guide/installation/)
3. [Install NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
4. Build the Editor library
   1. In the directory `editor/`, run `npm i`
   2. Run `npm run build`
5. In the root director, run `mkdocs serve`

## Disclaimer

> Visit Amplify Classroom for free lessons, lesson-building tools, and Polypad virtual manipulatives at amplifycom.wpengine.com/classroom. This content is not affiliated with, sponsored by, or endorsed by Amplify or any of its licensors. Amplify®, Amplify Classroom™, and related trademarks are the property of Amplify Education, Inc.
