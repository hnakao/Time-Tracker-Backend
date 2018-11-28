
const { complement, compose, isNil, pickBy } = require('ramda')
const Entity = require('./entity')
const notNull = compose(complement(isNil))
/**
 * we need to remove undefined array means not required data.
 */
const cleanData = (entity) => pickBy(notNull, entity)
const makeEntity = (entity) => compose(cleanData, Entity.extend(entity))

module.exports = {
  cleanData,
  makeEntity
}
