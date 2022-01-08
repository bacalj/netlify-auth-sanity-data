const process = require('process')

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2022-01-01',
  useCdn: false,
})

const handler = async (event, context) => {

  //const { identity, user } = context.clientContext
  const noteText = event.queryStringParameters.note
  const identidad = context.clientContext

  console.log("NOTE: --> ", noteText )
  console.log("IDENTIDAD: -->", identidad )


  if (!user) {
    console.log('No user!')
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: 'soree',
      }),
    }
  }

  const newNote = {
    _type: 'note',
    webUser: user.sub,
    note: event.queryStringParameters.note
  }

  console.log("handler{}: ", newNote)

  try {
    
    console.log("try{}: ", newNote)

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