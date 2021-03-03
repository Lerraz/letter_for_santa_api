'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/register', 'AuthController.register')
Route.post('/authenticate', 'AuthController.authenticate')
Route.put('/authenticate/:id','AuthController.update').middleware(["auth"])

Route.get('/letters','LetterController.list').middleware(["auth"])
Route.get('/letters/:id','LetterController.show').middleware(["auth"])
Route.post('/letters','LetterController.store').middleware(["auth"])
Route.put('/letters/:id','LetterController.update').middleware(["auth"])
Route.delete('/letters/:id','LetterController.delete').middleware(["auth"])
