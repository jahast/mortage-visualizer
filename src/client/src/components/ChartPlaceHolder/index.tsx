import * as React from 'react';

export namespace ChartPlaceHolder {
  export interface Props {
  }

  export interface State {
  }
}

export default class ChartPlaceHolder extends React.Component<ChartPlaceHolder.Props, ChartPlaceHolder.State>{

  constructor(props?: ChartPlaceHolder.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className="pt-non-ideal-state">
        <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
          <span className="pt-icon pt-icon-timeline-bar-chart"></span>
        </div>
        <h4 className="pt-non-ideal-state-title">Chart not drawn</h4>
        <div className="pt-non-ideal-state-description">
          Input all the fields.
        </div>
      </div>
    );
  }
}
