import { Box, Text } from "ink";

export const ListView = (
  { keys, hoverIndex }: { keys: Deno.KvEntry<unknown>[]; hoverIndex: number },
) => {
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
