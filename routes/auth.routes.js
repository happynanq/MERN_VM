const {Router} = require('express')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { check, validationResult } = require('express-validator');
const config = require("config")
const router = Router()
const User = require("../models/User")

// /api/auth/register
router.get('/register', (req,res)=>{
  res.send("Hi")
})


router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({min:6})
  ],
  async(req,res)=>{
    try {
      // res.setHeader('Access-Control-Allow-Origin', '*');
      // res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
      console.log('Body', req.body);

      const errors =  validationResult(req)
      if(!errors.isEmpty()){
        return res.status(400).json({
          message : "Ошибка аунтификации: некорректны данные регистрации ",
          errors: errors.array()
        })
      }
      
      const {email, password} = req.body
      const candidate = await User.findOne({ email })

      if(candidate){
        return res.status(400).json({message:"Пользователь с таким emal уже существует"})
      }
      const hashedPassword = await bcrypt.hash(password, 12)


      const user = new User({email, password : hashedPassword})

      
      await user.save()

      res.status(201).json({message:"Пользователь создан"})

  } catch (e) {
      res.status(500).json({massage:'Что-то пошло не так, попробуйте снова'})
  }
})


// /api/auth
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists()
  ],
  async (req,res)=>{
    
    try {
      console.log('body', req.body);
      const errors =  validationResult(req)
  
      if(!errors.isEmpty){
        return res.status(400).json({
          message : "Ошибка аунтификации: некорректны данные входе ",
          errors: errors.array()
        })
      }
      const {email, password} = req.body

      const user = await User.findOne({email})

      if(!user){
        return res.status(400).json({message :"Email введён неправильно"})
      }

      const isMath = await bcrypt.compare(password, user.password)
      if(!isMath ){
        return res.status(400).json({message : "Неверный пароль, попробуйте снова" })
      }

      const token = jwt.sign(
        {userId:user.id},
        config.get("jwtSecret"),
        {expiresIn:'1h'}
      )
      res.json({token, userId : user.id})

    } catch (e) {
      res.status(500).json({massage:'Что-то пошло не так, попробуйте снова'})
    }
})

module.exports = router 