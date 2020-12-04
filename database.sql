-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data
CREATE TABLE shopping_list (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (800) NOT NULL,
	"quantity" DECIMAL(20,2) NOT NULL,
	"unit" VARCHAR (20) NOT NULL,
	"purchased" BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO shopping_list ("name", "quantity", "unit") VALUES ('avocados', 0.75, '4');
INSERT INTO shopping_list ("name", "quantity", "unit") VALUES ('ramyeon',  5, 'packs');
INSERT INTO shopping_list ("name", "quantity", "unit") VALUES ('apples', 10, 'baskets');