import { Arguments } from "../../../deps/yargs.ts";
import { increment, IncrementKind } from "../../util/increment.ts";
import {
  printVersion,
  readVersionFile,
  writeVersionFile,
} from "../../util/version.ts";
import { postVersionHook } from "../../hooks/mod.ts";
import { IContext } from "../../context.ts";

export const none = {
  command: ["none", "$0"],
  describe: "A none version increment",
  handler: async (args: Arguments & IContext) => {
    const { pre, name, value, build } = args;
    const version = await readVersionFile();
    const { previous, current } = increment({
      kind: IncrementKind.None,
      version,
      pre: pre ? name : undefined,
      value,
      build,
    });
    await writeVersionFile(current);
    await postVersionHook(
      args,
      previous.format({ style: "full" }),
      current.format({ style: "full" }),
    );
    await printVersion(args, current);
  },
};
