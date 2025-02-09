import { Box, Text } from "ink";
import BigText from "ink-big-text";
import Gradient from "ink-gradient";

type HeaderProps = {
  url: string;
  navigation: React.ReactNode;
};

export const Header = ({ url, navigation }: HeaderProps) => {
  return (
    <Box width="100%">
      <Box paddingLeft={1} paddingRight={1}>
        <Box width="50%" paddingRight={1}>
          <Text color="yellow" bold>
            URL:{`\t`}
            <Text wrap="truncate" color="white" bold={false}>{url}</Text>
          </Text>
        </Box>
        <Box width="50%" paddingLeft={1}>
          {navigation}
        </Box>
      </Box>
      <Box width="30" marginBottom={-1} paddingTop={0}>
        {/*@ts-ignore comment*/}
        <Gradient name="mind">
          {/*@ts-ignore comment*/}
          <BigText text="KVX" />
        </Gradient>
      </Box>
    </Box>
  );
};
