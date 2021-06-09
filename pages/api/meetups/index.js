import createHandler from '../../../middlewares'
import Meetup, { validateMeetup } from '../../../models/Meetup'
import validate from '../../../utils'

const handler = createHandler()

handler.get(async (req, res) => {
  const options = {
    page: req.query.page || 1,
  }
  const meetups = await Meetup.paginate({}, options)
  res.status(200).json({ meetups })
})

handler.post(async (req, res) => {
  console.log('req.file', req.file)
  let isMeetupExist = await Meetup.findOne({ meetupName: req.body.meetupName })
  if (isMeetupExist)
    return res
      .status(400)
      .json({ message: 'Meetup Already exist with this name' })

  const meetup = await Meetup({
    meetupName: req.body.meetupName,
    about: req.body.about,
    date: req.body.date,
    venue: req.body.venue,
    image: req.file.filename,
    active: true,
  })

  await meetup.save()
  res.status(200).json({ meetup })
})

export default validate(validateMeetup, handler)

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
