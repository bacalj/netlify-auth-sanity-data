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

  //console.log("|||||||| EVENT: -->", event )
  //console.log("|||||||| CONTEXT: -->", context )
  //note text is correct
  const noteText = event.queryStringParameters.note
  const uId = context.clientContext.user.sub
  const uRoles = context.clientContext.user.app_metadata.roles

  console.log("uId: -->", uId )
  console.log("uRoles: -->", uRoles )



  if (!user) {
    console.log('No user!')
    return {
      statusCode: 401,
      body: JSON.stringify({
        data: 'no go',
      }),
    }
  }

  /* TODO NEXT: we should do like above block and check the role as well */


  // const newNote = {
  //   _type: 'note',
  //   webUser: user.sub,
  //   note: event.queryStringParameters.note
  // }

  // console.log("handler{}: ", newNote)

  try {
    
    //console.log("try{}: ", newNote)

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