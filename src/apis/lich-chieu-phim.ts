import { parserDom } from "./__helpers__/parserDom"

import { getInfoTPost } from "../helpers/getInfoTPost"

export async function LichChieuPhim() {
  const $ = await parserDom("/lich-chieu-phim.html")
  const now = Date.now()

  return $("#sched-content > .Homeschedule")
    .map((_i, item) => {
      const day = $(item).find(".Top > h1 > b").text()
      const _tmp = $(item)
        .find(".Top > h1")
        .text()
        .split(",", 2)[1]
        .match(/\d{1,2}/g)

      const date = _tmp?.[0] ?? null
      const month = _tmp?.[1] ?? null

      const items = $(item)
        .find(".MovieList:eq(0)")
        .find(".TPostMv")
        .map((_i, item) => getInfoTPost($(item), now))
        .toArray()

      // eslint-disable-next-line array-callback-return
      if (items.length === 0) return

      return { day, date, month, items }
    })
    .toArray()
    .filter(Boolean)
}
