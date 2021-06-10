import createHandler from '../../../middlewares'
import Event, { validateEvent } from '../../../models/event'
import validate from '../../../utils'

const handler = createHandler()

handler.get(async (req, res) => {
  const { id } = req.query
  const event = await Event.findOne({ _id: id })
  res.status(200).json({ event })
})

handler.put(async (req, res) => {
  const { id } = req.query
  validateEvent(validateEvent)
  const event = await Event.findByIdAndUpdate(
    id,
    {
      eventName: req.body.eventName,
      about: req.body.about,
      date: req.body.date,
      venue: req.body.venue,
    },
    { new: true }
  )

  if (!event) return res.status(400).json({ message: 'Event Not Found' })
  return res.status(200).json({ event })
})

handler.delete(async (req, res) => {
  const { id } = req.query
  const event = await Event.findByIdAndRemove(id)
  if (!event) return res.status(400).json({ message: 'Event Not Found' })
  return res.status(200).json({ event })
})

export default handler
