'use strict';

const db = require('../models');
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const secretKey = process.env.SECRET_KEY;
const expireTime = process.env.EXPIRE_TIME;

exports.getSignUpPage = (req, res) => {
    res.render('signup', {
        input: '',  
        error: ''
    });
};

exports.getSignInPage = (req, res) => {
    res.render('signin');
};

exports.getDashboardPage = (req, res) => {
    db.Users.findOne({
        where: {id: req.user.id}
    })
        .then((user) => {
            res.render('dashboard', {
                user: user.name,
            });
        });
};

exports.createUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render('signup', { 
            input: req.body,
            error: errors.array()[0].msg });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = db.Users.build({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    newUser
        .save()
            .then(() => {
                req.user = newUser;
                next();
            })
            .catch(() => {
                res.render('signup', {
                    input: req.body,
                    error: 'Email is already in use'
                });
            });
};

exports.checkSignIn = (req, res, next) => {
    db.Users.findOne({
        where: {email: req.body.email}
    })
        .then((user) => {
            if(user.dataValues && bcrypt.compareSync(req.body.password, user.dataValues.password)) {
                req.user = user;
                next();
            } else {
                res.redirect('/signin');
            }
        });
}

exports.createJWT = (req, res, next) => {
    const payload = {
        id: req.user.id
    };
    const option = {
        expiresIn: expireTime
    }
    const token = jwt.sign(payload, secretKey, option);
    res.cookie('token', token, {maxAge:60000, httpOnly:false});
    next();
}

exports.auth = (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.redirect('/signin');
        } else {
            req.user = decoded;
            next();
        }
    });
}

exports.removeAuth = (req, res, next) => {
    res.cookie('token', '', {maxAge:60000, httpOnly:false});
    next();
}