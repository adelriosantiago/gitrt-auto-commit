//GitRT auto commit tool
"use strict"

const path = require("path")
const simpleGit = require("simple-git")

let timer

const run = (folder, flags) => {
  let settings = {
    path: folder,
    absolutePath: false,
    timeout: 1000,
    silent: false,
  }
  Object.assign(settings, flags)
  if (!settings.path) throw "Path parameter is required"

  let gitSettings = {
    baseDir: settings.relativePath
      ? path.join(process.cwd(), settings.path)
      : settings.path,
    binary: "git",
    maxConcurrentProcesses: 6,
  }
  const git = simpleGit(gitSettings)

  timer = setTimeout(async function myTimer() {
    const status = await git.status()

    if (status.modified.length !== 0) {
      await git.add("./*")
      await git.commit(`gitrt-auto-commit on ${new Date()}`)
      if (!settings.silent) console.log("Git commit done")
    }
    timer = setTimeout(myTimer, settings.timeout)
  }, settings.timeout)
}

const stop = () => {
  clearTimeout(timer)
}

module.exports = { run, stop }
