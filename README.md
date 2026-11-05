# Frame3 CutCraft Studio — 3-Partner Agency CRM (INR ₹ Edition)

A 100% free, serverless 3-partner creative agency CRM localized for **Indian Rupees (₹ / INR)**, powered by a **Google Sheets + Google Apps Script (`Code.gs`)** backend with **Gmail (`MailApp.sendEmail`)** automation and a built-in **Bulk Currency Converter**.

## 📁 Project Structure (`D:\Agency_CRM_Project`)

- `index.html` — Clean-slate 5-Column Lead Pipeline Kanban (`₹0` initial state), INR (`₹`) Revenue & 3-Partner Split Telemetry (`Partner 1`, `Partner 2`, `Partner 3`), Bulk Currency Converter Modal, New Client Lead Modal with foreign-quote auto-conversion, and Gmail Dispatch Modal.
- `tech-stack.html` — Clean-slate Tech Stack & Subscriptions Management inventory with INR (`₹`) formatting and foreign currency (`USD`, `EUR`, `GBP`) auto-conversion when adding SaaS tools.
- `receipt.html` — Client Production Expense Breakdown & Printable PDF Receipt view localized in `₹` (`en-IN`).
- `app.js` — Frontend `fetch()` API engine pre-configured with the live Google Apps Script Web App URL (`https://script.google.com/macros/s/AKfycbydimCFgLqs3c-G6lczWlBPJ2ZqUeEIuyTKI1WNVxhLVenN3A1YDWNyvg7XQigrXc91bw/exec`), Indian numbering formatter (`formatINR`), Bulk Currency Converter (`USD $`, `EUR €`, `GBP £`, `AED`, `CAD`, `AUD` -> `INR ₹`), and 3-partner configuration.
- `styles.css` — Custom Obsidian Reel theme utilities and print rules.
- `Code.gs` — Clean-slate Google Apps Script Web App backend reading/writing to `'Leads'`, `'Tech Stack'`, and `'Revenue'` tabs + `MailApp.sendEmail()` automation + `clearAllDemoData()` helper.
- `stitch_nexcrm_ai_platform/` — Original exported Stitch UI screens and design system reference (`DESIGN.md`).
