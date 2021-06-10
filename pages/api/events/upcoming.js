import createHandler from '../../../middlewares'
import Event, { validateEvent } from '../../../models/event'
import validate from '../../../utils'
import moment from 'moment'

const handler = createHandler()

handler.get(async (req, res) => {
  let currentDate = moment(new Date()).format('YYYY-MM-DD')
  console.log('current Date', currentDate)
  const events = await Event.find({ date: { $gte: currentDate } }).limit(6)
  console.log('event', events)
  return res.status(200).json({ events })
})

export default handler
