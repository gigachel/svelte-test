// import * as fs from 'fs';
import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'js/index.js',
  output: {
    file: '../assets/js/bundleR.js',
    format: 'iife',
  },
  plugins: [
    svelte(),
    resolve(),
    commonjs(),
    terser(),
  ]
};