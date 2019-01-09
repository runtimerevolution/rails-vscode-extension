"use strict";
import * as vscode from "vscode";

import { spawn } from "child_process";

export function runShellCmd(cmd: string, args: string[]) {
  return new Promise<string>((accept, reject) => {
    let output: string[] = [];
    let p = spawn(
      process.env.SHELL as any,
      ["-c", "-l", ["bundle", "exec", cmd, ...args].join(" ")],
      {
        cwd: vscode.workspace.rootPath || ""
      }
    );
    function storeOutput(data: any) {
      output.push(data.toString());
    }

    p.stdout.on("data", storeOutput);
    p.stderr.on("data", storeOutput);
    p.on("close", (status: string) => {
      if (status) {
        reject(output);
      } else {
        accept(output.join("\n"));
      }
    });
  });
}

export const notEmpty = (e: string) => e !== "";
