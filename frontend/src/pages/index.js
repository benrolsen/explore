import React from 'react';


export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barID: 1,
            percent: 0
        };
        this.buttonLeft = this.buttonLeft.bind(this);
        this.buttonRight = this.buttonRight.bind(this);
    }

    componentDidMount() {
        this.props.socket.send(JSON.stringify({model: "TugRope", command: "subscribe"}));
        this.props.socket.send(JSON.stringify({model: "TugRope", command: "detail", id: this.state.barID}));
        this.props.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            this.setState({percent: data.position})
        };
    }
    
    buttonLeft(e) {
        e.preventDefault();
        this.props.socket.send(JSON.stringify({model: "TugRope", command: "left", id: this.state.barID}));
    }

    buttonRight(e) {
        e.preventDefault();
        this.props.socket.send(JSON.stringify({model: "TugRope", command: "right", id: this.state.barID}));
    }

    render() {
        let barStyle = {width: this.state.percent + "%"};
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div>An example with WebSockets connected to Django Channels.</div>
                        <div className="text-right">Dropdown</div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2">
                            <button className="btn btn-default" type="button" onClick={this.buttonLeft}>Left</button>
                        </div>
                        <div className="col-sm-8">
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={barStyle}>
                                    {this.state.percent}%
                              </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-default" type="button" onClick={this.buttonRight}>Right</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
