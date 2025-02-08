// @ts-types="@types/react"
import { parseArgs } from "@std/cli";
import { withFullScreen } from "fullscreen-ink";
import React from "react";
import { App } from "./app.tsx";

if (import.meta.main) {
  const { url } = parseArgs(Deno.args, {
    string: ["url"],
  });
  const kv = await Deno.openKv(url);
  withFullScreen(React.createElement(App, { kv, url: "kvx-playground" }))
    .start();
}
