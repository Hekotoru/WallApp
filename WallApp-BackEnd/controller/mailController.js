var nodemailer = require("nodemailer");

module.exports = {
  Mail: function(userInfo){
    var smtpTransport = nodemailer.createTransport({
      service: "Gmail",  // sets automatically host, port and connection security settings
      auth: {
        user: "email@gmail.com",
        pass: "password"
      }
    });
    smtpTransport.sendMail({  //email options
      from: "Heko WallApp <email@gmail.com>", // sender address.  Must be the same as authenticated user if using GMail.
      to: ""+userInfo.firstname+"<"+userInfo.email+">", // receiver
      subject: "Welcome to WallApp", // subject
      text: "Hello "+userInfo.firstname+" thanks for register in our website." // body
    }, function(error, response){  //callback
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: " + response.message);
      }
      smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
    });
  }
}
