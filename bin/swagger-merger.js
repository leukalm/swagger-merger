#!/usr/bin/env node
/**
 * Created by WindomZ on 17-4-10.
 */
'use strict'

const program = require('commander')

const merger = require('../lib/merger')

let noArgs = true

program
  .version(require('../package.json').version)
  .usage('[-h] [-v] [-c] [-o file] <-i file | file>')
  .description('Merge multiple swagger files into a swagger file, just support JSON/YAML.')
  .option('-i, --input <file>', 'input a main/entry JSON/YAML swagger file',
    /^.+\.(json|yaml|yml)$/gi, null)
  .option('-o, --output <file>', 'output a merged JSON/YAML swagger file, default is `swagger.*`',
    /^.+\.(json|yaml|yml)$/gi, null)
  .option('-c, --compact', 'compact JSON/YAML format string', null, null)
  .option('--debug', 'debug mode, such as print error tracks', null, null)
  .action((options) => {
    noArgs = false

    merger({
      input: options.input || '',
      output: options.output || '',
      compact: options.compact
    }).catch(e => {
      if (options.debug) {
        console.error(e)
      } else {
        console.error(`error: ${e.message}`)
      }
      process.exit(1)
    })
  })

program.parse(process.argv)

if (noArgs) {
  if (program.opts().input) {
    merger({
      input: program.opts().input,
      output: program.opts().output || '',
      compact: program.opts().compact
    }).catch(e => {
      if (program.opts().debug) {
        console.error(e)
      } else {
        console.error(`error: ${e.message}`)
      }
      process.exit(1)
    })
  } else {
    program.outputHelp()
  }
}
