declare namespace models {
  interface MortageParameters {
    NumberOfMonths?: number,
    TotalLoan?: number,
    Interest?: number
  }

  interface MortageDataPoint {
    MonthIndex: number,
    LoanDeduction: number,
    Interest: number
  }

  interface GenericPayload {
    paramUpdate: number,
    dataPoints: LoanChartParameterStoreState
  }

  type MortageParametersStoreState = MortageParameters;
  type LoanChartParameterStoreState = MortageDataPoint[];
}
