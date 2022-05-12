import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'
import toObject from 'dayjs/plugin/toObject'

require('dayjs/locale/zh')

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)
dayjs.extend(toObject)

export default (time: Date | string | number) => {
    return dayjs(time).locale('zh')
}
