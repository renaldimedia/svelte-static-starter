import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import autoPreprocess from "svelte-preprocess";
// import purgeCss from '@fullhuman/postcss-purgecss';
import livereload from "rollup-plugin-livereload";
import postcss from "rollup-plugin-postcss";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
// import svelte_preprocess_postcss from "svelte-preprocess-postcss";
import sass from "node-sass";
import copy from "rollup-plugin-copy";
import css from 'rollup-plugin-css-only';
import replace from "@rollup/plugin-replace";

// const production = !process.env.ROLLUP_WATCH;
// console.log(process.argv);
const buildFor = "panel";
const production = false;
const dir = production ? "dist" : "public";

const builded = ["materi", "", "ppdb", "visimisi", "artikel", "detailartikel", "gallery", "organisasi", "dapok", "ekskul", "osis", "detailekskul", "dataguru", "datastaff", "examdo", "examreview", "dashboard", "profile", "tugas", "choice", "jadwal", "forum"];

const buildthese = builded;

const COMMON = function (mydir, page) {
  const csssvelteout = page != "" ? mydir + "/" + page + "/components.css" : mydir + "/components.css";
  const indexhtml = page != "" ? mydir + "/" +  page : mydir;
  const mainjs = page != "" ? mydir + "/" +  page + "/bundle.js" : mydir + "/bundle.js";
  return {
    input: page != "" ? "src/pages/" + page + "/index.js" : "src/main.js",
    output: {
      sourcemap: !production,
      format: "iife",
      name: "app",
      file: mainjs,
    },
    plugins: [
      copy({
        targets: [
          { src: page != "" ? "src/index.html" : "src/main.html", dest: indexhtml, rename: "index.html" },
          { src: "src/global.css", dest: mydir },
        ],
      }),
      css({ output: "index.css" }),
      replace({
        __buildDate__: () => JSON.stringify(new Date()),
        __buildVersion: 15,
        __buildFull: "yes",
        __BASE_URL: "http://localhost:5000",
        __BASE_API_URL: "http://localhost:8000/api",
        __BASE_ADMIN_URL: "http://localhost/sisko-neo-admin",
        __DEV_MODE: true,
        __DEMO_MODE: true,
        __DEMO_TYPE: buildFor
      }),
      svelte({
        hydratable: true,
        dev: !production,
        preprocess: [
          autoPreprocess({
            postcss: require("./postcss.config.js"),
            defaults: { style: "postcss" }
          })
        ],
        css: (css) => {
          css.write(csssvelteout, !production);
        }
      }),
      resolve({
			browser: true,
			dedupe: ['svelte']
		}),
      commonjs(),
      postcss({
        minimize: true,
        extract: true
    }),
      !production && livereload(mydir),
      production && terser({ compress: true, mangle: true }),
    ],
    watch: {
      clearScreen: true,
    },
  };
};

const exp = (function () {
  var ret = [];
  buildthese.forEach((folder) => ret.push(COMMON(dir, folder)));
  return ret;
})();

export default exp;

