'use strict'


/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LettersSchema extends Schema {
  up () {
    this.create('letters', (table) => {
      table.increments()
      table.string('title', 254).notNullable()
      table.text('text').notNullable()
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.timestamps()
  })
  }

  down () {
    this.drop('letters')
  }
}

module.exports = LettersSchema
