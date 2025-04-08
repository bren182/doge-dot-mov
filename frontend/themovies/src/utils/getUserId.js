export function getUserId() {
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      userId = `user_${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem("user_id", userId);
    }
    return userId;
  }