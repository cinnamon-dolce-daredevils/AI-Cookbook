const {
    db,
    models: { User }
} = require('../db')

const users = [
	{
		first_name: "John",
		last_name: "Doe",
		username: "johndoe",
		password: "password",
		email: "johndoe@example.com",
	},
	{
		first_name: "Jane",
		last_name: "Doe",
		username: "janedoe",
		password: "password",
		email: "janedoe@example.com",
	},
	{
		first_name: "Bob",
		last_name: "Smith",
		username: "bobsmith",
		password: "password",
		email: "bobsmith@example.com",
	},
	{
		first_name: "Alice",
		last_name: "Jones",
		username: "alicejones",
		password: "password",
		email: "alicejones@example.com",
	},
	{
		first_name: "Mike",
		last_name: "Johnson",
		username: "mikejohnson",
		password: "password",
		email: "mikejohnson@example.com",
	},
	{
		first_name: "Sarah",
		last_name: "Davis",
		username: "sarahdavis",
		password: "password",
		email: "sarahdavis@example.com",
	},
	{
		first_name: "David",
		last_name: "Brown",
		username: "davidbrown",
		password: "password",
		email: "davidbrown@example.com",
	},
	{
		first_name: "Karen",
		last_name: "Taylor",
		username: "karentaylor",
		password: "password",
		email: "karentaylor@example.com",
	},
	{
		first_name: "Chris",
		last_name: "Wilson",
		username: "chriswilson",
		password: "password",
		email: "chriswilson@example.com",
		
	},
	{
		first_name: "Amy",
		last_name: "Martinez",
		username: "amymartinez",
		password: "password",
		email: "amymartinez@example.com",
	},
	{
		first_name: "Ryan",
		last_name: "Anderson",
		username: "ryananderson",
		password: "password",
		email: "ryananderson@example.com",
	},
	{
		first_name: "Kelly",
		last_name: "Clark",
		username: "kellyclark",
		password: "password",
		email: "kellyclark@example.com",
	},
	{
		first_name: "Mark",
		last_name: "Perez",
		username: "markperez",
		password: "password",
		email: "markperez@example.com",
	},
	{
		first_name: "Laura",
		last_name: "Garcia",
		username: "lauragarcia",
		password: "password",
		email: "lauragarcia@example.com",
	},
	{
		first_name: "Eric",
		last_name: "Rivera",
		username: "ericrivera",
		password: "password",
		email: "ericrivera@example.com",
	},
];

const seed = async () => {
	try {
		await db.sync({ force: true });
		await Promise.all(
			users.map((user) => {
				return User.create(user);
			})
		);
		console.log("Seeding success!");
		db.close();
	} catch (err) {
		console.error("Oh noes! Something went wrong!");
		console.error(err);
		db.close();
	}
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log("seeding...");
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log("closing db connection");
		await db.close();
		console.log("db connection closed");
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
