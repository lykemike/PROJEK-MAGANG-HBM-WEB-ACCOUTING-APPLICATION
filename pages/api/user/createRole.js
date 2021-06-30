import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

export default async (req, res) => {
	try {
		const createRole = await prisma.role.createMany({
			data: [
				{
					roleType: req.body.role_type,
					roleDesc: req.body.role_desc
				}
			],
			skipDuplicates: true
		});

		res.status(201).json({ message: 'CREATE ROLE SUCCESS!', data: createRole });
	} catch (error) {
		res.status(400).json({ roleType: 'CREATE ROLE FAILED!', error });
		console.log(error);
	}
};
