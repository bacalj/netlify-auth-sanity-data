const process = require('process')

const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_TOKEN,
  apiVersion: '2022-01-01',
  useCdn: false,
})

const handler = async function (event) {
  const data = JSON.parse(event.body)
  const { user } = data

  /* look */
  const responseBody = {
    app_metadata: {
      roles: ['basic-user']
    },
    user_metadata: {
      ...user.user_metadata,
    },
  }

  console.log(responseBody)

  /* create the user in sanity with the new users id as the sanity document id */
  const doc = {
    _id: user.id,
    _type: 'webUser',
    email: user.email,
    fullName: user.user_metadata.full_name,
  }

  try {
    const result = await client.createIfNotExists(doc).then((res) => {
      console.log('SANITY RESPONSE: ', res)
    })
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    }
  } catch (error) {
    return {
      headers: { 'Content-Type': 'application/json' },
      statusCode: 500,
      body: error.responseBody || JSON.stringify({ error: 'An error occurred' }),
    }
  }
}

module.exports = { handler }
