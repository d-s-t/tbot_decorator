/**
 * telegram bot decorator.
 * purpose: to make it easer to debug your bot.
 * sending status of the bot run.
 * 
 * using the library Cheerio (id = 1ReeQ6WO8kKNxoaA_O0XEQ589cIrRvEBA9qcWpNqdOP17i47u6N9M5Xh0)
 * 
 * @auth davidst360@gmail.com
 */



/**
 * telegram bot token.
 * used for sending messages from the bot and set webhook.
 * the bot can be either the main bot or separate one.
 * if you wand to use the same bot, this script should be the one set as webhook.
 */
var token = "";
var url = "https://api.telegram.org/bot" + token;

/**
 * the web app url for the main bot script
 */
var otherWebApp = "";

/**
 * extra debugging, flag if to print (send as message in telegram) the request sent by telegram.
 * useful for chaking what is sent to deside how to write the code.
 */
var PRINT_POST_DATA = false;




/**
 * send telegram message.
 * @param chatId (Number) repesent the chat to send the message to.
 * @param text (String) the message to send.
 * @param keyBoard non-relevant to here (copy-paste from michael's code)
 */
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


/**
 * finding the chat id of the sender in the post data.
 * @param contents the contents of the post data.
 * @return the id the message sent from.
 */
function getId(contents){
  var id;
  if(contents.message){
    if(contents.message.chat)id = contents.message.chat.id;
    else if (contents.message.from)id = contents.message.from.id;
  }else if(contents.callback_query){
    id = contents.callback_query.from.id;
  }
  return id;
}

/**
 * apps script reserved name - the function that being called in post request.
 * main code here.
 */
function doPost(e) {
  var id = getId(JSON.parse(e.postData.contents));
  sendText(id, "decorator working");
  if(PRINT_POST_DATA){
    sendText(id, e.postData.contents);
  }
  var data = {
    method: "post",
    payload: e.postData.contents,
    muteHttpExceptions: true,
  };
  var r = UrlFetchApp.fetch(otherWebApp,data);
  var c = Cheerio.load(r.getContentText());
  sendText(id,"response: "+ c(c('div')[1]).text());
}

/**
 * set this script as the webhook of the bot with token (global var)
 */
function setWebhook() {
  var response =  UrlFetchApp.fetch(url + "/setWebhook?url=" + ScriptApp.getService().getUrl());
  Logger.log(response.getContentText());
}

/**
 * alternative webhook setter (with more settings)
 * stil not working.
 */
/*
function setWebhook() {
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

/**
 * delete the webhook of the bot with token (global var).
 */
function deleteWebhook() {
  var response =  UrlFetchApp.fetch(url + "/deleteWebhook");
  Logger.log(response.getContentText());
}
