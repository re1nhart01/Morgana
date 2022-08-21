/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.query(`
    CREATE OR REPLACE FUNCTION update_changetimestamp_column()
    RETURNS TRIGGER AS $$
    BEGIN
    NEW.changetimestamp = now(); 
    RETURN NEW;
    END;
    $$ language 'plpgsql';
`)
};

exports.down = pgm => {
    `DROP FUNCTION IF EXISTS update_changetimestamp_column;`
};
