'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../models');

exports.changeLike = (req, res, next) => {
    const newLike = db.Likes.build({
        userId: req.user.id,
        postId: req.params.postId
    });
    newLike
        .save()
            .then(() => {
                next();
            })
            .catch((error) => {
                next(error);
            });
}

exports.changeDislike = async (req, res, next) => {
    await db.Likes.findOne({
        where: {
            [Op.and]: {
                userId: req.user.id,
                postId: req.params.postId
            }
        }
    })
        .then((post) => {
                db.Likes.destroy({
                    where: {
                        [Op.and]: {
                            userId: req.user.id,
                            postId: req.params.postId
                        }
                    }
                })
            next();
        })
        .catch((error) => {
            next(error);
        });
}

exports.deleteLike = (req, res, next) => {
    db.Likes.destroy({
        where: { postId: req.params.postId }
    })
        .then(() => {
            next();
        })
        .catch((error) => {
            next(error);
        });
}