const rollup = require("rollup");
const rollupTypescript = require("rollup-plugin-typescript");
const fs = require("fs");
const fetch = require("node-fetch");

const build = async function() {
  const bundle = await rollup.rollup({
    input: "./src/main.ts",
    plugins: [rollupTypescript()]
  });

  await bundle.write({
    file: "dist/main.js",
    format: "cjs"
  });
};

const commit = async function() {
  const content = await fs.readFileSync("./dist/main.js", {
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
