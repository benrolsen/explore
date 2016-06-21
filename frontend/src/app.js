import React from 'react';


export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false
        };
        this.socket = new WebSocket("ws://" + window.location.host + ":8000/buttons/");
        this.socket.onopen = (event) => {
            console.log(event);
            this.setState({connected: true})
        }
    }

    componentDidMount() {
        // this.socket = new WebSocket("ws://explore.localhost:8000/tugrope/");
    }

    render() {
        let children_with_props = <div></div>;
        if (this.state.connected)
            children_with_props = React.cloneElement(this.props.children, {socket: this.socket})
        return (
            <div>
                {children_with_props}
            </div>

        )
    }
}

