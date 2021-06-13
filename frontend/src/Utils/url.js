var url = "";

if (process.env.REACT_APP_ENV === "development") {
  url = "http://localhost:8000";
} else {
  url = "https://supplierdemo.herokuapp.com";
}
// console.log(url)
export default url;
