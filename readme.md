# Netlify Auth & Sanity Data

A bare minimum app that allows a Netlify identity user to sign up, log in, and securely read and write data scoped to their user in a private Sanity datastore. 

![screenshot](/images/working_screenshot.png)

This repo is *not* something you should fork to use for your next production project.  It's just a thing I made to learn/demonstrate one way this can work.

## Outline of how it works

### Signing Up 

1. Front End User signs up with [Netlify identity widget](https://github.com/netlify/netlify-identity-widget) and confirms their email
2. Front end user gets a token
3. Netlify function sends the new user info to Sanity
4. Sanity creates a document for that user

![signup diagram](/images/signing_up.png)

### Reading and Writing User-Scoped Data

1. Front End user logs in and gets a token
2. Front end user requests data to be read or written from Sanity - this request is passed up to a Netlify Serverless function, along with user's token
3. The serverless function has Sanity API key on hand and makes the request to the Sanity datastore
4. Sanity datastore returns the users fetched data to the function, which returns it to the client.  

![fetching data diagram](/images/fetching_data.png)

### Some Details

This is for demonstration purposes, so it has some slow, but simple-on-the-brain patterns like:

- No frontend framework nor front-end compilation steps
- Standard browser `fetch()` calls that only result in UI updates when the new data is really back from Sanity. 
- The npm stuff you see in the top-level directory is there for Netlify functions to access when this is deployed

## Where's the Sanity part? 

It's [this repo](https://github.com/bacalj/authy-studio) but there's not much to see.  It's an out-of-the-box Sanity studio.  The document schemas for the studio are pasted below for quick reference.  

### note.js

```js

import { MdNote } from 'react-icons/md'

export default {
  name: 'note',
  title: 'Notes',
  type: 'document',
  icon: MdNote,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'belongsTo',
      title: 'User',
      type: 'reference',
      to: [ { type: 'webUser' } ]
    }
  ]
}

```

### webUser.js

```js
import { MdPerson } from 'react-icons/md'

export default {
  name: 'webUser',
  title: 'Website Users',
  type: 'document',
  icon: MdPerson,
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string'
    }
  ]
}

```

