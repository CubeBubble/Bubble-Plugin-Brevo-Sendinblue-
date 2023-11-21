async function(properties, context) {
  var requestBody = {
    sender: properties.sender,
    recipient: properties.recipient,
    content: properties.content,
    type: "transactional",
    unicodeenabled: properties.unicodeenabled,
    tag: properties.tag ? properties.tag : undefined,
    weburl: properties.weburl ? properties.weburl : undefined,
  };

  const url = "https://api.sendinblue.com/v3/transactionalSMS/sms";

  let requestHeaders = new Headers();
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("api-key", context.keys.APIKey);

  let options = {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, options);
    const body = await response.json();
  } catch (error) {
    throw error;
  }
}