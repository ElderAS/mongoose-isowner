module.exports = function mongooseIsOwner(schema, options = {}) {
  const { resolver } = options
  if (!resolver) throw new Error('Resolver is required')

  schema.statics.isOwner = isOwner

  function isOwner(doc, user) {
    if (!doc || !user) return false

    return Promise.resolve(resolver(doc, user))
  }
}
