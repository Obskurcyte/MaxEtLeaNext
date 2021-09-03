import nodemailer from 'nodemailer';

const handler = async (req, res) => {
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

        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });

        await new Promise((resolve, reject) => {
            // send mail with defined transport object
            transporter.sendMail({
                from: "contact@maxandlea.com", // sender address
                to: "hadrien.jaubert99@gmail.com, theodore.d.avray@efrei.net",  // list of receivers
                subject: "Nouvel avis utilisateur", // Subject line
                text: "Hello world?", // plain text body
                html: output, // html body,
            });
        })

        res.status(200).json({status: "OK"})
    }
};

export default handler;
