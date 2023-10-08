import { Button, Flex, Grid, useToast } from "@chakra-ui/react";
import "./App.css";
import Form from "./components/Form";
import Output from "./components/Output";
import ArrowIcon from "./assets/images/icon-arrow.svg";
import { useEffect, useState } from "react";
import { FormData, FormErrors } from "./types";

function isValidDate(year: number, month: number, day: number) {
  const d = new Date(year, month, day);
  if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
    return true;
  }
  return false;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    day: "",
    month: "",
    year: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [output, setOutput] = useState<FormData>({
    day: "",
    month: "",
    year: "",
  });
  const toast = useToast();

  const validateForm = () => {
    const formObjKeys = Object.keys(formData) as (keyof FormData)[];
    setFormErrors((prev) => ({ ...prev, invalidDate: "" }));
    formObjKeys.forEach((key) => {
      if (!formData[key]) {
        setFormErrors((prev) => ({ ...prev, [key]: key + " is required" }));
      } else {
        setFormErrors((prev) => ({ ...prev, [key]: "" }));
        if (key === "day") {
          if (Number(formData[key]) > 31) {
            setFormErrors((prev) => ({ ...prev, [key]: "Invalid day" }));
          } else if (Number(formData[key]) < 1) {
            setFormErrors((prev) => ({ ...prev, [key]: "Invalid day" }));
          } else {
            setFormErrors((prev) => ({ ...prev, [key]: "" }));
          }
        }

        if (key === "month") {
          if (Number(formData[key]) > 12) {
            setFormErrors((prev) => ({ ...prev, [key]: "Invalid month" }));
          } else if (Number(formData[key]) < 1) {
            setFormErrors((prev) => ({ ...prev, [key]: "Invalid month" }));
          } else {
            setFormErrors((prev) => ({ ...prev, [key]: "" }));
          }
        }

        if (key === "year") {
          if (formData[key].length < 4) {
            setFormErrors((prev) => ({ ...prev, [key]: "Invalid date" }));
          } else {
            setFormErrors((prev) => ({ ...prev, [key]: "" }));
          }
        }
      }
    });
  };

  const calcAge = () => {
    if (
      Object.values(formErrors).every((error) => !Boolean(error)) &&
      Object.values(formData).every((value) => Boolean(value))
    ) {
      if (
        !isValidDate(
          Number(formData.year),
          Number(formData.month) - 1,
          Number(formData.day)
        )
      ) {
        setFormErrors((prev) => ({ ...prev, invalidDate: "Invalid date" }));
        setOutput({ day: "", month: "", year: "" });
        return;
      }
      setFormErrors((prev) => ({ ...prev, invalidDate: "" }));
      const date = new Date(
        Number(formData.year),
        Number(formData.month) - 1,
        Number(formData.day)
      );
      if (date < new Date()) {
        const currentDate = new Date();
        const birthDateObj = date;
        const yearDiff = currentDate.getFullYear() - birthDateObj.getFullYear();

        let monthDiff = currentDate.getMonth() - birthDateObj.getMonth();
        if (currentDate.getDate() < birthDateObj.getDate()) {
          monthDiff--;
        }

        let dayDiff = currentDate.getDate() - birthDateObj.getDate();

        if (monthDiff < 0) {
          monthDiff += 12;
        }

        if (dayDiff < 0) {
          dayDiff += 30;
        }

        setOutput({
          day: dayDiff.toString(),
          month: monthDiff.toString(),
          year: yearDiff.toString(),
        });
      } else {
        setFormErrors((prev) => ({
          ...prev,
          invalidDate: "Future date is not allowed",
        }));
        setOutput({ day: "", month: "", year: "" });
      }
    } else {
      setOutput({ day: "", month: "", year: "" });
      setFormErrors((prev) => ({ ...prev, invalidDate: "" }));
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  useEffect(() => {
    if (formErrors?.invalidDate) {
      toast({
        title: formErrors?.invalidDate,
        description: "Please enter a valid date",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [formErrors]);

  return (
    <Flex alignItems='center' justifyContent='center' h='100vh' bg='#F0F0F0'>
      <Grid
        width={650}
        sx={{
          p: 50,
          borderRadius: "20px 20px 150px 20px",
          "@media (max-width: 600px)": {
            p: 20,
            w: 450,
          },
          "@media (max-width: 450px)": {
            p: 10,
            w: 350,
          },
          "@media (max-width: 375px)": {
            p: 5,
            w: 250,
          },
        }}
        bg='white'
        justifyContent='center'
      >
        <Form
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
        />
        <Flex
          flexDirection='row'
          display='flex'
          alignItems='center'
          position='relative'
          py={"40px"}
          sx={{
            "@media (max-width: 600px)": {
              py: "50px",
            },
            "@media (max-width: 450px)": {
              py: "40px",
            },
            "@media (max-width: 375px)": {
              py: 5,
            },
          }}
        >
          <hr
            style={{
              width: "100%",
              position: "absolute",
            }}
          />
          <Button
            width={"75px"}
            height={"75px"}
            bg='hsl(259, 100%, 65%)'
            aria-label='Arrow Icon'
            position='absolute'
            right={0}
            sx={{
              "@media (max-width: 600px)": {
                right: "50%",
                translate: "50% 0%",
                w: "50px",
                h: "50px",
                borderRadius: "50px",
              },
              "@media (max-width: 450px)": {
                right: "50%",
                translate: "50% 0%",
                w: "40px",
                h: "40px",
                borderRadius: "40px",
              },
            }}
            _hover={{
              bg: " hsl(0, 0%, 8%)",
            }}
            _disabled={{
              bg: "hsl(259, 100%, 65%)",
              cursor: "not-allowed",
            }}
            borderRadius={"75px"}
            onClick={calcAge}
            isDisabled={Object.values(formErrors).some((error) =>
              Boolean(error)
            )}
          >
            <img src={ArrowIcon} alt='arrow' height='100%' />
          </Button>
        </Flex>
        <Output formData={output} />
      </Grid>
    </Flex>
  );
}

export default App;
