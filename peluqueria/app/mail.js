var mail  = require('../config/mail');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/contactenos',urlencodedParser, function(req, res){

  formulario = req.body;

  var mailOptions = {
    from: '<miltonvera96@gmail.com>',
    to: 'divaspa8@gmail.com',
    subject: 'Correo enviado desde DivaSpa Web: ' + formulario.Motivo,
    text: 'Correo enviado por: \n\tNombre: '
                + formulario.Nombre + '\n\tCorreo: ' +  formulario.Correo
                + '\n Escribe con motivo de ' + formulario.Motivo
                + '\n\n\tMensaje : \n' + formulario.Mensaje,
    attachments: [{
        filename: 'logo.png',
        path: './img/logo.png',
        cid: './img/logo.png'
    }]
  };

  mail.transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send(true);
    }
  });


// view engine setup

});

router.get('/sendemail', function(req, res){
  mail.sendPasswordReset('mialvera@espol.edu.ec','Milton Vera' , '12/12/12','23:12', 'Peluquria', 'Richard Robayo');

});


module.exports = router;
