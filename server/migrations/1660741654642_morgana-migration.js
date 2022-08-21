/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.query(`
    CREATE TRIGGER update_ab_changetimestamp BEFORE UPDATE
    ON users FOR EACH ROW EXECUTE PROCEDURE 
    update_changetimestamp_column();
    `)
};

exports.down = pgm => {
    `DROP TRIGGER IF EXISTS update_ab_changetimestamp ON users RESTRICT`
};
