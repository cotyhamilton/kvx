import { Box, Text } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";

export const Navigation = ({ url }: { url: string }) => {
  return (
    <Box paddingLeft={1} paddingRight={1}>
      <Box width="50%">
        <Text color="yellow" bold>URL: {url}</Text>
      </Box>
      <Box flexDirection="column" width="50%">
        <Box>
          <Text bold color="blue">{`<d> `}</Text>
          <Text dimColor>Delete</Text>
        </Box>
      </Box>
    </Box>
  );
};

export const Header = ({ url }: { url: string }) => {
  return (
    <Box width="100%">
      <Navigation url={url} />
      <Box width="30" marginBottom={-1} paddingTop={0}>
        {/*@ts-ignore comment*/}
        <Gradient name="mind">
          {/*@ts-ignore comment*/}
          <BigText text="KVX" />
          {/* <Text>KVX</Text> */}
        </Gradient>
      </Box>
    </Box>
  );
};
