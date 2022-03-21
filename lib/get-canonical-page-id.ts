import { ExtendedRecordMap } from 'notion-types'
import {
  parsePageId,
  getCanonicalPageId as getCanonicalPageIdImpl
} from 'notion-utils'

import { inversePageUrlOverrides } from './config'

export function getCanonicalPageId(
  pageId: string,
  recordMap: ExtendedRecordMap,
  { uuid = true }: { uuid?: boolean } = {}
): string | null {
  const cleanPageId = parsePageId(pageId, { uuid: false })
  if (!cleanPageId) {
    return null
  }

  const override = inversePageUrlOverrides[cleanPageId]
  console.log('override', override)
  if (override) {
    return override
  } else {
    console.log('override-else', getCanonicalPageIdImpl(pageId, recordMap, {
      uuid
    }))
    return getCanonicalPageIdImpl(pageId, recordMap, {
      uuid
    })
  }
}
