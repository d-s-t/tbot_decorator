var token = "1988964465:AAE1seNy9ss0-YBgOdQkeC3wejLRgZ1jeJY";
var url = "https://api.telegram.org/bot" + token;
var webAppUrl= "https://script.google.com/macros/s/AKfycbwX3Z8UAWm9s3VFHSZYnT7-EEHCiBkiPOIHia3gsK_2SVRnZq841B1_2dUojXmQf_G8Zg/exec";
var otherWebApp = "https://script.google.com/macros/s/AKfycbxXkR1djAaK9JezQts-t1W-VGYjkPWu2Ixd8elOWomQVz-xF8zov7IJHjMIup6dk_E8/exec";


function sendText(chatId, text, keyBoard) {
  var data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chatId),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify({
        "inline_keyboard": keyBoard,
      })
    }
  };
  UrlFetchApp.fetch(url + '/', data);
}

function setWebhook() {
  var response =  UrlFetchApp.fetch(url + "/setWebhook?url=" + webAppUrl);
  Logger.log(response.getContentText());
}



function demoPost(){
  doPost({postData:{contents:"{\"update_id\":666346671,\n\"message\":{\"message_id\":11,\"from\":{\"id\":986383258,\"is_bot\":false,\"first_name\":\"d\",\"username\":\"DAVlDST\",\"language_code\":\"en\"},\"chat\":{\"id\":986383258,\"first_name\":\"d\",\"username\":\"DAVlDST\",\"type\":\"private\"},\"date\":1630277900,\"text\":\"/start\",\"entities\":[{\"offset\":0,\"length\":6,\"type\":\"bot_command\"}]}}"}});
}


function doPost(e) {
  var c = JSON.parse(e.postData.contents);
  var id;
  if(c.message){
    if(c.message.chat)id = c.message.chat.id;
    else if (c.message.from)id = c.message.from.id;
  }else if(c.callback_query){
    id = c.callback_query.from.id;
  }
  
  sendText(id,"decorator working")
  var data = {
    method: "post",
    payload: e.postData.contents,
    muteHttpExceptions: true,
  };
  var r = UrlFetchApp.fetch(otherWebApp,data);
  var c = Cheerio.load(r.getContentText());
  sendText(id,"response: "+ c(c('div')[1]).text());
}

/*function setWebhook() {
  var data = {
    method: "post",
    payload: {
      method: "setWebhook",
      url:ScriptApp.getService().getUrl(),
      allowed_updates: [],
      drop_pending_updates: true
    }
  };
  var response = UrlFetchApp.fetch(url + '/', data);
  // var response =  UrlFetchApp.fetch(url + "/setWebhook?url=" + "https://script.google.com/macros/s/AKfycbxT_eyVA-KHYdrnjMd71xx94elFAdNI23m3YVyP9HJ2Y1UWk5V6GjoTI3ufZhRhx4BAgg/exec");
  Logger.log(response.getContentText());
}
*/
function deleteWebhook() {
  var response =  UrlFetchApp.fetch(url + "/deleteWebhook");
  Logger.log(response.getContentText());
}
