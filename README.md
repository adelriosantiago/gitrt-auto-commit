# gitrt-auto-commit
GitRT auto commit tool

## Installation

`npm install --save-dev gitrt-auto-commit` or `npm install --global gitrt-auto-commit`.

## Usage

On your CLI: `auto-commit <repo-path>`

Options:
 - `--timeout`, `-t` Timeout [1000]
 - `--commitMsg`, `-m` Commit message ["auto-commit"]
 - `--absolutePath`, `-a` Use absolute path [false]
 - `--silent`, `-s` Silent [false]

Examples:
 - `auto-commit ./my-repository --timeout 2000 --silent`: Auto commit every 2 seconds in silent mode.
 - `auto-commit C:/path/to/my-repository -t 250 -s -a -m "auto"`: Auto commit every 250 milliseconds on absolute path with commit message "auto".

## License

GNU v3.0 © [@adelriosantiago](https://twitter.com/adelriosantiago)