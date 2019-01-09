"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import * as vscode from "vscode";

import {
  initRakeExplorer,
  initRouteExplorer,
  runRakeTask
} from "./activity_bar";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  const gemfilePath = join(vscode.workspace.rootPath || "", "Gemfile");

  if (!existsSync(gemfilePath)) {
    return;
  }

  const Gemfile = readFileSync(gemfilePath, "utf-8");
  if (Gemfile.includes("rails")) {
    vscode.commands.executeCommand("setContext", "workspaceIsRails", "true");
  }

  const commands: Array<[string, (...args: any[]) => void]> = [
    ["rake.runRakeTask", runRakeTask]
  ];

  commands.forEach(([label, command]) => {
    let disposable = vscode.commands.registerCommand(label, command);
    context.subscriptions.push(disposable);
  });

  initRakeExplorer();
  initRouteExplorer();
}

// this method is called when your extension is deactivated
export function deactivate() {}
