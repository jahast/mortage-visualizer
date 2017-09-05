import * as React from 'react';

export namespace Input {
  export interface Props {
    text?: string;
    placeholder?: string;
    onChanged: (value: number) => any;
    cssClass?: string;
  }

  export interface State {
  }
}

export class Input extends React.Component<Input.Props, Input.State>{

  constructor(props?: Input.Props, context?: any) {
    super(props, context);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(e) {
    const text: string = e.target.value.trim();
    const value = Number(text);
    
    this.props.onChanged(value);
  }

  render() {
    const { text, placeholder, onChanged, cssClass} = this.props;

    const classname = cssClass || 'pt-input default';

    return (
      <input type="text"
        className={classname}
        placeholder={placeholder}
        value={text}
        onChange={this.handleOnChange}/>
    );

  }
}
