"use strict";
import * as vscode from "vscode";

import { notEmpty, runShellCmd } from "../utils";

export function initRakeExplorer() {
  getRakeTasks().then((tasks: RakeTask[]) => {
    vscode.window.registerTreeDataProvider(
      "ruby-on-rails.rakeTaskExplorer:ruby-on-rails",
      new RakeTreeDataProvider(tasks)
    );
  });
}

interface RakeTask {
  name: string;
  description: string;
}

export function getRakeTasks(): Promise<RakeTask[]> {
  return runShellCmd("rake", ["-T"]).then((output: string) => {
    return output
      .split("\n")
      .filter(notEmpty)
      .map(t => {
        let [name, description] = t.split("#").map(e => e.trim());
        name = name.replace("rake ", "");
        return { name, description };
      });
  });
}

class RakeTreeDataProvider implements vscode.TreeDataProvider<RakeTask> {
  constructor(public tasks: RakeTask[]) {
    this.tasks = tasks;
  }
  getTreeItem(element: RakeTask): vscode.TreeItem {
    let treeItem = new vscode.TreeItem(element.name);
    treeItem.command = {
      title: "",
      command: "rake.runRakeTask",
      arguments: [element.name]
    };
    treeItem.tooltip = element.description;
    return treeItem;
  }

  getChildren(
    element?: RakeTask | undefined
  ): vscode.ProviderResult<RakeTask[]> {
    return this.tasks;
  }
}

let terminal: vscode.Terminal;

export function runRakeTask(rakeTask: any) {
  if (!terminal) {
    terminal = vscode.window.createTerminal("RAKE");
  }
  terminal.show();
  terminal.sendText(`rake ${rakeTask}`);
}
