---
title: "Connect a Google account"
description: "Connect a Google account by signing in with Google, for the Google steps: Sheets, Calendar, Docs, Drive and more. Agentivity never sees your password."
sidebar:
  order: 9
editUrl: false
lastUpdated: false
---

<!-- GENERATED from agentivity_docs/en/guides/connect-google.md. Do not edit here: edit the source and publish again. -->

A **Google connection** is made by signing in with Google, not by pasting a key or a token. Agentivity never sees your password. The connection serves the steps [Google Sheets, Calendar, Docs and the others](/docs/workflows/use-google-sheets-and-google-calendar/), in a workflow or as tools of an agent.

## What you need

- A Google account.
- A browser that allows a pop-up window for this page. The sign-in opens in a small window beside the Studio.
- The right to manage credentials. See [Manage credentials](/docs/guides/manage-credentials/).

## Connect Google

1. In **Administration** › **Credentials**, select **New credentials** and choose **Google** (in **Other**).
2. In the window **Connect Google**, select **Connect with Google**. A Google window opens.
3. Choose the account, and allow what Agentivity asks: Google Sheets, Calendar, Docs, Drive, Slides, Forms, Contacts and Tasks. If Google shows the boxes unticked, tick them all.
4. The window closes and the Studio says "Connected." The connection is named after the account, for example "Google (name@example.com)".

<!-- IMAGE images/connect-google.jpg: The window Connect Google, with the button Connect with Google and the link Use your own Google app. -->

What the connection may do: use these eight services, and read the e-mail address of the account. For Drive, Agentivity sees only the files it creates or that you open with it, never the rest of your Drive. Agentivity never asks for Gmail. You can remove its access at any time at https://myaccount.google.com/permissions.

For now, Google may say "Google hasn't verified this app". Select **Advanced**, then **Go to Agentivity**. This will go away once Google has verified the app.

While you sign in, the window says "Waiting for Google. Complete the sign-in in the window that opened." If the browser blocked the window, allow pop-ups for this page and select **Connect with Google** again. If the sign-in takes more than ten minutes, select **Connect with Google** to start again.

## If the connection loses its access

The access is lost when you remove it at https://myaccount.google.com/permissions, or when the password of the account changes. Then:

- a step that uses the connection stops with "The connection '…' has lost its access to Google (the access was removed, or the password changed). Open it in the Studio and sign in again.";
- the list of **Credentials** says "This connection has lost its access. Click Edit, then sign in again.".

Select **Edit**, then **Sign in again**. It is the same connection, so everything that uses it works again.

## Delete or duplicate

- **Delete** also removes the access of Agentivity at Google.
- **Duplicate** makes a new sign-in, which can be with another account. The sign-in is never copied.

## On an installation of your own

A hosted workspace needs nothing more: it uses the Google app of Agentivity. If you install Agentivity yourself and it has no Agentivity Google app, use one of your own:

1. In https://console.cloud.google.com/auth/clients, make a client of type **Web application**.
2. In its **Authorized redirect URIs**, add the address of your instance followed by `/api/v1/oauth/callback`, for example `http://localhost:5005/api/v1/oauth/callback`.
3. Turn on the APIs of the services you use (Google Sheets, Calendar, Docs, Drive, Slides, Forms, People for Contacts, and Tasks), at https://console.cloud.google.com/apis/library.
4. In the audience of the app, add your account as a test user, or publish the app.
5. In the window **Connect Google**, select **Use your own Google app**, and enter its **Client ID** and its **Client secret**. Then select **Connect with Google**.

## How to know it worked

The list of **Credentials** shows "Google (name@example.com)". In a Google Calendar step, the test of the connection says "Connected to Google as" followed by the calendar.

## If it does not work

- **"This installation has no Agentivity Google app."** Use your own Google app, as above.
- **"Google did not let Agentivity stay connected."** Remove Agentivity from the apps connected to your Google account, at https://myaccount.google.com/permissions, then connect again.
- **"You did not allow Agentivity to use your Google account."** Start again and allow what Agentivity asks.
- **"This sign-in is unknown or took more than ten minutes."** Start again from Agentivity.
- **"Google could not be reached."** Try again in a moment.

## Next step

[Use Google Sheets, Calendar, Docs and the other Google steps](/docs/workflows/use-google-sheets-and-google-calendar/).
