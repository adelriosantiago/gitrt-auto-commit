#!/usr/bin/env node
"use strict"

//Test with: node ./bin/auto-commit.js example-repo

const meow = require("meow")
const script = require("../index.js")

const cli = meow(
  `
    Usage
      $ auto-commit <repo-path>
 
    Options
      --timeout, -t Timeout [1000]
      --absolutePath, -a Use absolute path [false]
      --silent, -s Silent [false]
 
    Examples
      $ auto-commit ./my-repository --timeout 2000 --silent
      $ auto-commit ./my-repository -t 250 -s -a
  `,
  {
    flags: {
      timeout: {
        type: "boolean",
        alias: "t",
      },
      absolutePath: {
        type: "string",
        alias: "a",
      },
      silent: {
        type: "boolean",
        alias: "s",
      },
    },
  }
)

script.run(cli.input[0], cli.flags)
