import createHandler from '../../../middlewares'
import Meetup, { validateMeetup } from '../../../models/Meetup'
import validate from '../../../utils'

handler = createHandler()

handler.get(async (req, res) => {
  let currentDate = moment(new Date()).format('YYYY-MM-DD')
  const meetups = await Meetup.find({ date: { $gte: currentDate } }).limit(6)
  console.log(meetups)
  res.status(200).json({ meetups })
})

export default validate(validateMeetup, handler)
