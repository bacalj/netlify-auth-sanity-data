const handler = async function (event) {
  const data = JSON.parse(event.body)
  const { user } = data

  const responseBody = {
    app_metadata: {
      roles: ['basic-user'],
      my_user_info: 'can we really just create a field of sorts?',
    },
    user_metadata: {
      // append current user metadata
      ...user.user_metadata,
      custom_data_from_function: 'hurray this is some extra metadata',
    },
  }

  console.log("USER CREATED: ", user)
  console.log("RESPONSEBODY: ", responseBody)
  
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  }
}

module.exports = { handler }
