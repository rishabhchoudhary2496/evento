import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { object, string } from 'yup'

const MODEL_NAME = 'Event'

const schema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    excited: {
      type: Number,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

schema.plugin(mongoosePaginate)
export const validateEvent = object({
  eventName: string().required().min(3).max(255),
  venue: string().required().min(3).max(1055),
  about: string().required().min(3),
  date: string().required(),
  time: string().required(),
})

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'events')
