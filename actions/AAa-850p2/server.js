async function(properties, context) {
  const getEmailsFromText = function (textValue) {
    const emails = textValue.split(",").map((email) => {
      return { email };
    });
    return emails;
  };

  let to = getEmailsFromText(properties.to);
  let bcc = properties.bcc ? getEmailsFromText(properties.bcc) : undefined;
  let cc = properties.cc ? getEmailsFromText(properties.cc) : undefined;
  let replyTo = properties.replyTo ? { email: properties.replyTo } : undefined;
  let htmlContent = properties.htmlContent ? properties.htmlContent : undefined;

  var requestBody = {
    to: to,
    sender: {
      email: properties.senderEmail,
      name: properties.senderName,
    },
    subject: properties.subject,
    textContent: properties.textContent,
    htmlContent: htmlContent,
    bcc: bcc,
    cc: cc,
    replyTo: replyTo,
  };

  const url = "https://api.sendinblue.com/v3/smtp/email";

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