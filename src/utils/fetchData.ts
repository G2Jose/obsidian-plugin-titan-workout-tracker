import { request } from "obsidian";
import { WorkoutSessionsResponse } from "src/types";

export const fetchData = async ({
	userId,
	token,
}: {
	userId: string;
	token: string;
}) => {
	const params: Parameters<typeof request>[0] = {
		url: `https://api.titangymapp.com/users/${userId}/obsidian-data`,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		contentType: "application/json",
		method: "GET",
	};

	const response: WorkoutSessionsResponse = JSON.parse(await request(params));
	return response;
};
