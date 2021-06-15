import nextConnect from 'next-connect'
import dbMiddleware from './db'
import uploadMiddleware from './multerConfig'

function createHandler(...middlewares) {
  return nextConnect({
    onError(error, req, res) {
      console.log(error)
      res.status(500).json({ error: `Something went wrong ${error.message}` })
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    },
  }).use(dbMiddleware, uploadMiddleware, ...middlewares)
}

export default createHandler
