import { StravaActivity, StravaStats } from "@/types/strava";

// const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
// const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
// const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

/**
 * Placeholder for Strava API integration.
 * In production, you would use these to fetch real running data.
 */

export async function getAccessToken() {
    // Logic to refresh token using client_id, client_secret, and refresh_token
    return "placeholder_token";
}

export async function getRecentActivities(): Promise<StravaActivity[]> {
    // const accessToken = await getAccessToken();
    // Fetch from https://www.strava.com/api/v3/athlete/activities

    return [
        {
            id: 1,
            name: "Morning Run in Landmark 81",
            distance: 5200,
            moving_time: 1560,
            elapsed_time: 1600,
            total_elevation_gain: 10,
            type: "Run",
            start_date: new Date().toISOString(),
            average_speed: 3.3,
            max_speed: 4.5,
            has_heartrate: true,
            average_heartrate: 145,
        }
    ];
}

export async function getAthleteStats(): Promise<StravaStats | null> {
    // Fetch from https://www.strava.com/api/v3/athletes/{id}/stats
    return null;
}
