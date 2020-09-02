//GitRT auto commit tool
"use strict"

const path = require("path")
const simpleGit = require("simple-git")

let timer

const run = (folder, flags) => {
  const settings = { path: folder, ...flags }
  if (!settings.path) throw "Path parameter is required"

  let gitSettings = {
    baseDir: settings.relativePath
      ? path.join(process.cwd(), settings.path)
      : settings.path,
    binary: "git",
    maxConcurrentProcesses: 6,
  }
  const git = simpleGit(gitSettings)

  console.log(`Auto-commit started on ${gitSettings.baseDir}`)

  timer = setTimeout(async function myTimer() {
    const status = await git.status()

    if (status.modified.length !== 0) {
      await git.add("./*")
      await git.commit(settings.commitMsg)
      if (!settings.silent)
        console.log(`Git auto-commit with message: "${settings.commitMsg}"`)
    }
    timer = setTimeout(myTimer, settings.timeout)
  }, 0)
}

const stop = () => {
  clearTimeout(timer)
}

module.exports = { run, stop }
