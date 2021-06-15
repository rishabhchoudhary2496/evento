import createHandler from '../../../middlewares'
import Meetup, { validateMeetup } from '../../../models/Meetup'
import validate from '../../../utils'

const handler = createHandler()

handler.post(async (req, res) => {
  const { id } = req.query
  const joinedEvent = await Meetup.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        $inc: {
          $slots: -1,
        },
      },
    }
  )
  return res.status(200).json({ joinedEvent: joinedEvent })
})
