import { ExtendedRecordMap } from 'notion-types'
import { uuidToId } from 'notion-utils'

import { Site } from './types'

export const mapPageUrl =
  (site: Site, recordMap: ExtendedRecordMap, searchParams: URLSearchParams) =>
  (pageId = '') => {
    if (uuidToId(pageId) === site.rootNotionPageId) {
      return createUrl('/', searchParams)
    } else {
      return createUrl(`/post/${uuidToId(pageId)}`, searchParams)
    }
  }

export const getCanonicalPageUrl =
  (site: Site, recordMap: ExtendedRecordMap) =>
  (pageId = '') => {

    if (uuidToId(pageId) === site.rootNotionPageId) {
      return `https://${site.domain}`
    } else {
      return `https://${site.domain}/post/${uuidToId(pageId)}`
    }
  }

function createUrl(path: string, searchParams: URLSearchParams) {
  return [path, searchParams.toString()].filter(Boolean).join('?')
}
