import * as React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export namespace LoanBarChart {
  export interface Props {
    datapoints: models.MortageDataPoint[];
  }

  export interface State {
  }
}

export class LoanBarChart extends React.Component<LoanBarChart.Props, LoanBarChart.State>{

  constructor(props?: LoanBarChart.Props, context?: any) {
    super(props, context);
  }

  render() {

    const { datapoints } = this.props;

    return (
      //<ResponsiveContainer width="100%" height="80%">
        <BarChart width={1200} height={300} data={datapoints}>
          <XAxis dataKey="MonthIndex"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="LoanDeduction" stackId="a" fill="#2abf4f" />
          <Bar dataKey="Interest" stackId="a" fill="#f4424e" />
        </BarChart>
      //</ResponsiveContainer>
    );
  }


}
