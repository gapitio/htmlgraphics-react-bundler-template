import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";

const OUT_DIR = "dist";

export default [
  {
    input: "src/onInit.tsx",
    output: {
      dir: OUT_DIR,
      format: "iife",
      sourcemap: false,
    },
    plugins: [
      postcss({
        extract: "style.css",
      }),
      typescript(),
      terser(),
      nodeResolve({
        browser: true,
        dedupe: ["react", "react-dom"],
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      commonjs(),
      json({
        preferConst: true,
      }),
    ],
  },
  {
    input: "src/onRender.ts",
    output: {
      dir: OUT_DIR,
      format: "iife",
      sourcemap: false,
    },
    plugins: [
      typescript(),
      terser(),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
    ],
  },
];
