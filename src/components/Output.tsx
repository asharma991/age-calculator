import { Flex, Text } from "@chakra-ui/react";
import { FormData } from "../types";

type OutputProps = {
  formData: FormData;
};

const Output = (props: OutputProps) => {
  const { formData } = props;

  return (
    <Flex direction='column'>
      {Object.keys(formData)
        .sort((a, b) => a.localeCompare(b) * -1)
        .map((key) => {
          return (
            <Text
              fontSize={80}
              fontWeight={800}
              fontStyle='italic'
              lineHeight={1.1}
              key={key}
              sx={{
                "@media (max-width: 600px)": {
                  fontSize: "50px",
                },
                "@media (max-width: 450px)": {
                  fontSize: "35px",
                },
                "@media (max-width: 350px)": {
                  fontSize: "25px",
                },
              }}
            >
              <span style={{ color: "hsl(259, 100%, 65%)" }}>
                {formData[key as keyof FormData] || "--"}
              </span>{" "}
              {key}s
            </Text>
          );
        })}
    </Flex>
  );
};

export default Output;
