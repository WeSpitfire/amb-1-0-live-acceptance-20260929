import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? files(target) : [target];
  });
}
const invalid = files("src").filter((file) => readFileSync(file, "utf8").includes("FIXME"));
if (invalid.length) { console.error(`FIXME markers: ${invalid.join(", ")}`); process.exit(1); }
