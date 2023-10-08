import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FormData, FormErrors } from "../types";

type FormProps = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  formErrors: FormErrors;
};

const Form = (props: FormProps) => {
  const { formData, setFormData, formErrors } = props;
  return (
    <Flex
      direction='row'
      gap={7}
      mr={120}
      sx={{
        "@media (max-width: 600px)": {
          mr: 0,
        },
      }}
    >
      {Object.keys(formData).map((key) => {
        return (
          <Grid gap={2} key={key}>
            <FormControl isInvalid={Boolean(formErrors?.[key])}>
              <FormLabel fontSize={12} color='hsl(0, 1%, 44%)'>
                {key.toUpperCase()}
              </FormLabel>
              <Input
                type='number'
                value={formData[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                placeholder='DD'
                min={1}
                max={31}
                sx={{
                  width: "125px",
                  height: "50px",
                  fontSize: 32,
                  p: "30px 20px",
                  _focus: {
                    outline: "none",
                    boxShadow: "none",
                    border: "1px solid hsl(259, 100%, 65%)",
                  },
                  "@media (max-width: 600px)": {
                    width: "100px",
                    p: "20px 10px",
                    fontSize: 24,
                  },
                  "@media (max-width: 450px)": {
                    width: "80px",
                    p: "10px 5px",
                    fontSize: 18,
                  },
                  "@media (max-width: 375px)": {
                    width: "60px",
                    p: "5px 3px",
                    fontSize: 14,
                  },
                }}
              />
              <FormErrorMessage
                fontSize={10}
                fontStyle='italic'
                fontWeight={400}
              >
                {formErrors?.[key]}
              </FormErrorMessage>
            </FormControl>
          </Grid>
        );
      })}
      {/* <Grid gap={2}>
        <Text fontSize={12} color='hsl(0, 1%, 44%)'>
          MONTH
        </Text>
        <Input
          type='number'
          value={formData.month}
          onChange={(e) => setFormData({ ...formData, month: e.target.value })}
          placeholder='MM'
          min={1}
          max={12}
          sx={{
            width: "125px",
            height: "50px",
            fontSize: 32,
            p: "30px 20px",
            _focus: {
              outline: "none",
              boxShadow: "none",
              border: "1px solid hsl(259, 100%, 65%)",
            },
          }}
        />
        <FormErrorMessage fontSize={12} mt={0}>
          {formErrors?.month}
        </FormErrorMessage>
      </Grid>
      <Grid gap={2}>
        <Text fontSize={12} color='hsl(0, 1%, 44%)'>
          YEAR
        </Text>
        <Input
          type='number'
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
          placeholder='YYYY'
          sx={{
            width: "125px",
            height: "50px",
            fontSize: 32,
            p: "30px 20px",
            _focus: {
              outline: "none",
              boxShadow: "none",
              border: "1px solid hsl(259, 100%, 65%)",
            },
          }}
        />
        <FormErrorMessage fontSize={12} mt={0}>
          {formErrors?.year}
        </FormErrorMessage>
      </Grid> */}
    </Flex>
  );
};

export default Form;
