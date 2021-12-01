const process = require('process')

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_PROJECTID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const handler = async (event) => {

  const newDoc = {
    _type: 'todo',
    webUser: payload.webUser,
    todo: payload.todo,
  }

  try {
    const result = await client.create(newDoc)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
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
