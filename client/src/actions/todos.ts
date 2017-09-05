import { createAction } from 'redux-actions';
import * as Actions from '../constants/actions';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers/';
import { Dispatch } from 'redux';
import axios, { AxiosRequestConfig } from 'axios';


const _changeDuration = createAction<models.GenericPayload>(Actions.CHANGE_DURATION);
const _changeInterest = createAction<models.GenericPayload>(Actions.CHANGE_INTEREST);
const _changeTotalLoan = createAction<models.GenericPayload>(Actions.CHANGE_TOTALLOAN);

const actionCreator = (payload: number, type: string) => {
  return (dispatch: Dispatch<RootState>, getState: () => RootState): ThunkAction<void, RootState, void> => {
    
    let action;

    let state = getState().MortageParameters;

    switch(type) {
      case Actions.CHANGE_DURATION: {
        action = _changeDuration;
        state.NumberOfMonths = payload * 12;
        break;
      }
      case Actions.CHANGE_INTEREST: {
        action = _changeInterest;
        state.Interest = payload;
        break;
      }
      case Actions.CHANGE_TOTALLOAN: {
        action = _changeTotalLoan;
        state.TotalLoan = payload;
        break;
      }
    }

    let genericPayload: models.GenericPayload = { paramUpdate: payload, dataPoints: [] };

    if (state.Interest && state.TotalLoan && state.NumberOfMonths) {
      axios.get('/api/mortage', {
        method: 'GET',
        params: state
      })
      .then(response => {
        genericPayload.dataPoints = response.data.data as models.MortageDataPoint[];
        dispatch(action(genericPayload));
      })
    }
    else {
      dispatch(action(genericPayload));
    }



      return;
  }
}

export const changeDuration = (payload: number) => actionCreator(payload, Actions.CHANGE_DURATION);
export const changeInterest = (payload: number) => actionCreator(payload, Actions.CHANGE_INTEREST);
export const changeTotalLoan = (payload: number) => actionCreator(payload, Actions.CHANGE_TOTALLOAN);
