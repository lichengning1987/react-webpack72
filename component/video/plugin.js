/*
 plugin区域 提供各种运行状态的回调函数
 */
let Dialog = Tingle.Dialog;
let versionCompare = require('../../app/versionCompare');
let calendarTime = 0;
let plugin = {
    /*
     第一次播放回调函数
     */
    firstPlayCallback: function () {
        //console.log('first')
        nwApp.getVersion();
    },

    /*
     播放回调函数
     */
    playCallback: function () {
        //console.log('start play');
        if (!nwApp.global2G) {
            nwApp.getCurrentNetStatus(this);
        }
    },

    pauseCallback: function () {
        //console.log('start pause');
        return true;
    },
    /*
     播放运行时回调函数
     */
    runTimeCallback: function (time) {
        //console.log('i am playing');
        if (!nwApp.global2G) {
            calendarTime++;
            if (calendarTime % 30 === 0) {
                nwApp.getCurrentNetStatus(this);
            }
        }

    }
};


let nwApp =
{
    checkoutTime: 10,
    global2G: false,
    netStatus: true,
    getVersion: function () {
        let WindVane=window.WindVane;
        if (WindVane&&WindVane.isAvailable) {
            WindVane.call('WVNative', 'getVersion', {}, e=> {
                if (e.ret) {
                    let versionArray = e.versionName.split('_');
                    let versionOne = versionArray[0];
                    let versionTwo = versionArray[1];
                    let result = versionCompare.compareOS('android', '5.0.0');
                    if (result === false) {
                        return;
                    }
                    let bigger = versionCompare.compare('3.1.0', versionOne);
                    if (result >= 0 && (bigger > 0 || versionTwo < 20160114)) {
                        this.updateConfirm();
                    }
                }
            });
        }
    },

    updateConfirm: function () {
        this.netStatus = false;
        Dialog.confirm({
            title: '更新提醒',
            children: '当前阿里内外版本不支持播放视频，请下载最新版本',
            onConfirm(){
                window.open('https://xz.alibaba-inc.com/app/app.vm');
            }
        });
    },

    getCurrentNetStatus: function (control) {
        let Ali = window.Ali;
        let WindVane=window.WindVane;
        if (Ali && Ali.network) {
            Ali.network.getType(res=> {
                if(typeof res.result=='object'){
                    res=res.result;
                }
                if (!res.isWifi && !nwApp.global2G) {
                    control._pausePlay();
                    this.networkConfirm.apply(control);
                }
            })
        } else if (WindVane&&WindVane.isAvailable) {
            WindVane.call('WVNative', 'getCurrentNetStatus', {}, e=> {
                if (typeof e == 'object') {
                    let netStatus = e.netStatus;
                    if (netStatus != 'WIFI' && nwApp.netStatus) {
                        control._pausePlay();
                        this.networkConfirm.apply(control);
                    }
                }
            });
        }
    },

    networkConfirm() {
        let t = this;
        Dialog.confirm({
            title: '网络提示',
            children: '使用2G/3G/4G网络观看视频会消耗较多的流量。确认要开启吗?',
            onConfirm(){
                nwApp.global2G = true;
                t._startPlay();
            }
        });
    }
};

module.exports = plugin;