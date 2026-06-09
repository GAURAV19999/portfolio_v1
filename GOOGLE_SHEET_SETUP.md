# 📊 Connect Contact Form to Google Sheet

Follow these 5 steps to receive every contact form submission in your Google Sheet (and your email).

## 1. Create a Google Sheet

Go to [sheets.google.com](https://sheets.google.com) → New blank sheet → Name it `Portfolio Contacts`.

In row 1, add these column headers (exactly):

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| timestamp | name | email | projectType | budget | message | source |

## 2. Open Apps Script

In the Sheet menu: **Extensions → Apps Script**

Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = e.parameter;
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.projectType || '',
      data.budget || '',
      data.message || '',
      'Portfolio Website'
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the gear icon → **Web app**
3. Set:
   - **Description**: `Portfolio Contact Form`
   - **Execute as**: `Me (your@email.com)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. **Authorize** (click "Advanced" → "Go to project" → "Allow")
6. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Add URL to Your Portfolio Admin

1. Open `/admin` in your portfolio
2. Go to **Contact Info**
3. Paste the URL into the **Google Apps Script URL** field
4. Click **Save Changes**

## 5. (Optional) Add Email Notifications

Add this to the same Apps Script to also email yourself on every submission:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = e.parameter;
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.projectType || '',
      data.budget || '',
      data.message || '',
      'Portfolio Website'
    ]);

    // Email notification
    MailApp.sendEmail({
      to: 'gauravkumarvishwakarma@gmail.com',
      subject: `🔔 New Portfolio Inquiry from ${data.name}`,
      htmlBody: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Project Type:</b> ${data.projectType}</p>
        <p><b>Budget:</b> ${data.budget || 'Not specified'}</p>
        <p><b>Message:</b><br>${data.message}</p>
        <hr>
        <p><small>Sent from your portfolio website at ${new Date().toLocaleString()}</small></p>
      `
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Re-deploy → New deployment → use the same URL or get a new one.

## ✅ Test It

1. Open your portfolio website
2. Submit a test message via the contact form
3. Check your Google Sheet — new row should appear
4. Check your email — notification should arrive
5. Check `/admin/messages` — message should also be saved there

## 🔒 Important Notes

- Submissions are **always** saved to your admin inbox (`localStorage`) regardless of Google Sheet status
- Google Apps Script free tier handles ~20,000 submissions/day
- The form uses `mode: 'no-cors'` so it works without CORS configuration — but it can't read the response
- Your previous portfolio at iamgaurav.netlify.app likely uses the same approach
