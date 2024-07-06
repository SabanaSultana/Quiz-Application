const express=require("express")
const router=express.Router()
const regusterUser=require('../controllers/user')

router.post('/',regusterUser)

module.exports = router;