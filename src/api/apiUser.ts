const URL = "https://api-zingmp3-vercel.vercel.app/api/home";
class UserClient {
    async getUser() {
        const response = await fetch(`${URL}`);
        const data = await response.json(); // Parse JSON
        return data;
    }
}
const userApi = new UserClient();
export default userApi;
