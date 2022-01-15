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

  const uId = context.clientContext.user.sub
  const uRoles = context.clientContext.user.app_metadata.roles

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

  try {
    const query = `*[_type == "note" && references("${uId}")]{title, _updatedAt, _id}`

    let notes

    await client.fetch(query).then((r) => {
      notes = r.map((n) => {
        return { 
          title: n.title, 
          updated: n._updatedAt, 
          id: n._id 
        }
      })
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notes),
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
