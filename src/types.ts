export type WorkoutSessionsResponse = {
	obsidianData: ObsidianDatum[];
};

export type ObsidianDatum = {
	start: Date;
	end: Date;
	workouts: Workout[];
};

export type Workout = {
	position: number;
	exerciseName: string;
	workoutSets: WorkoutSet[];
	primaryMuscles: string[];
	secondaryMuscles: string[];
};

export type WorkoutSet = {
	weight: number;
	reps: number;
	completedAt: Date;
	position: number;
};

export type TitanPluginSettings = {
	pluginDataDir: string;
	token: string;
	userId: string;
};
