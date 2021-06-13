var url = "";

if (process.env.REACT_APP_ENV === "development") {
  url = "http://localhost:8000";
} else {
  url = "http://localhost:8000";
}
// console.log(url)
export default url;
