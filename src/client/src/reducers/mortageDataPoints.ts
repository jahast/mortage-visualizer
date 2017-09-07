import { Reducer } from 'redux';
import { handleActions } from 'redux-actions';
import * as Actions from '../constants/actions';

const initialState: models.LoanChartParameterStoreState = [];

let mortageActions = handleActions<models.LoanChartParameterStoreState, models.GenericPayload>({

  [Actions.CHANGE_DURATION]: (state, action) => {
    return action.payload.dataPoints;
  },

  [Actions.CHANGE_INTEREST]: (state, action) => {
    return  action.payload.dataPoints;
  },

  [Actions.CHANGE_TOTALLOAN]: (state, action) => {
    return action.payload.dataPoints;
  }

}, initialState);

export default mortageActions;
