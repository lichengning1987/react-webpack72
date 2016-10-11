import React from 'react';
import './styles.css';
import Loading from './loading.jsx'

class LoadingShow  extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            Loading:false,
        }
        this.handle = this.handle.bind(this);
    }

    handle(e){
        this.setState({Loading:true});
        let time  =  setTimeout(()=>{
                       console.log(11222333444);
                       this.setState({Loading:false});
                     },3000);
    }

    render() {
        return (
            <div>
                <button onClick={this.handle} style={{color:'red',background:'blue'}}>弹出loading</button>
                <Loading Loading={this.state.Loading}/>
            </div>
        )
    }
}


LoadingShow.defaultProps = {
    loading: true,
    showText: false,
};

LoadingShow.propTypes = {
    loading: React.PropTypes.bool,
    showText: React.PropTypes.bool,
};


module.exports = LoadingShow ;
//export default ReapeatArr;