import React from 'react';

class UserGist  extends React.Component {
    constructor() {
        super();
        this.state ={
            username: '',
            lastGistUrl: ''
        }
    }

    componentWillMount(){
        $.get(this.props.source,function(result){
            var lastGist = result[0];
            this.setState({
                username: lastGist.owner.login,
                lastGistUrl: lastGist.html_url
            })
        }.bind(this));
    }

    render() {
        return (
            <div>
                {this.state.username} ..
                <a href={this.state.lastGistUrl}> here </a>
            </div>
        )
    }
}

module.exports = UserGist ;
//export default ReapeatArr;