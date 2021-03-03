'use strict'
const User = use('App/Models/User')

class AuthController {
    async register({ request }) {
    
        const data = request.only(['username', 'email', 'password', 'santa_user'])

        const user = await User.create(data)

        return user
    }

    async authenticate({ request, auth }) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)

        return token
    }

    async update({ params, request, response, auth}){
        let user = "";
        user = await User.findOrFail(params.id)
        if(auth.user.id == user.id){
            const data = request.only(['password'])
            user.merge(data)
            await user.save();
            return user
        }
        else{
        return "Sem autorização para modificar este usuário"}
        }
}

module.exports = AuthController
