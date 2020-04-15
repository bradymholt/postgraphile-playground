const Koa = require("koa");
const { postgraphile } = require("postgraphile");
var DBMigrate = require("db-migrate");
const isProduction = process.env.NODE_ENV == "production";

(async () => {
  const dbmigrate = DBMigrate.getInstance(true, {
    cmdOptions: {
      "migrations-dir": "db/migrations"
    }
  });
  await dbmigrate.up();

  const app = new Koa();

  app.use(
    postgraphile(process.env.DATABASE_URL, "public", {
      watchPg: !isProduction,
      graphiql: true,
      enhanceGraphiql: true,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      ignoreIndexes: false,
      enableCors: true,
      showErrorStack: "json",
      extendedErrors: ["hint", "detail", "errcode"],
      appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
      enableQueryBatching: true,
      legacyRelations: "omit",
      jwtPgTypeIdentifier: "public.jwt_token",
      jwtSecret: process.env.JWT_SECRET,
      pgDefaultRole: process.env.POSTGRESS_ANONYMOUS_USER
    })
  );

  app.listen(process.env.PORT || 5000);
})();
