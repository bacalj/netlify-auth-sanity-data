const process = require('process')

//TODO - import nanoid and use it to make the new note and new reference ids

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2022-01-01',
  useCdn: false,
})

const handler = async (event, context) => {

  //console.log("|||||||| EVENT: -->", event )
  //console.log("|||||||| CONTEXT: -->", context )
  //note text is correct
  const noteText = event.queryStringParameters.note
  const uId = context.clientContext.user.sub
  const uRoles = context.clientContext.user.app_metadata.roles

  console.log("uId: -->", uId )
  console.log("uRoles: -->", uRoles )

  /* no user, no go */
  if (!uId) {
    console.log('No user!')
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: 'no go',
      }),
    }
  }

  /* no basic role, no go */
  if (uRoles[0] !== 'basic') {
    console.log('No basic role!')
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: 'no go',
      }),
    }
  }

  const newNote = {
    _type: 'note',
    title: event.queryStringParameters.note
  }

  try {
    
    const result = await client.create(newNote).then((res) => {
      console.log('SANITY RESPONSE: ', res)
      if (res._createdAt){
        console.log('the note with id ' + res._id + 'now exists. Now create a reference to it on user document ' + uId )
      }
    })


    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({uid: uId, roles: uRoles})
    }
  } 
  
  catch (error) {
    console.log(error)
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 500,
      body: error.responseBody || JSON.stringify({ error: 'An error occurred' }),
    }
  }
}

module.exports = { handler }