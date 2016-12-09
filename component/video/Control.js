/**
 * Created by laughing-zhu on 3/10/16.
 */
let Loading = require('./../Loading');
let Pause = require('../../svg/pause.svg');
let VideoPlay = require('../../svg/videoPlay.svg');
let SolidCircle = require('../../svg/solidcircle.svg');
let Expand = require('../../svg/expand.svg');
let reactMixin = require('react-mixin');
let plugin = require('./plugin');

const CONTROLHEIGHT = 50;

let startX = 0;  //记录touch初始位置
let initPlayWidth = 0; //记录滚动条宽度
let playState = null; //滑动前,记录播放状态,滑动时播放暂停,滑动后还原播放状态.

class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            playing: false,
            displayPause: true,
            ifFirst: true,
            durationTime: 0,
            currentTime: 0,
            playedWidth: 0
        };
    }

    componentDidMount() {
        this.customProps = {};
        this.customProps.trackbarWidth = $('.trackbar').width();
    }

    setVideoDurationTime(time) {
        this.setState({durationTime: time});
    }

    leftTouch(e) {
        this._preventDefault(e);
    }

    touchStartScroll(e) {
        //this._preventDefault(e);
        let touch = e.touches[0];
        startX = touch.pageX; //刚触摸时的坐标
        initPlayWidth = this.state.playedWidth;
    }

    _movePausePlayEvent() {
        let displayPause = this.state.displayPause;
        if (!displayPause) {
            playState = 'play';
            this._pausePlay();
        }
    }

    _moveEvent(total) {
        let trackbarWidth = this.customProps.trackbarWidth;
        if (total < 0) {
            total = 0;
        } else if (total > trackbarWidth) {
            total = trackbarWidth;
        }
        let nowTime = this.state.durationTime;
        let currentTime = Math.floor(total / trackbarWidth * nowTime) || 0;
        this._movePausePlayEvent();
        this._showControls();
        this.setState({
            playedWidth: total,
            currentTime: currentTime
        });
        this._syncToSource(currentTime);
    }

    touchMoveScroll(e) {
        e.preventDefault();
        e.stopPropagation();
        var touch = e.touches[0];
        let distance = touch.pageX - startX;
        let total = initPlayWidth + distance;
        this._moveEvent(total);
    }

    touchEndScroll(e) {
        startX = 0;
        if ('play' === playState) {
            playState = null;
            this._startPlay();
        }
    }

    syncTimeToControl(currentTime) {
        this._setCurrentTime(currentTime);
        this._TimeTosliderBar(currentTime);
    }

    //处理点击进度条直接改变进度
    _changeTimeClick(e) {
        this._preventDefault(e);
        let playedWidth = e.pageX - 66;
        this._setPlayWidth(playedWidth);
    }

    _setPlayWidth(playedWidth) {
        let trackbarWidth = this.customProps.trackbarWidth;
        let durationTime = this.state.durationTime;
        let currentTime = playedWidth / trackbarWidth * durationTime;
        this._setSliderBarWidth(playedWidth);
        this._sliderBarToTime(currentTime);
        this._syncToSource(currentTime);
    }

    _setSliderBarWidth(playedWidth) {
        this.setState({
            playedWidth: playedWidth
        });
    }

    /*
     改变currentTime显示
     */
    _sliderBarToTime(currentTime) {
        this.setState({currentTime: currentTime});
    }

    _TimeTosliderBar(currentTime) {
        let durationTime = this.state.durationTime;
        let trackbarWidth = this.customProps.trackbarWidth;
        let playedWidth = currentTime / durationTime * trackbarWidth;
        this.setState({playedWidth: playedWidth});
    }

    _syncToSource(currentTime) {
        let setVideoCurrentSource = this.props.setVideoCurrentSource;
        if (setVideoCurrentSource) {
            setVideoCurrentSource(currentTime);
        }
    }

    _setCurrentTime(currentTime) {
        this.setState({currentTime: currentTime})
    }

    judge() {
        let userAgent = window.navigator.userAgent;
        if (!Tingle.isMobile&&/DingTalk/i.test(userAgent)) {
            return true;
        }
        return false;
    }

    dingClick(e){
        if(!Tingle.isMobile){
            this._playPauseClick(e);
        }
    }

    _playPauseClick(e) {
        this._preventDefault(e);
        let href=window.location.href;
        let flag=this.judge();
        if(flag){
            if(window.DingTalkPC){
                DingTalkPC.biz.util.openLink({
                    url:href
                });
            }
            return;
        }

        let displayPause = this.state.displayPause;
        if (displayPause) {
            if (this.state.ifFirst) {
                this._setFirst();
                this.firstPlayCallback();
            }
            this.playCallback();
            this._startPlay();
        } else {
            this.pauseCallback();
            this._pausePlay();
        }
    }

    //播放逻辑
    _startPlay() {
        let startPlay = this.props.startPlay;
        if (startPlay) {
            startPlay();
        }
        this._setDisPlay_(false);
        this._setLoad(true);
    }

    //暂停逻辑
    _pausePlay() {
        let pausePlay = this.props.pausePlay;
        if (pausePlay) {
            pausePlay();
        }
        this._setDisPlay_(true);
    }

    //改变是否第一次点击状态
    _setFirst() {
        this.setState({ifFirst: false});
    }

    //改变播放暂停状态
    _setDisPlay_(state) {
        this.setState({displayPause: state});
    }

    //改变load状态
    _setLoad(state) {
        this.setState({loading: state});
    }

    //格式化时间 34=>00:34
    _formatSeconds(value) {
        var theTime = parseInt(value);
        var theTime1 = 0;
        var theTime2 = 0;
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = theTime % 60;
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = theTime1 % 60;
            }
        }
        theTime = (theTime + '').length == 1 ? ('0' + theTime) : theTime;
        var result = "00:" + theTime;
        if (theTime1 > 0) {
            theTime1 = (theTime1 + '').length == 1 ? ('0' + theTime1) : theTime1;
            theTime = result = "" + theTime1 + ":" + theTime;
        }
        if (theTime2 > 0) {
            theTime2 = (theTime2 + '').length == 1 ? ('0' + theTime2) : theTime2;
            result = "" + theTime2 + ":" + theTime;
        }
        return result;
    }

    //改变load状态
    changLoadState(load) {
        let current_load = this.state.loading;
        if (current_load === load) {
            return;
        } else {
            this._setLoad(load);
        }
    }

    //点击触发事件
    showControls(e) {
        if (this.refs.vedioAbsoluteContainer.getDOMNode() !== e.target) {
            return;
        }
        let videoHeight = this.state.videoHeight;
        if (videoHeight) {
            this._hideControls();
        } else {
            this._showControls();
        }
    }

    //全屏
    _fullScreen() {
        let fullScreen = this.props.fullScreen;
        if (fullScreen) {
            fullScreen();
        }
    }

    //提供给父组件方法,供source同步播放状态给control
    changePlayState(playedWidth) {
        this.setState({playedWidth: playedWidth});
    }

    //显示控制条
    _showControls() {
        if (this.state.videoHeight !== CONTROLHEIGHT) {
            this.setState({
                videoHeight: CONTROLHEIGHT
            });
        }
    }

    isIos(){
        let useragent=navigator.userAgent;
        if(/iPhone/.test(useragent)){
            return true;
        }
    }

    //隐藏控制条
    _hideControls() {
        if (this.state.videoHeight) {
            this.setState({
                videoHeight: 0
            });
        }
    }

    _preventDefault(e) {
        e.stopPropagation();
    }


    render() {
        let durationTime = this._formatSeconds(this.state.durationTime);
        let currentTime = this._formatSeconds(this.state.currentTime);
        let coverDisPlay = this.state.ifFirst == true ? 'block' : 'none';
        let videoHeight = this.state.videoHeight;
        let displayDown = this.state.displayPause ? 'inline' : 'none';
        let pauseDown = !this.state.displayPause ? 'inline' : 'none';
        let playedWidth = this.state.playedWidth;

        return (
            <div className="vedio-absolute-container" ref="vedioAbsoluteContainer"
                 onTouchStart={this.touchStartScroll.bind(this)}
                 onTouchMove={this.touchMoveScroll.bind(this)} onTouchEnd={this.touchEndScroll.bind(this)}
                 onClick={this.showControls.bind(this)}>
                <Loading ref="load" ifLoading={this.state.loading}/>
                <div className="play play-icon" style={{display:coverDisPlay}} onClick={this.dingClick.bind(this)}
                     onTouchStart={this._playPauseClick.bind(this)} onTouchMove={this.leftTouch.bind(this)}
                     onTouchEnd={this.leftTouch.bind(this)}>
                </div>
                <div className="slider_bar" style={{height:videoHeight}}>
                    <div className="left_btn_play" onTouchStart={this._playPauseClick.bind(this)}
                         onTouchMove={this.leftTouch.bind(this)} onTouchEnd={this.leftTouch.bind(this)}
                    >
                        <div className="svp_ctrl">
                            <VideoPlay className="big-icon red"
                                       style={{display:displayDown}}/>
                            <Pause className="big-icon red" style={{display:pauseDown}}/>
                        </div>
                    </div>
                    <div className="action_trackBar" onClick={this._changeTimeClick.bind(this)}>
                        <div className="trackbar">
                            <b className="played svp_ctrl_played_bar" style={{width:playedWidth}}>
                                <em className="handle svp_ctrl_drag_anchor" id="scrollerBar"
                                    onTouchStart={this.touchStartScroll.bind(this)}
                                    onTouchMove={this.touchMoveScroll.bind(this)}
                                    onTouchEnd={this.touchEndScroll.bind(this)}>
                                    <SolidCircle className="icon scrollerBar"/>
                                </em>
                            </b>
                        </div>
                    </div>
                    <div className="time">
                        <b>
                            {currentTime}
                        </b>
                        <b>/</b>
                            <span>
                                {durationTime}
                            </span>
                    </div>
                    <div className="controllers">
                        <div className="fullscreen"
                             onTouchStart={this._fullScreen.bind(this)} onTouchMove={this.leftTouch.bind(this)}
                             onTouchEnd={this.leftTouch.bind(this)}>
                            <Expand className="expand-icon"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

reactMixin.onClass(Control, plugin);
module.exports = Control;