const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
	log: ['error', 'info', 'warn'],
});

// let client = prisma;

if (process.env.NODE_ENV !== 'production') {
	const chalk = require('chalk');

	/**
	 * Middleware for logging
	 * Time each query took to run
	 */
	prisma.$use(async (params, next) => {
		const before = Date.now();
		const result = await next(params);
		const after = Date.now();

		console.error(
			chalk.red(
				`Query ${params.model}.${params.action} took ${
					after - before
				}ms`
			)
		);

		return result;
	});

	// * NEW METHOD UNCOMMENT IT LATER
	// const prismaWithTimeLoggingMiddleware = prisma.$extends({
	// 	query: {
	// 		async $allOperations({ operation, model, args, query }) {
	// 			const start = performance.now();
	// 			const result = await query(args);
	// 			const end = performance.now();
	// 			const time = end - start;

	// 			console.log(
	// 				chalk.red(`Query ${model}.${operation} took ${time}ms`)
	// 			);
	// 			return result;
	// 		},
	// 	},
	// });

	// client = prismaWithTimeLoggingMiddleware;
}

module.exports = prisma;
// module.exports = client;
