import React from 'react';

class NameInput extends React.Component {
    
    onInputChange(event) {
        this.props.onChange(this.props.number, event.target.value)
    };

    render() {
        return(
            <div>
                <form onSubmit = {(event) => event.preventDefault()} >
                    <div>
                        <label>{this.props.text}</label>
                        <input 
                            type="text" 
                            value = {this.props.text}
                            onChange = {(event) => this.onInputChange(event)}
                        />
                    </div>
                </form>
            </div>
            
        )
    }

}

export default NameInput;