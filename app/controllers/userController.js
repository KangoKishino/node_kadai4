'use strict';

const db = require('../models');
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcdefg";

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
    console.log(req.decoded);
    res.render('dashboard', {
        user: req.decoded.name,
    });
};

exports.createUser = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.render('signup', { 
            input: req.body,
            error: errors.array()[0].msg });
    }
    const newUser = db.Users.build({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
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
            if(!user.dataValues || user.dataValues.password !== req.body.password) {
                res.redirect('/signin');
            }
            req.user = user;
            next();
            
        });
}

exports.createJWT = (req, res) => {
    const payload = {
        name: req.user.name
    };
    const option = {
        expiresIn: '1m'
    }
    const token = jwt.sign(payload, SECRET_KEY, option);
    res.cookie('token', token, {maxAge:60000, httpOnly:false});
    res.render('dashboard', {
        user: req.user.name
    });
}

exports.auth = (req, res, next) => {
    const token = req.cookies.token;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            res.redirect('/signin');
        } else {
            req.decoded = decoded;
            next();
        }
    });
}

exports.removeAuth = (req, res, next) => {
    res.cookie('token', '', {maxAge:60000, httpOnly:false});
    next();
}