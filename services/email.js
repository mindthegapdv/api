const postmark = require('postmark');
const path = require('path');
const swig = require('swig');

// Send an email:
const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN);

const sendTemplate = (to, subject, params, templateName) => {
  const html = swig.renderFile(path.resolve(path.join(`./templates/${templateName}.html`)), params);
  return client.sendEmail({
    From: process.env.POSTMARK_FROM || 'info@need2feed.us',
    To: to,
    Subject: subject,
    HtmlBody: html,
  });
};

module.exports = { sendTemplate, client };
