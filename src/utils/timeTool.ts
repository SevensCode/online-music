import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

require('dayjs/locale/zh')

dayjs.extend(updateLocale)
dayjs.extend(relativeTime)

export default (time: Date | string | number) => {
    return dayjs(time).locale('zh')
}
