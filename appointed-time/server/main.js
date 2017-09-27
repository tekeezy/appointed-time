import { Meteor } from 'meteor/meteor';
import { Groups } from '../imports/collections.js'
import { HTTP } from 'meteor/http';
var moment = require('moment');

Meteor.startup(() => {
  console.log("test "+Groups.find({}).count());
});

Meteor.methods( {
  register: function(param) {

    Groups.insert({
      groupName: param.title,
      targetTime: param.time,
      member : param.member,
    });
  },

  arrival: function(_id, date, gid) {
    // Tasks.update(this._id, {
    //   $set: { checked: ! this.checked },
    // });
    Groups.update(
      {"_id":gid, "member.member_id":_id},
      {$set:{"member.$.arrival":date.toLocaleString(), "member.$.attendance": true}});

      var grp = Groups.findOne({"_id":gid});
      console.log(grp.targetTime);
      console.log(moment(grp.targetTime));
      var mTargetTime = moment(grp.targetTime);

      var targetTime = mTargetTime.toDate();
      if(targetTime.getTime()-date.getTime()>0) {
        console.log("ttt");
        deposit(_id);
      } else {
        console.log("yyy");
      }

  },

  balance : function(account) {
    var IsTuno = getDate() + "000001";
    var Tsymd = getDate("yyyyMMdd");
    var Trtm  = getDate().substring(8);
    var inputJson = "";
    inputJson += '{';
			inputJson += '\n "Header" : {';
			inputJson += '\n   "ApiNm" : "InquireBalance",'; // API 명
			inputJson += '\n   "Tsymd" : "' + Tsymd + '",'; // 전송일자
			inputJson += '\n   "Trtm" : "' + Trtm + '",'; // 전송시각
			inputJson += '\n   "Iscd" : "000017",'; // 기관코드
			inputJson += '\n   "FintechApsno" : "001",'; // 핀테크앱일련번호
			inputJson += '\n   "ApiSvcCd" : "03Q_004_F0",'; // API서비스코드
			inputJson += '\n   "IsTuno" : "' + IsTuno + '"'; // 기관거래고유번호
			inputJson += '\n },';
			inputJson += '\n "FinAcno" : "' + account + '"'; // 핀-어카운트
			inputJson += '\n }';

      let temp2;

    const callback = HTTP.call('POST', 'http://10.10.3.50:8081/NH-KISA-OTA/ota/process.jsp?p=send&fintechApsno=001',
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        content: "JSONData=" + inputJson
      }/*, function (error, response) {
        if(error) {
          console.log(error);
          temp2 = "오류";
        } else {
          var temp = JSON.parse(response.content);
          console.log(temp.RlpmAbamt);
          temp2 = temp.RlpmAbamt;
        }
      }*/);
      return JSON.parse(callback.content).RlpmAbamt;
  },

  getWithdraw: function(members) {
    var salt = 1;
    for(var i=0; i<members.length; i++) {
      var cont =Meteor.users.findOne({"_id":members[i].member_id});
      withDraw(cont.account, salt++);
    }
  },

});

function deposit (_id){
    var cont = Meteor.users.findOne({"_id":_id});
    var IsTuno = getDate() + "000001";
    var Tsymd = getDate("yyyyMMdd");
    var Trtm  = getDate().substring(8);
    var inputJson = "";
    inputJson += '{';
    inputJson += '\n "Header" : {';
    inputJson += '\n   "ApiNm" : "ReceivedTransferFinAccount",'; // API명
    inputJson += '\n   "Tsymd" : "' + Tsymd + '",'; // 전송일자
    inputJson += '\n   "Trtm" : "' + Trtm + '",'; // 전송시각
    inputJson += '\n   "Iscd" : "000017",'; // 기관코드
    inputJson += '\n   "FintechApsno" : "001",'; // 핀테크앱일련번호
    inputJson += '\n   "ApiSvcCd" : "02M_001_00",'; // API서비스코드
    inputJson += '\n   "IsTuno" : "' + IsTuno + '"'; // 기관거래고유번호
    inputJson += '\n },';
    inputJson += '\n "FinAcno" : "' + cont.account + '",'; // 핀-어카운트
    inputJson += '\n "Tram" : "' + 100 + '",'; // 거래금액
    inputJson += '\n "DractOtlt" : "' +_id + '",'; // 출금계좌인자내용
    inputJson += '\n "MractOtlt" : "안늦었어용"'; // 입금계좌인자내용
    inputJson += '\n }';

    const callback = HTTP.call('POST', 'http://10.10.3.50:8081/NH-KISA-OTA/ota/process.jsp?p=send&fintechApsno=001',
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        content: "JSONData=" + inputJson
      });
}

function withDraw(account, salt) {
  var IsTuno = getDate() + "00000" + salt;
  var Tsymd = getDate("yyyyMMdd");
  var Trtm  = getDate().substring(8);
  var inputJson = "";
  inputJson += '{';
  inputJson += '\n "Header" : {';
  inputJson += '\n   "ApiNm" : "DrawingTransfer",'; // API명
  inputJson += '\n   "Tsymd" : "'+Tsymd+'",'; // 전송일자
  inputJson += '\n   "Trtm" : "'+Trtm+'",'; // 전송시각
  inputJson += '\n   "Iscd" : "000017",'; // 기관코드
  inputJson += '\n   "FintechApsno" : "001",'; // 핀테크앱일련번호
  inputJson += '\n   "ApiSvcCd" : "01D_001_00",'; // API서비스코드
  inputJson += '\n   "IsTuno" : "'+IsTuno+'"'; // 기관거래고유번호
  inputJson += '\n },';
  inputJson += '\n "FinAcno" : "'+account+'",'; // 핀-어카운트
  inputJson += '\n "Tram" : "'+100+'",';  // 거래금액
  inputJson += '\n "DractOtlt" : "모임 디파짓",'; // 출금계좌인자내용
  inputJson += '\n }';

  const callback = HTTP.call('POST', 'http://10.10.3.50:8081/NH-KISA-OTA/ota/process.jsp?p=send&fintechApsno=001',
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      content: "JSONData=" + inputJson
    });
}

function getDate(pattern){
    var result = "";
    var d = new Date();
    year = d.getFullYear();
    month = (d.getMonth() + 1);
    date = d.getDate();
    hours = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

    if (month   < 10) month   = "0" + month;
    if (date    < 10) date    = "0" + date;
    if (hours   < 10) hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    if(pattern && pattern == "yyyyMMdd"){
        result = year+""+month+""+date;
    }else{
        result = year+""+month+""+date+""+hours+""+minutes+""+seconds+"";
    }
    return result;
}
