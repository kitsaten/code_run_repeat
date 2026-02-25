export interface RunningStats {
    totalDistance: string;
    weeklyMileage: string;
    currentPace: string;
    marathonPR: string;
    totalElevation: string;
    activeStreak: string;
    lastRunDistance: string;
    lastRunPace: string;
    lastRunTime: string;
    shoeName: string;
    shoeKm: string;
}

export interface StravaActivity {
    id: number;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    start_date: string;
    average_speed: number;
    max_speed: number;
    has_heartrate: boolean;
    average_heartrate?: number;
    max_heartrate?: number;
}

export interface StravaStats {
    all_run_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elapsed_time: number;
        elevation_gain: number;
    };
    recent_run_totals: {
        count: number;
        distance: number;
        moving_time: number;
        elapsed_time: number;
        elevation_gain: number;
    };
}
