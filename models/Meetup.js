import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { object, string } from 'yup'

const MODEL_NAME = 'Meetup'

const schema = new Schema({
  meetupName: {
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
  date: {
    type: Date,
    required: true,
  },
  participants: {
    type: Number,
    require: true,
  },
  active: {
    type: boolean,
  },
})

schema.plugin(mongoosePaginate)
export const validateMeetup = object({
  meetupName: string().required().min(3).max(255),
  venue: string().required().min(3).max(1055),
  about: string().required().min(3),
  date: string().required(),
  participants: string().required(),
})

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, 'meetups')
