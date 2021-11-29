import express, { Request, Response, NextFunction } from 'express';
const app = express();
const mongoose = require('mongoose')
const { FriendModel } = require('./models/Friends')
const cors = require('cors');

/// DATABASE CONNECTION
mongoose.connect("mongodb://localhost:27017/mybest11?readPreference=primary&appname=MongoDB%20Compass&ssl=false", 
    { useNewUrlParser: true }
);

app.use(express.json());
app.use(cors());

app.post('/addfriend', async (req : Request, res: Response) => {
    const name = req.body.name;
    const age = req.body.age;
    const friend = new FriendModel({
        name, age
    });
    await friend.save();
    res.send(friend);
})

app.get('/insert', async (req : Request, res: Response) => {
    const test = new FriendModel({name: "TTT", age: 40});
    await test.save()
    res.send("Inserted Data");
})

app.get('/read', async (req : Request, res: Response) => {
    FriendModel.find({}, (err: unknown, result: Response) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/readOne/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    FriendModel.find({ "_id" : id }, (err: unknown, result: Response) => {
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

app.delete('/delete/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id).exec()
    res.send("item deleted.");
})

app.put('/update', async (req: Request, res: Response) => {
    const newName = req.body.name
    const newAge = req.body.age
    const id = req.body.id

    try {
        FriendModel.findById(id, (error: unknown, friendToUpdate: any) => {
            friendToUpdate.age = Number(newAge);
            friendToUpdate.name = newName;
            friendToUpdate.save();
        })
    } catch (err: unknown) {
        console.log(err)
    }

    res.send('updated');
})

app.listen(3001, () => {
    console.log('you are connected!');
})
