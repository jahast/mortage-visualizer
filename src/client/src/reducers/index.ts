import { combineReducers, Reducer } from 'redux';
import MortageParameters from './mortageParameters';
import MortageDataPoints from './mortageDataPoints'

export interface RootState {
  MortageParameters: models.MortageParameters;
  MortageDataPoints: models.LoanChartParameterStoreState;
}

export default combineReducers<RootState>({
  MortageParameters,
  MortageDataPoints
});

