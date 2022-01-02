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

  console.log("IDENTITY: ", identity)
  console.log("USER: ", user)

  if (!user) {
    console.log('No user!')
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: 'soree',
      }),
    }
  }

  /* note - see below - user.sub seems like a Google thing, lets see output of this with netlify user */

  /* ACTUALLY it is called sub in this context, but id in the localStorage anyway...

  // const newNote = {
  //   _type: 'note',
  //   webUser: user.sub, //netlify's unique id is called sub dunno why
  //   note: event.queryStringParameters.note
  // }

  try {
    //const result = await client.create(newNote)
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