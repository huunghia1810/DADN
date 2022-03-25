import ReactApexChart from "react-apexcharts";
import {Button, Typography} from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";

function LineChart() {
  const { Title, Paragraph } = Typography;

  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Gas sensor data</Title>
          <Paragraph className="lastweek">
            {/*than last week <span className="bnb2">+30%</span>*/}
            <strong>2.345</strong> (present gas data)
          </Paragraph>
        </div>
        <div className="sales">
          {/*<ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>*/}
          <Button type="primary">
            <span>View Report</span>
          </Button>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
