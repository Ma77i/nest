// normalizr
const { schema, normalize } = require("normalizr");

// models
const chatModel = require("../models/chatModel");

// logger
const logger = require("../log/winston");

module.exports = {
  // obtener chats
  get: async (req, res) => {
    const chat = await chatModel.find();
    res.send(chat);
  },

  // obtener chat por id
  getById: async (req, res) => {
    const { id } = req.params;
    console.log("POSTMAN: ", id);
    try {
      
      const byId = await chatModel.getById(id);
      res.status(200).send(byId);
    } catch (error) {
      res.status(500);
      console.log(error);
    }
  },

  // crear mensaje
  post: async (req, res) => {
    const { body } = req;
    try {
      const message = await chatModel.create(body);
      logger.info("Mensaje enviado");
      res.status(201).send(message);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  put: (req, res) => {
    res.send("ok");
  },

  // borrar mensaje
  deleteById: async (req, res) => {
    const { id } = req.params;
    try {
      const delOne = chatModel.deleteById(id);
      res.status(200).send(delOne);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  // borrar todos los mensajes
  deleteAll: async (req, res) => {
    try {
      const del = await chatModel.deleteAll();
      res.status(200).send(del);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getNorm: async () => {
    const author = new schema.Entity("authors", {}, { idAttribute: "mail" });
    const chat = new schema.Entity("chats", {
      author: author
    });

    const data = new schema.Entity("data", {
      chats: [chat]
    });

    const chatDB = await chatModel.find({});

    const normalizedData = normalize(
      {
        id: "chats",
        mensajes: chatDB.map((d) => {
          author: d.author;
          text: d.text;
          date: d.date;
          id: d._id.toString();
        })
      },
      data
    );
    console.log(normalizedData);
    return normalizedData;
  }
};
