import { Box, Text, useInput } from "ink";

export const DetailNavigation = () => {
  return (
    <Box flexDirection="column">
    </Box>
  );
};

type DetailViewProps = {
  data: Deno.KvEntry<unknown>;
  onBack: () => void;
};

const DetailView = ({ data, onBack }: DetailViewProps) => {
  useInput((_input, key) => {
    if (key.escape) {
      onBack();
    }
  });
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
      <Box flexDirection="column" flexGrow={1} paddingLeft={1} paddingRight={1}>
        <Text>{data.key.toString()}</Text>
        <Text>{data.versionstamp.toString()}</Text>
        <Text>{JSON.stringify(data.value, null, 2)}</Text>
      </Box>
    </Box>
  );
};

export { DetailView };
DetailView.Navigation = DetailNavigation;
