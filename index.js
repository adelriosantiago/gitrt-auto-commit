//GitRT auto commit tool
"use strict"

const path = require("path")
const simpleGit = require("simple-git")

let settings = {
  baseDir: path.join(process.cwd(), "./"),
  binary: "git",
  maxConcurrentProcesses: 6,
  timeout: 1000,
}

const git = simpleGit(settings)

;(async () => {
  const status = await git.status()
  if (status.modified.length === 0) return
  await git.add("./*")
  await git.commit(`gitrt-auto-commit on ${new Date()}`)
  console.log("status", status)
})()

const run = (_settings) => {
  Object.assign(settings, _settings)
  console.log("ttt", settings, _settings)
}

run({ timeout: 999 })

module.exports = { run }
