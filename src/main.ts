import { parseArgs } from "@std/cli";
import { withFullScreen } from "fullscreen-ink";
// @ts-types="@types/react"
import React from "react";
import { App } from "./app.tsx";

if (import.meta.main) {
  const { url } = parseArgs(Deno.args, {
    string: ["url"],
  });
  const kv = await Deno.openKv(url);

  const app = withFullScreen(
    React.createElement(App, {
      kv,
      url: url ?? "kvx-playground",
    }),
  );

  await app.start();
  await app.waitUntilExit();
  kv.close();
}
