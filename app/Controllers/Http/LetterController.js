'use strict'
const Letter = use('App/Models/Letter')
const Database = use('Database')

class LetterController {

    async list({ request, response, auth}){
        if(auth.user.santa_user == true){
            return await Database.from('letters').select('id','title', 'text')}
        else{
            return await Database.from('letters').select('id','title', 'text').where('user_id', auth.user.id)}
        }
    async store({ request, response, auth }){
        
        const data = request.only(['title', 'text'])
        data.user_id = auth.user.id

        const letter = await Letter.create(data)

        return letter
    }

    async show({ params, request, response, auth}){
        let letter = "";
        letter = await Letter.findOrFail(params.id)
        if(auth.user.santa_user == true || auth.user.id == letter.user_id){
            return letter
        }
        else{
            return "Sem autorização para verificar essa carta"}
        }

    async update({ params, request, response, auth}){
        let letter = "";
        letter = await Letter.findOrFail(params.id)
        if(auth.user.santa_user == true || auth.user.id == letter.user_id){
            const data = request.only(['title', 'text'])
            letter.merge(data)
            await letter.save();
            return letter
        }
        else{
        return "Sem autorização para modificar essa carta"}
        }

    async delete({ params, request, response, auth}){
        let letter = "";
        letter = await Letter.findOrFail(params.id)
        if(auth.user.santa_user == true || auth.user.id == letter.user_id){
            await letter.delete();
            return "Carta excluída"
            }
        else{
        return "Sem autorização para deletar essa carta"}
        }
}

module.exports = LetterController
