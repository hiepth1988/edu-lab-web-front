<?xml version="1.0" encoding="UTF-8"?>
<!-- Human-readable view of /sitemap.xml in browsers. Search engines ignore it. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="robots" content="noindex" />
        <title>XML Sitemap - XO Edu Lab</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #333; margin: 0; padding: 24px 64px; font-size: 14px; }
          h1 { font-size: 22px; margin: 0 0 12px; }
          p { color: #555; margin: 0 0 20px; }
          table { border-collapse: collapse; width: 100%; max-width: 1100px; }
          th { text-align: left; padding: 6px 4px; border-bottom: 1px solid #000; font-size: 13px; }
          td { padding: 4px; font-size: 13px; }
          tr:nth-child(even) td { background: #f6f6f6; }
          a { color: #222; text-decoration: none; }
          a:hover { text-decoration: underline; }
          .alt { color: #888; font-size: 12px; }
          @media (max-width: 700px) { body { padding: 16px; } }
        </style>
      </head>
      <body>
        <h1>XO Edu Lab</h1>
        <p>This XML Sitemap contains <xsl:value-of select="count(s:urlset/s:url)" /> URLs.</p>
        <table>
          <tr>
            <th style="width:60%">URL</th>
            <th style="width:20%">Languages</th>
            <th style="width:20%">Last Modified</th>
          </tr>
          <xsl:for-each select="s:urlset/s:url">
            <tr>
              <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
              <td class="alt">
                <xsl:for-each select="xhtml:link[@hreflang != 'x-default']">
                  <a href="{@href}"><xsl:value-of select="@hreflang" /></a>
                  <xsl:if test="position() != last()"><xsl:text> · </xsl:text></xsl:if>
                </xsl:for-each>
              </td>
              <td><xsl:value-of select="substring(s:lastmod, 1, 10)" /></td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
