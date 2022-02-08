import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
// Import styled components ServerStyleSheet
import styled, { ServerStyleSheet } from 'styled-components'

const Body = styled.body`
  min-height: 100vh;
  min-width: 100vw;
`

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    )
  }
}