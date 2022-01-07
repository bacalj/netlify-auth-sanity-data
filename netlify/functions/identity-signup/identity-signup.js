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

  /* 
      app_metadata
      give the user a role as they are created, could be programattic if using API and not just widget 
      user_metadata
      spread submitted metadata into user
      did not work last time maybe this commit will fix
  */
  const netlifyResponseBody = {
    app_metadata: {
      roles: ['basic']
    },
    user_metadata: {
      ...user.user_metadata,
    },
  }

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
      body: JSON.stringify(netlifyResponseBody),
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
