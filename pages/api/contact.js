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
<li>Avis : ${req.body.avis}</li>
<h3>Message</h3>
<p>${req.body.message}</p>
</ul>
`

      const transporter = nodemailer.createTransport({
          service: 'SendinBlue', // no need to set host or port etc.
          auth: {
              user: 'ludovic.chartouni@maxandlea.com',
              pass: 'Uxs6w5Ec0DYWrVPm'
          }
      });

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: "contact@maxandlea.com", // sender address
      to: "hadrien.jaubert99@gmail.com, theodore.d.avray@efrei.net",  // list of receivers
      subject: `${req.body.sujet}`, // Subject line
      text: "Hello world?", // plain text body
      html: output, // html body,
    });

    res.send('ok')
    console.log("Message sent: %s", info.messageId);
  }
};

export default handler;
