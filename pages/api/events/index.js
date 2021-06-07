import createHandler from '../../../middlewares'
import Event, { validateEvent } from '../../../models/Event'
import validate from '../../../utils'

const handler = createHandler()

handler.get(async (req, res) => {
  const options = {
    page: req.query.page || 1,
  }
  const events = await Event.paginate({}, options)
  res.status(200).json({ events })
})

handler.post(async (req, res) => {
  console.log('req.body', req.file)
  const event = new Event({
    eventName: req.body.eventName,
    about: req.body.about,
    date: req.body.date,
    venue: req.body.venue,
    image: req.file.path,
  })
  await event.save()
  res.status(200).json({ event })
})

export default handler

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
