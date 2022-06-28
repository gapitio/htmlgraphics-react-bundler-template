import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import livereload from "rollup-plugin-livereload";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import html from "rollup-plugin-html";

const OUT_DIR = "public/build";

export default [
  {
    input: "src/devSite/index.ts",
    output: {
      dir: OUT_DIR,
      format: "iife",
      sourcemap: true,
    },
    watch: {
      clearScreen: false,
    },
    plugins: [
      html({
        include: "src/html.html",
      }),
      json({
        preferConst: true,
      }),
      typescript({
        check: false,
        tsconfig: "./tsconfig.json",
      }),
      nodeResolve({
        browser: true,
      }),
      livereload(OUT_DIR),
    ],
  },
  {
    input: "src/onInit.tsx",
    output: {
      dir: OUT_DIR,
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      postcss({
        extract: "style.css",
      }),
      typescript({
        check: false,
      }),
      nodeResolve({
        browser: true,
        dedupe: ["react", "react-dom"],
      }),
      replace({
        preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify("development"),
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
      sourcemap: true,
    },
    plugins: [
      typescript({
        check: false,
      }),
      nodeResolve({
        browser: true,
      }),
      commonjs(),
    ],
  },
];
