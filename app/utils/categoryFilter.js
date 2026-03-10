export function getCategory() {
  let age = new Date().getFullYear() - this.birthYear;
  let rating = this.footyRating;

  if (age < 22 && rating >= 8.5) {
    return "top_prospect";
  } else if (age >= 22 && age < 30 && rating >= 8.0) {
    return "prime";
  } else if (age >= 30 && age < 43 && rating >= 7.5) {
    return "legend";
  } else if (rating >= 9.0) {
    return "best";
  } else {
    return "good";
  }
}