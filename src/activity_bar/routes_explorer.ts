"use strict";
import { resolve } from "path";
import * as vscode from "vscode";

import { notEmpty, runShellCmd } from "../utils";

interface Route {
  prefix: string;
  verb: string;
  uri: string;
  action: string;
}

export function initRouteExplorer() {
  getRoutes().then((routes: Route[]) => {
    vscode.window.registerTreeDataProvider(
      "ruby-on-rails.rakeRoutesExplorer:ruby-on-rails",
      new RouteTreeDataProvider(routes)
    );
  });
}

export function getRoutes(): Promise<Route[]> {
  return runShellCmd("rails", ["routes"]).then(parseRoutes);
}

class RouteTreeDataProvider implements vscode.TreeDataProvider<Route> {
  constructor(public routes: Route[]) {
    this.routes = routes;
  }
  getTreeItem(element: Route): vscode.TreeItem {
    let treeItem = new vscode.TreeItem(element.prefix);
    treeItem.tooltip = element.uri;
    treeItem.iconPath = vscode.Uri.file(
      // TODO: Add a better lookup
      resolve(`${__dirname}/../../images/${element.verb}.svg`)
    );
    return treeItem;
  }

  getChildren(element?: Route | undefined): vscode.ProviderResult<Route[]> {
    return this.routes;
  }
}

export function parseRoutes(input: string): Route[] {
  let [, ...lines] = input.split("\n");
  let prevPrefix: string;

  return lines.filter(notEmpty).map(line => {
    const members = line.split(" ").filter(notEmpty);
    let prefix, verb, uri, action;
    if (members.length === 4) {
      [prefix, verb, uri, action] = members;
      prevPrefix = prefix;
    } else {
      [verb, uri, action] = members;
      prefix = prevPrefix;
    }

    return { prefix, verb, uri, action };
  });
}
