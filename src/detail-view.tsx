import { Box, Text } from "ink";

export const DetailView = ({ data }: { data: Deno.KvEntry<unknown> }) => {
  return (
    <Box paddingLeft={1} paddingRight={1}>
      <Box width="10" flexDirection="column">
        <Text color="yellow" bold>Key:</Text>
        <Text color="yellow" bold>
          Versionstamp:
        </Text>
        <Text color="yellow" bold>
          Value:
        </Text>
      </Box>
      <Box flexDirection="column">
        <Text>{data.key.toString()}</Text>
        <Text>{data.versionstamp.toString()}</Text>
        <Text wrap="truncate">{JSON.stringify(data.value, null, 2)}</Text>
      </Box>
    </Box>
  );
};
