
let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')
chai.should()
chai.use(chaiHttp)



describe('user registered', async () =>{
    describe('POST /api/users/',()=>{
        it('save users details',()=>{
            let body={
                "userId": 25,
                "firstname": "Raj",
                "lastname": "Patil",
                "username": "user@yopmail.com",
                "mobile": 1234567890
            }
            chai.request(server)
            .post('/api/users')
            .send(body)
            .end((err,res) =>{
                res.should.have.status(200)
            })
        })
    })
})
describe('user get', async () =>{
    describe('GET /api/users/',()=>{
        it('get users details',()=>{
            chai.request(server)
            .get('/api/users')
            .end((err,res) =>{
                res.should.have.status(200)
            })
        })
    })
})