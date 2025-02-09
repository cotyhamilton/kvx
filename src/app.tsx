import { Box, Text, useApp, useInput } from "ink";
import TextInput from "ink-text-input";
// @ts-types="@types/react"
import { useEffect, useState } from "react";
import { DetailView } from "./detail-view.tsx";
import { Header } from "./header.tsx";
import { ListView } from "./list-view.tsx";

const getKeys = async (kv: Deno.Kv) => {
  const entries = kv.list({ prefix: [] });
  const list: Deno.KvEntry<unknown>[] = [];
  for await (const entry of entries) {
    list.push({
      ...entry,
    });
  }
  return list;
};

type Props = {
  kv: Deno.Kv;
  url: string;
};

export function App({ kv, url }: Props) {
  const { exit } = useApp();
  const [keys, setKeys] = useState<Deno.KvEntry<unknown>[]>([]);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [commandMode, setCommandMode] = useState(false);
  const [command, setCommand] = useState("");
  const [view, setView] = useState<"list" | "detail">("list");

  useInput((input, key) => {
    if (input === ":") {
      setCommandMode(true);
    } else if (commandMode && key.escape) {
      setCommand("");
      setCommandMode(false);
    }
  });

  const refreshKeys = async () => {
    setKeys(await getKeys(kv));
  };

  useEffect(() => {
    refreshKeys();
  }, []);

  useEffect(() => {
    if (keys.length && hoverIndex >= keys.length) {
      setHoverIndex(keys.length - 1);
    }
  }, [keys]);

  const submitCommand = () => {
    if (command === "q") {
      exit();
    }
    setCommand("");
    setCommandMode(false);
  };

  return (
    <Box flexDirection="column" width="100%">
      <Header
        url={url}
        navigation={view === "list"
          ? <ListView.Navigation />
          : <DetailView.Navigation />}
      />
      {commandMode && (
        <Box borderStyle="round" borderColor="cyanBright" paddingLeft={1}>
          <Text>:</Text>
          <TextInput
            value={command}
            onChange={setCommand}
            onSubmit={submitCommand}
          />
        </Box>
      )}
      <Box
        flexGrow={1}
        borderStyle="round"
        borderColor={commandMode ? "blue" : "cyanBright"}
        flexDirection="column"
      >
        <Box
          marginTop={-1}
          justifyContent="center"
        >
          <Text color="cyanBright" bold>{` Keys[`}</Text>
          <Text color="whiteBright" bold>{keys.length}</Text>
          <Text color="cyanBright" bold>{`] `}</Text>
        </Box>

        {view === "list" && (
          <ListView
            keys={keys}
            hoverIndex={hoverIndex}
            onHoverChange={setHoverIndex}
            onDelete={async (key) => {
              await kv.delete(key);
              await refreshKeys();
            }}
            onSelect={() => setView("detail")}
          />
        )}
        {view === "detail" && (
          <DetailView
            data={keys[hoverIndex]}
            onBack={() => setView("list")}
          />
        )}
      </Box>
    </Box>
  );
}
