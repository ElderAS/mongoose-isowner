# mongoose-isowner

[![Build Status](https://travis-ci.org/ElderAS/mongoose-isowner.svg?branch=master&style=flat-square)](https://travis-ci.org/ElderAS/mongoose-isowner)
[![npm](https://img.shields.io/npm/dt/mongoose-isowner.svg?style=flat-square)](https://www.npmjs.com/package/mongoose-isowner)
[![npm](https://img.shields.io/npm/v/mongoose-isowner.svg?style=flat-square)](https://www.npmjs.com/package/mongoose-isowner)

[Mongoose](http://mongoosejs.com/) plugin for ownership determination by calling [Model].isOwner(doc, user)

### Installation

`npm install --save mongoose-isowner`

### Usage

```js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongooseIsOwner = require('mongoose-isowner')

let YourSchema = new Schema({
  title: String,
  description: String,
  author: String,
})

YourSchema.plugin(mongooseIsOwner, {
  resolver: function(doc, user) {
    return doc.owner.equals(user._id)
  },
})

let Model = mongoose.model('YourSchema', YourSchema)
```

After setting up, you can call `.isOwner(doc, user)` on your model which will determine if the user is the owner.

```js
Model.isOwner(doc, user)
```

## License

[The MIT License](http://opensource.org/licenses/MIT)
Copyright (c) Carsten Jacobsen
