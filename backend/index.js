import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    assistant_id: DataTypes.STRING,
    thread_id: DataTypes.STRING,
});
await User.sync({ alter: true })

const openAi = new OpenAI({
    apiKey: '',
});

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chatbox/load', async function (req, res) {
    const loadReq = req.body;
    console.log('loadReq', loadReq);

    const user = await User.findByPk(loadReq.user_id);
    console.log('user', user);

    if (!user.assistant_id || !user.thread_id) {
        if (!user.assistant_id)
            user.assistant_id = await createAssistants();

        if (!user.thread_id)
            user.thread_id = await createThread();

        console.log('user.assistant_id', user.assistant_id);
        console.log('user.thread_id', user.thread_id);
        await user.save();
    }

    const msgs = await loadMessage(user);

    const response = { success: true, msgs: msgs };
    console.log('response', response);
    res.status(200).json(response);
})

app.post('/chatbox/send', async function (req, res) {
    const sendReq = req.body;
    console.log('sendReq', sendReq);

    const user = await User.findByPk(sendReq.user_id);
    console.log('user', user);

    if (!user.assistant_id || !user.thread_id) {
        if (!user.assistant_id)
            user.assistant_id = await createAssistants();

        if (!user.thread_id)
            user.thread_id = await createThread();

        console.log('user.assistant_id', user.assistant_id);
        console.log('user.thread_id', user.thread_id);
        await user.save();
    }

    const run = await openAi.beta.threads.runs.createAndPoll(user.thread_id, {
        assistant_id: user.assistant_id,
        additional_instructions: 'If there is no topic or the topic is end try yo find new topic and start it.',
        additional_messages: [{ role: 'user', content: sendReq.msg, },],
    });

    const msgs = await loadMessage(user);

    const response = { success: true, msgs: msgs };
    console.log('response', response);
    res.status(200).json(response);
})

async function createAssistants() {
    const assistant = await openAi.beta.assistants.create({
        model: 'gpt-3.5-turbo-0125',
        name: 'English Tutor',
        instructions: 'You are a personal English tutor. Chat with student casually to help them improve conversation skill',
    });
    return assistant.id;
}

async function createThread() {
    const thread = await openAi.beta.threads.create();
    return thread.id;
}

async function prepareThread() {
    const thread = await openAi.beta.threads.create();
    return thread.id;
}

async function loadMessage(user) {
    const msgs = [];
    const messages = await openAi.beta.threads.messages.list(user.thread_id);
    for (const message of messages.getPaginatedItems()) {
        for (const content of message.content) {
            if (content.type == 'text') {
                msgs.push({
                    role: message.role,
                    content: content.text.value
                });
            }
        }
    }
    msgs.reverse();
    return msgs;
}

app.post('/login', function (req, res) {
    const request = req.body;
    console.log(request);
    response = { success: true, request: request };
    res.status(200).json(response);
})

app.post('/register', function (req, res) {
    const request = req.body;
    console.log(request);
    response = { success: true, request: request };
    res.status(200).json(response);
})

app.post('/change-password', function (req, res) {
    const request = req.body;
    console.log(request);
    response = { success: true, request: request };
    res.status(200).json(response);
})

const user1 = await User.create({
    username: 'user1',
    password: '',
    assistant_id: '',
    thread_id: '',
});

var server = app.listen(4800, function () {
    console.log("Express App running at http://127.0.0.1:4800/");
})

