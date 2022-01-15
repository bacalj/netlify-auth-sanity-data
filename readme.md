# Authy

A minimum, no-front-end-javascript-frameworks-were-used-in-the-filming-of-this-movie example of third-party-auth-powered, Sanity-backed app. 

## Wha?

The task I set for myself was: "can I make a bare minimum app that allows a user to log in, and securely read and write data from a Sanity datastore"? There are lots of ways out there to do this, and I don't think this repo is something you should fork to use for your next project.  It's just a thing I made to learn and find all the weird corners of how something like this can work. 

So, the main players:

1. Sanity Content Lake 

2. Netlify Functions

3. Netlify Identity

## Where's the Sanity part? 

It's [this repo](https://github.com/bacalj/authy-studio) but that is just a clean, out-of-the-box Sanity studio, so there is not much to see there.  The schemas for the studio are pasted below for quick reference. 

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

