import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';

export default {
  input: './src/single-spa.js',
  output: {
    file: './lib/umd/single-spa.js',
    format: 'umd',
    name: 'singleSpa',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    process.env.SERVE && serve({
      open: true,
      openPage: '/index.html',
      host: 'localhost',
      port: 8080
    })
  ]
}