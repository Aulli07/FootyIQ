export interface PlayerType {
  id: string,
  name: string,
  nationality: string,
  birthYear: number,
  heightCm: number,
  position: string,
  image: string,
  status: string,
  team: string,
  teamCountry: string,
  currentClubId?: string,
}