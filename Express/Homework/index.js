const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const handleSorting = require('./utils')
app.use(express.json());

// Initialize Database.json if it doesn't exist
if (!fs.existsSync('Database.json')) {
    fs.writeFileSync('Database.json', JSON.stringify({ Contact: [] }));
}

app.get('/', (req, res) => {
    const contacts = JSON.parse(fs.readFileSync('Database.json'));
    res.send(contacts);
});

app.post('/', (req, res) => {
    let { firstName, lastName, email, phone } = req.body;
    const contacts = JSON.parse(fs.readFileSync('Database.json'));
    const newContact = {
        id: contacts.Contact.length + 1,
        firstName,
        lastName,
        email,
        phone,
        createdAt: new Date().toISOString()
    };
    contacts.Contact.push(newContact);
    fs.writeFileSync('Database.json', JSON.stringify(contacts));
    res.status(201).send(newContact);
});

app.get('/contact', (req, res) => {
    const { order, sort } = req.query;
    let contacts = JSON.parse(fs.readFileSync('Database.json'));
    let response = handleSorting(order, sort, contacts);
    if (!order && !sort) res.status(200).json(contacts);

    res.status(201).json(response);
});
app.get('/contact/:id', (req, res) => {
    try {
        let { id } = req.params;
        let contectID = JSON.parse(fs.readFileSync('Database.json'))
            .Contact
            .find(contact => contact.id == id);
        res.json(contectID);
    }
    catch (err) {
        res.status(404).json({ message: 'Something went wrong' })
    }

});
app.patch('/contact/:id', (req, res) => {
    try {
        let { id } = req.params;
        let updatedData = req.body;
        let contacts = JSON.parse(fs.readFileSync('Database.json'));
        let ContactIndex = contacts.Contact.findIndex((item)=> item.id == id);
        if(ContactIndex === -1) return res.status(404).json({error : 'Not Found'});

        contacts.Contact[ContactIndex] = {
            ...contacts.Contact[ContactIndex],
            ...updatedData,
        };
        console.log(contacts.Contact[ContactIndex])
        fs.writeFileSync('Database.json',JSON.stringify(contacts,null,2));

        res.status(201).json({message:'Success',Value: contacts.Contact[ContactIndex]})

    }
    catch(err){
        res.status(404).json({message:'Something went wrong'})
    }

});

app.delete('/contact/:id', (req,res)=>{
    let {id} = req.params;

        let contacts = JSON.parse(fs.readFileSync('Database.json'));
        let ContactIndex = contacts.Contact.findIndex((item)=> item.id == id);
        if(ContactIndex === -1) return res.status(404).json({error : 'Not Found'});

        const deletedContact = contacts.Contact.splice(ContactIndex, 1)[0];

        fs.writeFileSync('Database.json',JSON.stringify(contacts,null,2));

        res.status(201).json({message:'Success',Value: deletedContact})

})


app.listen(port, () => {
    console.log(`Contact app listening at http://localhost:${port}`);
});

