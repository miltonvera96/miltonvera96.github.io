var nodemailer = require('nodemailer');
var xoauth2  = require('xoauth2');
var EmailTemplate = require('email-templates-v2').EmailTemplate;

var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'divaspa8@gmail.com',
        pass: 'diva_start'
    }
};

var transporter = nodemailer.createTransport(smtpConfig);


var enviarMailReserva = transporter.templateSender(
  new EmailTemplate('./email-template/'), {
    	from: 'divaspa8@gmail.com',
  });

var enviarMailReservaFunc = function (email, nombre, fecha, hora, descripcion, empleado) {
    // transporter.template
    enviarMailReserva({
        to: email,
        subject: 'Reservacion de Servicio - DivaSpa.com'
    },{
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        descripcion: descripcion,
        empleado: empleado
    }, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log('Link sent\n'+ JSON.stringify(info));
        }
    });
};
module.exports = {
  transporter : transporter,
  enviarMailReservaFunc: enviarMailReservaFunc
}
