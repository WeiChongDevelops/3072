import '../css/App.css'
import Game3072 from "./Game3072.tsx";
import "../css/Cell.css";
import "../firebase.ts";

const SIZE = 4;
export default function App() {
  return (
    <>
      <Game3072 size={SIZE}/>
    </>
  )
}
