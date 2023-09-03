import express from 'express';
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express();
const port = 3000;
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

// server settings
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.get('/identify', async (req, res) => {
	res.send('Hello World!');
});

app.post('/identify', async (req, res) => {
	const { email, phoneNumber } = req.body;

	if (!email && !phoneNumber) {
		return res.status(400).json({ error: "Either 'email' or 'phoneNumber' must be provided." });
	}


	let existingContacts = []
	try {
		// Search for an existing contact based on email or phoneNumber
		existingContacts = await prisma.contact.findMany({
			where: {
				OR: [
					{ email: email },
					{ phoneNumber: phoneNumber }
				]
			},
			orderBy: [
				{
					updatedAt: 'asc',
				}]
		});
		console.log(existingContacts)
		res.status(500).json({ error: 'An error occurred while processing the request.' });
		// if (existingContact) {
		// 	console.log(existingContact)
		// 	// If an existing contact is found, update the phoneNumber and email if provided
		// 	if (email && !existingContact.emails.includes(email)) {
		// 		existingContact.emails.push(email);
		// 	}
		// 	if (phoneNumber && !existingContact.phoneNumbers.includes(phoneNumber)) {
		// 		existingContact.phoneNumbers.push(phoneNumber);
		// 	}
		//
		// 	// If the contact is a "secondary" contact, add its ID to the primary contact's secondaryContactIds
		// 	if (existingContact.primaryContactId !== existingContact.id) {
		// 		const primaryContact = await prisma.contact.findUnique({ where: { id: existingContact.primaryContactId } });
		// 		if (!primaryContact.secondaryContactIds.includes(existingContact.id)) {
		// 			primaryContact.secondaryContactIds.push(existingContacts.id);
		// 			await prisma.contact.update({
		// 				where: { id: primaryContact.id },
		// 				data: { secondaryContactIds: { push: existingContact.id } }
		// 			});
		// 		}
		// 	}
		// } else {
		// 	// If no existing contact is found, create a new contact
		// 	const newContact = await prisma.contact.create({
		// 		data: {
		// 			phoneNumber: phoneNumber,
		// 			email: email,
		// 			linkedId: null,
		// 			linkPrecedence: 'primary'
		// 		}
		// 	});
		//
		// 	existingContacts.push(newContact)
		// }
		//
		// // Format the response according to the desired output format
		// const response = {
		// 	contact: {
		// 		primaryContatctId: existingContact.primaryContactId,
		// 		emails: existingContact.emails,
		// 		phoneNumbers: existingContact.phoneNumbers,
		// 		secondaryContactIds: existingContact.secondaryContactIds,
		// 	}
		// };
		//
		// return res.json(response);
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: 'An error occurred while processing the request.' });
	}
	// res.send('body posted');
});



app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
