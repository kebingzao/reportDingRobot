/**
 * Module dependencies.
 */
// 发送钉钉通知
var https = require('https');

var sendNotice = function(){
    var data = {
        "msgtype": "text",
        "text": {
            "content": "赶紧写日报，不然造哥要生气了"
        },
        "at": {
            "isAtAll": true
        }
    };

    data = JSON.stringify(data);
    console.log(data);
    var opt = {
        method: "POST",
        host: "oapi.dingtalk.com",
        path: "/robot/send?access_token=xxx",
        headers: {
            "Content-Type": 'application/json'
        }
    };

    var req = https.request(opt, function (res) {
        var body = "";
        res.
        on('data', function (data) {
            body += data;
        })
                .on('end', function () {
                    console.log(body);
                });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(data + "\n");
    req.end();
};

var schedule = require("node-schedule");
var rule = new schedule.RecurrenceRule();
// 周一到周五的10点的 0分，10分，各弹一次
rule.dayOfWeek = [1, new schedule.Range(2, 5)];
rule.hour = 10;
rule.minute = [0,10];
var j = schedule.scheduleJob(rule, function(){
    // 发送通知
    console.log("发送通知");
    sendNotice()
});

console.log("=========start==========");