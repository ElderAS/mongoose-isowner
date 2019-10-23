module.exports = function mongooseIsOwner(schema, options = {}) {
  const { resolver } = options
  if (!resolver) throw new Error('Resolver is required')

  schema.statics.isOwner = isOwner

  function isOwner(doc, user) {
    return Promise.resolve(resolver(doc, user))
  }
}
