# Schemas

This file is just notes on the sanity schemas for reference's sake. 

## webuser

```js

export default {
  name: 'webUser',
  title: 'Web User',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'Notes',
      title: 'notes',
      type: 'array',
      of: [
        { type: 'reference',
          to: [ 
            { type: 'note' }
          ]
        }
      ]
    }
  ]
}

```

## note

```js

export default {
  name: 'note',
  title: 'Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    }
  ]
}


```