/**
 * Created by laughing-zhu on 3/10/16.
 */
let Control = require('./Control');
let Source = require('./Source');
require('./video.styl');

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    startPlay() {
        let source = this.refs.source;
        if (source) {
            source.startPlay();
        }
    }

    pausePlay() {
        let source = this.refs.source;
        if (source) {
            source.pausePlay();
        }
    }

    setDisPlay_(flag){
        let control = this.refs.control;
        if (control) {
            control._setDisPlay_(flag);
        }
    }

    setVideoCurrentSource(time){
        let source = this.refs.source;
        if (source) {
            source.setVideoCurrentSource(time);
        }
    }

    changLoadState(load){
        let control = this.refs.control;
        if (control) {
            control.changLoadState(load);
        }
    }

    setVideoDurationTime(time) {
        let control = this.refs.control;
        if (control) {
            control.setVideoDurationTime(time);
        }
    }

    syncTimeToControl(time) {
        let control = this.refs.control;
        if (control) {
            control.syncTimeToControl(time);
        }
    }

    fullScreen() {
        let source = this.refs.source;
        if (source) {
            source.fullScreen();
        }
    }

    changePlayState(width) {
        let control = this.refs.control;
        if (control) {
            control.changePlayState(width);
        }
    }

    runTimeCallback(){
        let control = this.refs.control;
        if (control) {
            control.runTimeCallback();
        }
    }

    render() {
        let sourceConfig = {
            ref: 'source',
            mediaLink: this.props.mediaData.mediaLink,
            coverImage: this.props.mediaData.coverImage,
            autoPlay: this.props.autoPlay || false,
            setVideoDurationTime: this.setVideoDurationTime.bind(this),
            syncTimeToControl: this.syncTimeToControl.bind(this),
            changLoadState:this.changLoadState.bind(this),
            runTimeCallback:this.runTimeCallback.bind(this),
            setDisPlay_:this.setDisPlay_.bind(this)
        };

        let controlConfig = {
            ref: 'control',
            startPlay: this.startPlay.bind(this),
            pausePlay: this.pausePlay.bind(this),
            fullScreen: this.fullScreen.bind(this),
            setVideoCurrentSource:this.setVideoCurrentSource.bind(this)
        };

        return (
            <div className="vedio player">
                <Source {...sourceConfig}/>
                <Control {...controlConfig}/>
            </div>
        )
    }
}


module.exports = Video;
