//GitRT auto commit tool
"use strict"

const path = require("path")
const simpleGit = require("simple-git")

let settings = {
  // SimpleGIT settings
  binary: "git",
  maxConcurrentProcesses: 6,
  // GitRT settings
  folder: [],
  timeout: 1000,
  verbose: false,
}
let timer

const run = (_settings) => {
  Object.assign(settings, _settings)
  settings.baseDir = path.join(process.cwd(), ..._settings.folder)

  const git = simpleGit(settings)

  timer = setTimeout(async function myTimer() {
    const status = await git.status()

    if (status.modified.length !== 0) {
      await git.add("./*")
      await git.commit(`gitrt-auto-commit on ${new Date()}`)
      if (settings.verbose) console.log("Git commit done")
    }
    timer = setTimeout(myTimer, settings.timeout)
  }, settings.timeout)
}

const stop = () => {
  clearTimeout(timer)
}

// TEST
run({ folder: ["example-repo"], timeout: 1000, verbose: true })

module.exports = { run, stop }
