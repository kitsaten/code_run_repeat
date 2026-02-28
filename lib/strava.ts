import { StravaActivity, StravaStats } from "@/types/strava";

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN;

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ATHLETE_ENDPOINT = "https://www.strava.com/api/v3/athlete";
const ACTIVITIES_ENDPOINT = "https://www.strava.com/api/v3/athlete/activities";

export async function getAccessToken() {
    try {
        const response = await fetch(TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: STRAVA_CLIENT_ID || "",
                client_secret: STRAVA_CLIENT_SECRET || "",
                refresh_token: STRAVA_REFRESH_TOKEN || "",
                grant_type: "refresh_token",
            }).toString(),
            next: { revalidate: 3600 }, // Cache token for 1 hour
        });

        if (!response.ok) {
            console.error("Failed to fetch Strava Access Token", await response.text());
            throw new Error("Failed to fetch Strava access token");
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Error getAccessToken:", error);
        return null;
    }
}

async function getAthleteId(accessToken: string) {
    try {
        const response = await fetch(ATHLETE_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { revalidate: 86400 }, // Cache athlete ID for 24 hours
        });

        if (!response.ok) {
            throw new Error("Failed to fetch athlete ID");
        }

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error("Error getAthleteId:", error);
        return null;
    }
}

export async function getRecentActivities(perPage = 10, page = 1): Promise<StravaActivity[]> {
    const accessToken = await getAccessToken();
    if (!accessToken) return [];

    try {
        const url = `${ACTIVITIES_ENDPOINT}?per_page=${perPage}&page=${page}`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { revalidate: 1800 }, // Cache activities for 30 mins
        });

        if (!response.ok) {
            console.error("Failed to fetch Strava activities", await response.text());
            return [];
        }

        const data = await response.json();
        return data as StravaActivity[];
    } catch (error) {
        console.error("Error getRecentActivities:", error);
        return [];
    }
}

export async function getAthleteStats(): Promise<StravaStats | null> {
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const athleteId = await getAthleteId(accessToken);
    if (!athleteId) return null;

    try {
        const url = `https://www.strava.com/api/v3/athletes/${athleteId}/stats`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { revalidate: 3600 }, // Cache stats for 1 hour
        });

        if (!response.ok) {
            console.error("Failed to fetch Strava stats", await response.text());
            return null;
        }

        const data = await response.json();
        return data as StravaStats;
    } catch (error) {
        console.error("Error getAthleteStats:", error);
        return null;
    }
}
