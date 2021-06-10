// export default function validate(schema, handler) {
//   return async (req, res) => {
//     console.log('req.body', req.body)
//     if (['POST', 'PUT'].includes(req.method)) {
//       try {
//         // const newSchema =
//         //   req.method === 'POST'
//         //     ? schema
//         //     : schema.concat(object({ id: number().required().positive() }))

//         req.body = await schema.validate(req.body, {
//           stripeUnknown: true,
//         })
//       } catch (error) {
//         console.log('error', error)
//         return res.status(400).json({ error: error.message })
//       }
//     }
//     await handler(req, res)
//   }
// }
export default function validate(schema) {
  return async (req, res) => {
    if (['POST', 'PUT'].includes(req.method)) {
      try {
        // const newSchema =
        //   req.method === 'POST'
        //     ? schema
        //     : schema.concat(object({ id: number().required().positive() }))

        req.body = await schema.validate(req.body, {
          stripeUnknown: true,
        })
        return
      } catch (error) {
        console.log('error', error)
        return res.status(400).json({ error: error.message })
      }
    }
  }
}
