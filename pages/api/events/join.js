import createHandler from '../../../middlewares'
import Event from '../../../models/Event'

const handler = createHandler()

handler.post(async (req, res) => {
  const { id } = req.query
  const joinedEvent = await Event.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        $inc: { $slots: -1 },
      },
    }
  )
  return res.status(200).json({ joinedEvent: joinedEvent })
})

export default handler
