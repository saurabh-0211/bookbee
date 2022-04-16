// Eshaan slept with Say...

const Login = () => {
  return (
    <div>
      <main>
        <div className="login">
          <div className="form">
            <form onSubmit={this.submitHandler}>
              <h1 className="material-icons">BookBee</h1>
              <input type="text" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <input type="submit" placeholder="submit" required />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Login;
