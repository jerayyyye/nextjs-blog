import React, { useEffect, useState } from "react";
import scss from "./AnalyticsComp.module.scss";
import { Card, Grid, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/system";
import DataChart from "@/pages/dashboard/DataChart";
import supabase from "@/config/supabaseClient";

interface GroupedData {
  [key: string]: {
    agency: string;
    subgrade: string;
    totalAnnualComp: number;
    count: number;
  };
}

const AnalyticsComp = () => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<
    {
      agency: string;
      subgrade: string;
      totalAnnualComp: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("paychecked")
          .select(
            "agency, subgrade, monthlySalary, annualFixedBonus, annualVarBonus"
          );

        if (error) {
          throw error;
        }

        if (data) {
          const groupedData = data.reduce((result: GroupedData, item) => {
            const agencyKey = item.agency;
            const subgradeKey = item.subgrade;
            const key = `${agencyKey}-${subgradeKey}`;

            if (!result[key]) {
              result[key] = {
                agency: agencyKey,
                subgrade: subgradeKey,
                totalAnnualComp: 0,
                count: 0,
              };
            }

            result[key].totalAnnualComp +=
              item.monthlySalary * 12 +
              item.annualFixedBonus +
              item.annualVarBonus;
            result[key].count += 1;

            return result;
          }, {});

          const processedData = Object.values(groupedData);
          setChartData(processedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const uniqueAgenciesCount =
    chartData.length > 0
      ? new Set(chartData.map((item) => item.agency)).size
      : 0;

  return (
    <Grid container gap={2} className={scss.wrapper}>
      <Paper className={scss.salarychart}>
        <div className={scss.chart}>
          <Typography fontSize={"h6"} color={"lightslategrey"}>
            Pay practices across gov
          </Typography>
          <DataChart type={"line"} data={chartData} />
        </div>
        <div className={scss.cardWrapper}>
          <Card className={scss.card} variant={"outlined"}>
            <div className={scss.cardTitle}>
              <Typography>No. of participating agencies to date</Typography>
            </div>
            <div className={scss.cardValue}>
              <Typography color={theme.palette.success.main} fontSize={14}>
                {uniqueAgenciesCount}
              </Typography>
            </div>
          </Card>
        </div>
      </Paper>
    </Grid>
  );
};

export default AnalyticsComp;
