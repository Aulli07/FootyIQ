export interface PlayerType {
  id: string,
  name: string,
  nationality: string,
  age: number,
  heightCm: number,
  position: string,
  preferredFoot: string,
  image: string,
  status: string,
  currentClub: {
    id: string,
    name: string,
    country: string
  }
}