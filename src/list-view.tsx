import { Box, Text, useInput } from "ink";

export const ListNavigation = () => {
  return (
    <Box flexDirection="column">
      <Box>
        <Text bold color="blue">{`<d> `}</Text>
        <Text dimColor>Delete</Text>
      </Box>
    </Box>
  );
};

type ListViewProps = {
  keys: Deno.KvEntry<unknown>[];
  hoverIndex: number;
  onHoverChange: (index: number) => void;
  onDelete: (key: Deno.KvKey) => void;
  onSelect: () => void;
};

const ListView = ({
  keys,
  hoverIndex,
  onHoverChange,
  onDelete,
  onSelect,
}: ListViewProps) => {
  useInput((input, key) => {
    if (input === "j" || key.downArrow) {
      if (hoverIndex < keys.length - 1) {
        onHoverChange(hoverIndex + 1);
      }
    }
    if (input === "k" || key.upArrow) {
      if (hoverIndex > 0) {
        onHoverChange(hoverIndex - 1);
      }
    }
    if (input === "d") {
      onDelete(keys[hoverIndex].key);
    }
    if (key.return) {
      onSelect();
    }
  });

  return (
    <Box paddingLeft={1} paddingRight={1} flexDirection="column">
      <Box>
        <Box width="30%">
          <Text>Key</Text>
        </Box>
        <Box width="50%" marginLeft={1} marginRight={1}>
          <Text>Value</Text>
        </Box>
        <Box width="20%">
          <Text>Version</Text>
        </Box>
      </Box>
      <Box flexDirection="column">
        {keys.map((key, i) => {
          return (
            <Box key={key.key.join("")} flexDirection="row">
              <Box width="30%">
                <Text
                  wrap="truncate"
                  inverse={i === hoverIndex}
                  color="cyanBright"
                >
                  {JSON.stringify(key.key)}
                </Text>
              </Box>
              <Box width="50%" marginLeft={1} marginRight={1}>
                <Text
                  wrap="truncate"
                  inverse={i === hoverIndex}
                  color="cyanBright"
                >
                  {JSON.stringify(key.value)}
                </Text>
              </Box>
              <Box width="20%">
                <Text
                  wrap="truncate"
                  inverse={i === hoverIndex}
                  color="cyanBright"
                >
                  {key.versionstamp}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export { ListView };
ListView.Navigation = ListNavigation;
