# gitrt-auto-commit
GitRT auto commit tool

## Installation

`npm install --save-dev gitrt-auto-commit` or `npm install --global gitrt-auto-commit`.

## Usage

CLI
    $ auto-commit <repo-path>

Options
    --timeout, -t Timeout [1000]
    --absolutePath, -a Use absolute path [false]
    --silent, -s Silent [false]

Examples
    $ auto-commit ./my-repository --timeout 2000 --silent
    $ auto-commit ./my-repository -t 250 -s -a

## License

GNU v3.0 © [@adelriosantiago](https://twitter.com/adelriosantiago)