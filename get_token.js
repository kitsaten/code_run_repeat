const STRAVA_CLIENT_ID = "206700";
const STRAVA_CLIENT_SECRET = "50787dfdcaff16842481557084aac423614a694d";

async function getToken() {
    const code = process.argv[2];
    if (!code) {
        console.error("Vui lòng dán mã 'code' vào sau lệnh: node get_token.js <your_code>");
        return;
    }

    console.log("Đang đổi mã code lấy Refresh Token...");

    try {
        const response = await fetch("https://www.strava.com/oauth/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id: STRAVA_CLIENT_ID,
                client_secret: STRAVA_CLIENT_SECRET,
                code: code,
                grant_type: "authorization_code"
            })
        });

        const data = await response.json();

        if (data.errors) {
            console.error("Lỗi từ Strava:", JSON.stringify(data.errors, null, 2));
            return;
        }

        console.log("\n--- KẾT QUẢ THÀNH CÔNG ---");
        console.log("STRAVA_REFRESH_TOKEN:", data.refresh_token);
        console.log("--------------------------\n");
        console.log("Hãy copy dòng STRAVA_REFRESH_TOKEN trên và dán vào file .env.local của bạn.");
    } catch (err) {
        console.error("Lỗi kết nối:", err.message);
    }
}

getToken();
