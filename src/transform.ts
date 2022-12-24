import * as cheerio from 'cheerio'
import Request from '@edgio/core/router/Request'
import Response from '@edgio/core/router/Response'

export default function transformResponse(response: Response, request: Request) {
  if (response.body) {
    const $ = cheerio.load(response.body)
    if (request.path == '/' || request.path.includes('/ltl')) {
      $('[rel="dns-prefetch"]').remove()
      let bodyScripts = $('body script')
      $('head script').each((_, ele) => {
        let temp = $(ele)
        $(ele).remove()
        $('body').append(temp)
      })
      bodyScripts.each((_, ele) => {
        let temp = $(ele)
        $(ele).remove()
        $('body').append(temp)
      })
      $('head link[href*="googleapis"]').each((i, el) => {
        let temp = $(el)
        temp.attr('media', 'print')
        temp.attr('onload', "this.media='all'")
      })
      $('head link[href*="animations.min.css"]').each((i, el) => {
        let temp = $(el)
        temp.attr('media', 'print')
        temp.attr('onload', "this.media='all'")
      })
    }
    response.body = $.html()
      .replace(/\?edgio\_dt\_pf\=1/g, '')
      .replace(/\=\"\/\//g, '="https://')
      .replace(/https?:\/\/www\.optym\.com\//g, '/')
      .replace(/https?:\/\/optym\.com\//g, '/')
  }
}
