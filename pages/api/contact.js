import nodemailer from 'nodemailer';

const handler = (req, res) => {
  console.log(req.body)
  if (req.method === 'POST') {
    const output = `
<p>Vous avez une nouvelle demande par email<p/>
<h3>Voici les détails : </h3>
<ul>
<li>Nom : ${req.body.nom}</li>
<li>Prenom : ${req.body.prenom}</li>
<li>Email : ${req.body.email}</li>
<li>Sujet : ${req.body.sujet}</li>
<h3>Message</h3>
<p>${req.body.message}</p>
</ul>
`

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'maxetlea.dev@gmail.com', // generated ethereal user
        pass: 'Hello13012'
      },
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: `${req.body.email}`, // sender address
      to: "hadrien.jaubert99@gmail.com, theodore.d.avray@efrei.net",  // list of receivers
      subject: `${req.body.sujet}`, // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body,
    });

    console.log("Message sent: %s", info.messageId);
  }
};

export default handler;
