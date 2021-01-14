'use strict';

const db = require('../models');
const { validationResult } = require('express-validator');

exports.getNewPage = (req, res) => {
    db.Users.findOne({
        where: {id: req.user.id}
    })
        .then((user) => {
            res.render('new', {
                input: '',
                user: user.name,
                error: ''
            });
        });
};

exports.newBoard = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render('new', { 
            input: req.body,
            user: req.user.name,
            error: errors.array()[0].msg
        });
    }
    const newBoard = await db.Boards.build({
        title: req.body.title,
        text: req.body.text,
        userId: req.user.id,
        userName: req.user.name,
        like: 0
    });
    newBoard
        .save()
            .then(() => {
                next();
            })
            .catch(() => {
                res.render('new', { 
                    input: req.body,
                    user: req.user.name,
                    error: ''
                });
            });
};

exports.edit = (req, res) => {
    db.Boards.findOne({
        where: {id: req.params.boardId}
    })
        .then((board) => {
            res.render('edit', {
                input: board,
                boardId: req.params.boardId,
                user: req.user.name,
                error: ''
            });
        });
    
}

exports.updateBoard = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render('edit', { 
            input: req.body,
            boardId: req.params.boardId,
            user: req.user.name,
            error: errors.array()[0].msg
        });
    }
    const boardId = req.params.boardId;
    await db.Boards.update({ 
        title: req.body.title,
        text: req.body.text
    },
        { where: { id: boardId }
    })
        .then(() => {
            next();
        });
}

exports.deleteBoard = (req, res, next) => {
    const boardId = req.params.boardId;
    db.Boards.destroy({
        where: { id: boardId }
    })
        .then(() => {
            next();
        });
}