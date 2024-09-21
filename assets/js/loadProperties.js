const urlParams = new URLSearchParams(window.location.search)
const pageType = urlParams.get("type")
const data = [
  {
    propType: pageType,
    sortBy: pageType === "rent" ? "costo" : "dateAdded",
  },
]
document.querySelector(`.link-${pageType}`).classList.add("active")
