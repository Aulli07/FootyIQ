import { comparisonList } from "../components/app-shell";

export default function totalCompares() {
  const searchesList = [];

  for (let i = 0; i < comparisonList.length; i++) {
    for (let j = i + 1; j < comparisonList.length; j++) {
      const comparedPerson = comparisonList[i];
      const toComparePerson = comparisonList[j];

      if (comparedPerson.id !== toComparePerson.id) {
        searchesList.push([comparedPerson, toComparePerson]);
      }
    }
  }

  return searchesList;
}