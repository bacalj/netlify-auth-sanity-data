const process = require('process')

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const handler = async (event, context) => {

  const { identity, user } = context.clientContext
  console.log("EVENT.queryStringParameters: ", event.queryStringParameters)
  console.log("EVENT.multivalueHeaders.Authorization: ", event.multivalueHeaders.Authorization)
  console.log("IDENTITY: ", identity)
  console.log("USER: ", user)

  const claims = context.clientContext && context.clientContext.identity
  //console.log(context.clientContext.identity)

  if (!claims) {
    console.log('No claims!')
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: 'soree',
      }),
    }
  }

  // const newNote = {
  //   _type: 'note',
  //   webUser: payload.webUser,
  //   note: payload.note,
  // }

  try {
    const result = await client.create(newDoc)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify(result),
      body: 'hello'
    }
  } 
  
  catch (error) {
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 500,
      body: error.responseBody || JSON.stringify({ error: 'An error occurred' }),
    }
  }
}

module.exports = { handler }