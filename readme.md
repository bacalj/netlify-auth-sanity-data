# Netlify Auth & Sanity Data

A bare minimum app that allows a Netlify identity user to log in, and securely read and write data scoped to their user in a private Sanity datastore

This repo is *not* something you should fork to use for your next production project.  It's just a thing I made to learn/demonstrate one way this can work.


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

