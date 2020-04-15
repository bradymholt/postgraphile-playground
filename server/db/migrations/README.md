By default, any new objects created will not be accessible to APP_USER.

To grant access to `table_name`:

```
GRANT SELECT, INSERT, UPDATE, DELETE ON table_name TO ${process.env.POSTGRES_KNOWN_USER};
GRANT SELECT, USAGE ON table_name_id_seq TO ${process.env.POSTGRES_KNOWN_USER};
```
