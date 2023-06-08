import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import typescript from 'rollup-plugin-typescript2'
import strip from '@rollup/plugin-strip'

const entries = [
  'src/index.ts',
]

const plugins = [
  babel({
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [['env', { modules: false }]]
  }),
  resolve({
    preferBuiltins: true,
  }),
  strip(),
  alias(),
  json(),
  typescript(),
  commonjs(),
  esbuild({
    minify: process.env.NODE_ENV === 'production',
    logLevel: "silent"
  }),
]

export default [
  ...entries.map(input => ({
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        format: 'cjs',
      },
    ],
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    output: {
      file: input.replace('src/', '').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    external: [],
    plugins: [
      dts({ respectExternal: true }),
    ],
  })),
]