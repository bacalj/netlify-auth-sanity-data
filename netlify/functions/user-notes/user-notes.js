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

  //console.log("EVENT: ", event)
  //console.log("CONTEXT: ", context)

  const uId = context.clientContext.user.sub
  const uRoles = context.clientContext.user.app_metadata.roles

  console.log("uId: ", uId)
  console.log("uRoles: ", uRoles)

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

  const query = `*[_type == "note" && references(${uId})]`

  console.log("CLIENT: ", client)
  console.log("QUERY: ", query)

  // return client
  //   .fetch(query)
  //   .then((result) => ({
  //     statusCode: 200,
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(result),
  //   }))
  //   .catch((error) => ({
  //     headers: { 'Content-Type': 'application/json' },
  //     statusCode: error.statusCode || 500,
  //     body: error.responseBody || JSON.stringify({ error: 'Unknown error occurred' }),
  //   }))
}

module.exports = { handler }
