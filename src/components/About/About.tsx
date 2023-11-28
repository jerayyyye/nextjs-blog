import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import { useSession } from "next-auth/react";
import SalaryForm from "@/components/SalaryForm";
import AnalyticsComp from "@/pages/dashboard/analyticscomp";
import Cookies from "js-cookie";

const About = () => {
  const { data: session } = useSession();
  const [isSalaryFormSubmitted, setIsSalaryFormSubmitted] = useState(false);

  useEffect(() => {
    const hasSubmittedForm = Cookies.get("hasSubmittedForm") === "true";
    setIsSalaryFormSubmitted(hasSubmittedForm);
  }, []);

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={4}>
        <Typography variant="h2">Compare pay practices instantly.</Typography>
        <Typography variant="body1">
          Boost pay fairness within the government. Compare your tech pay
          practices with similar WOG workforces for insights and improvement
          within minutes.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box mt={2} p={3} border="1px solid #ccc" borderRadius={8}>
            <Typography variant="h5">How it Works</Typography>
            <ul>
              <li>
                Log in through your work email for authentication.{" "}
                {session && (
                  <CheckIcon
                    fontSize="small"
                    style={{ color: "green", verticalAlign: "middle" }}
                  />
                )}
              </li>
              <li>
                Submit your agency's pay practices for your tech workforce.{" "}
                {session && isSalaryFormSubmitted ? (
                  <CheckIcon
                    fontSize="small"
                    style={{ color: "green", verticalAlign: "middle" }}
                  />
                ) : (
                  session && <SalaryForm />
                )}
              </li>
              <li>
                View our dashboard to see where your agency's practices stand.{" "}
                {isSalaryFormSubmitted && session && <AnalyticsComp />}
              </li>
            </ul>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
