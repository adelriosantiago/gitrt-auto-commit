#!/usr/bin/env node
"use strict"

const meow = require("meow")
const script = require("../index.js")

const cli = meow(
  `
    Usage
      $ auto-commit <repo-path>
 
    Options
      --timeout, -t Timeout [1000]
      --commitMsg, -m Commit message ["auto-commit"]
      --absolutePath, -a Use absolute path [false]
      --silent, -s Silent [false]
 
    Examples
      $ auto-commit ./my-repository --timeout 2000 --silent
      $ auto-commit C:/path/to/my-repository -t 250 -s -a -m "auto"
  `,
  {
    flags: {
      timeout: {
        type: "number",
        default: 1000,
        alias: "t",
      },
      commitMsg: {
        type: "string",
        default: "auto-commit",
        alias: "m",
      },
      absolutePath: {
        type: "boolean",
        default: false,
        alias: "a",
      },
      silent: {
        type: "boolean",
        default: false,
        alias: "s",
      },
    },
  }
)

script.run(cli.input[0], cli.flags)
