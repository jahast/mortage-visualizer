import * as React from 'react';
import * as TodoActions from '../../actions/todos';
import * as style from './style.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../reducers';
import * as bluebird from '@blueprintjs/core';
import { LoanBarChart } from '../../components/LoanBarChart'
import { Input } from '../../components/Input';
import ChartPlaceHolder from '../../components/ChartPlaceHolder'

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    mortageParameters: models.MortageParameters;
    mortageDataPoints: models.MortageDataPoint[];
    actions: typeof TodoActions;
  }

  export interface State {
  }

}

export interface Conxtext {
  actionWrapper: any
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {

  static childContextTypes = {
    actionWrapper: React.PropTypes.any
  }

  render() {
    const { mortageParameters, mortageDataPoints, actions, children } = this.props;

    let totalLoan = mortageDataPoints.reduce((prev: number, curr: models.MortageDataPoint) => prev + curr.LoanDeduction, 0);
    let totalInterest = mortageDataPoints.reduce((prev: number, curr: models.MortageDataPoint) => prev + curr.Interest, 0);
    let totalToPay = totalLoan + totalInterest;

    let chart = mortageDataPoints.length !== 0
      ? <LoanBarChart datapoints={mortageDataPoints}/>
      : <ChartPlaceHolder />;

    return (
      <div>
        <div className={style.normal}>
          <div className='pt-input-group'>
            <label className='pt-label'>
              Total loan
              <Input onChanged={actions.changeTotalLoan}
                cssClass='pt-input'
                text={mortageParameters.TotalLoan ? mortageParameters.TotalLoan.toString() : ''}/>
            </label>
          </div>
          <div className='pt-input-group'>
            <label className='pt-label'>
              Interest%
              <Input onChanged={actions.changeInterest}
                cssClass='pt-input'
                text={mortageParameters.Interest ? mortageParameters.Interest.toString() : ''}/>
            </label>
            </div>
          <div className='pt-input-group'>
            <label className='pt-label'>
              Duration in years
              <Input onChanged={actions.changeDuration}
                cssClass='pt-input'
                text={mortageParameters.NumberOfMonths ? (mortageParameters.NumberOfMonths / 12).toString() : ''}/>
            </label>
          </div>
        </div>
        <div className='fullHeight'>
          {chart}
        </div>
        <div className="pt-callout default">
          <h5>{totalToPay.toString()}</h5>
          Total loan amount
        </div>
        <div className="pt-callout pt-intent-warning">
          <h5>{totalInterest.toString()}</h5>
          Total interest amount
        </div>
      </div>
    );
  }
}


function mapStateToProps(state: RootState) {
  return {
    mortageParameters: state.MortageParameters,
    mortageDataPoints: state.MortageDataPoints
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions as any, dispatch)
  };
}
