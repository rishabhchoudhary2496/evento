import createHandler from '../../../middlewares'
import Meetup, { validateMeetup } from '../../../models/Meetup'
import validate from '../../../utils'

const handler = createHandler()

handler.get(async (req, res) => {
  const { id } = req.query
  const meetup = await Meetup.findOne({ _id: id })
  res.status(200).json({ meetup })
})

handler.put(async (req, res) => {
  const { id } = req.query
  validate(validateMeetup)
  const meetup = await findByIdAndUpdate(
    id,
    {
      meetupName: req.body.meetupName,
      about: req.body.about,
      date: req.body.date,
      venue: req.body.venue,
      participants: req.body.participants,
    },
    { new: true }
  )

  if (!meetup) return res.status(400).json({ message: 'Meetup Not Found' })
  return res.status(200).json({ meetup })
})

handler.delete(async (req, res) => {
  const { id } = req.query
  const meetup = await Meetup.findByIdAndRemove(id)
  if (!meetup) return res.status(400).json({ message: 'Event Not Found' })
  return res.status(200).json({ meetup })
})

export default handler
