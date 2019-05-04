const rollup = require("rollup");
const rollupTypescript = require("rollup-plugin-typescript");
const minify = require("minify");
const fs = require("fs");
const fetch = require("node-fetch");

const outFile = "./dist/main.js";

const build = async function() {
  const bundle = await rollup.rollup({
    input: "./src/main.ts",
    plugins: [rollupTypescript()]
  });

  await bundle.write({
    file: outFile,
    format: "cjs"
  });

  // const result = await minify(outFile);
  // await fs.writeFileSync(outFile, result);
};

const commit = async function() {
  const content = await fs.readFileSync(outFile, {
    encoding: "utf8"
  });

  const data = {
    modules: {
      main: content
    }
  };

  const auth = await fs.readFileSync("../auth.txt", {
    encoding: "utf8"
  });

  console.log("request commit");

  const response = await fetch("https://screeps.com/api/user/code", {
    method: "POST",
    headers: {
      "X-Token": auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  console.log(response.status, response.statusText);
  console.log(await response.text());
};

exports.build = build;

exports.commit = commit;

exports.publish = async function() {
  await build();
  await commit();
};
