export interface IGameCard {
  picURL: string,
  id: string,
  coverURL: string,
  counter: number,
  updateCounter: React.Dispatch<React.SetStateAction<number>>,
  position: number
}