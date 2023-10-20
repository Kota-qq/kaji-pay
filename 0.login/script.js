document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // ここでユーザー認証の検証を行う
    // 例: ダミーのユーザー名とパスワードを検証
    if (username === "user" && password === "password") {
      alert("ログイン成功");
      // ログイン成功時のリダイレクトなどの処理を追加
    } else {
      alert("ログイン失敗");
    }
  });