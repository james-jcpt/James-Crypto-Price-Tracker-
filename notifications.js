export function setupNotifications() {
    console.log("Notifications system ready");
    setInterval(() => {
        console.log("Check for market alerts...");
    }, 60000);
}
