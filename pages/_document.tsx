/* eslint-disable react/no-danger */
import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { extractStyles } from 'evergreen-ui'
import * as snippet from '@segment/snippet';

declare global {
  interface Window {
      analytics:any;
  }
}

export default class MyDocument extends Document<any> {
  static getInitialProps({ renderPage }) {
    const page = renderPage()
    // `css` is a string with css from both glamor and ui-box.
    // No need to get the glamor css manually if you are using it elsewhere in your app.
    //
    // `hydrationScript` is a script you should render on the server.
    // It contains a stringified version of the glamor and ui-box caches.
    // Evergreen will look for that script on the client and automatically hydrate
    // both glamor and ui-box.
    const { css, hydrationScript } = extractStyles()

    return {
      ...page,
      css,
      hydrationScript
    }
  }

  renderSnippet() {
    const opts = {
      apiKey: process.env.AJS_WRITE_KEY
    };

    return snippet.min(opts);
  }

  render() {
    const { css, hydrationScript } = this.props

    return (
      <html>
        <Head>
          <title>Email Your Reps</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </html>
    )
  }
}