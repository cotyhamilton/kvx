import { parseArgs } from "@std/cli";
import { withFullScreen } from "fullscreen-ink";
// @ts-types="@types/react"
import React from "react";
import { App } from "./src/app.tsx";

if (import.meta.main) {
  const { url } = parseArgs(Deno.args, {
    string: ["url"],
  });
  const kv = await Deno.openKv(url);

  const forceUpdateEvent = new EventTarget();

  const app = withFullScreen(
    React.createElement(App, {
      kv,
      url: url ?? "kvx-playground",
      forceUpdateEvent,
    }),
  );

  await app.start();

  const cleanup = async () => {
    await app.waitUntilExit();
    kv.close();
    Deno.exit(0);
  };

  addEventListener("unload", () => {
    cleanup();
  });

  addEventListener("hmr", () => {
    forceUpdateEvent.dispatchEvent(new Event("force-update"));
  });

  ["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
    Deno.addSignalListener(signal as Deno.Signal, () => {
      cleanup();
    });
  });
}
