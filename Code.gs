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






function doPost(e) {
  var c = JSON.parse(e.postData.contents);
  var id = c.message.chat.id;
  sendText(id,"decorator working")
  var data = {
    method: "post",
    payload: e.postData.contents
  };
  var r = UrlFetchApp.fetch(otherWebApp,data);
  sendText(id,`content: ${r.getContentText()}
  code: ${r.getResponseCode()}`);
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
