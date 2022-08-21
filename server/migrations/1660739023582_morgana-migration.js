/* eslint-disable camelcase */

//CREATE USERS TABLE

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    icon TEXT,
    color VARCHAR(10) DEFAULT '#FF0000',
    theme BOOLEAN DEFAULT false,
    inviteHash TEXT NOT NULL UNIQUE,
    birth TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    rtcid TEXT NOT NULL UNIQUE,
    isactive BOOLEAN DEFAULT FALSE,
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
               )`)
};

exports.down = pgm => {
    pgm.query(`
    DROP TABLE users;
    `)
};
