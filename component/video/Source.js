/**
 * Created by laughing-zhu on 3/10/16.
 */
import classNames from 'classnames';
import reactMixin from 'react-mixin';
import Reflux from 'reflux';
import Store from './store';
class Source extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            show:true
        }
    }

    componentDidMount() {
        this.listenTo(Store, this.handleData);
        var video = $(this.refs.video.getDOMNode());
        video.on('loadedmetadata', ()=> {
            let setVideoDurationTime = this.props.setVideoDurationTime;
            if (setVideoDurationTime) {
                setVideoDurationTime(video[0].duration.toFixed(0));
            }
        });

        video.on('timeupdate', ()=> {
            let changLoadState = this.props.changLoadState;
            let runTimeCallback = this.props.runTimeCallback;
            let syncTimeToControl = this.props.syncTimeToControl;
            if (changLoadState) {
                changLoadState(false);
            }

            if (syncTimeToControl) {
                syncTimeToControl(video[0].currentTime.toFixed(0));
            }

            if (runTimeCallback) {
                runTimeCallback(video[0].currentTime.toFixed(0));
            }

        });

        video.on('ended', ()=> {
            let setDisPlay_ = this.props.setDisPlay_;
            setDisPlay_(true);
        });

        video.on('play', ()=> {
            console.log('play')
            let setDisPlay_ = this.props.setDisPlay_;
            setDisPlay_(false);
        });

        video.on('pause', ()=> {
            console.log('pause')
            let setDisPlay_ = this.props.setDisPlay_;
            setDisPlay_(true);
        });

    }

    handleData(data){
        this.setState(data);
    }

    startPlay() {
        this.refs.video.getDOMNode().play();
    }

    pausePlay() {
        this.refs.video.getDOMNode().pause();
    }

    setVideoCurrentSource(time) {
        this.refs.video.getDOMNode().currentTime = time;
    }

    noneShow(){
        this.setState({show:false})
    }

    setShow(){
        this.setState({show:true})
    }

    fullScreen() {
        let video = this.refs.video.getDOMNode();
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullScreen) {
            video.webkitRequestFullScreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        } else{
            this.startPlay();
            let setDisPlay_ = this.props.setDisPlay_;
            setDisPlay_(true);
        }
    }

    render() {
        let mediaLink=this.props.mediaLink;
        let coverImage = this.props.coverImage;
        let autoPlay = this.props.autoPlay;
        let show=this.state.show;
        let classnames=classNames({
            'video-source':true,
            'video-source-none':!show,
        })
        return (
            <div className="resource">
                <video ref="video" autoplay={autoPlay} className={classnames} src={mediaLink}
                       poster={coverImage}></video>
            </div>
        )
    }
}

reactMixin.onClass(Source, Reflux.ListenerMixin);
module.exports = Source;