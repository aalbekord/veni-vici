import "./BanList.css"

const BanList = (props) => {
  return (
    <>
      {<h1>Ban List</h1>}
      {props.bans.map((ban) => 
        <button className="tag" onClick={props.onClick} key={ban}>{ban}</button>
      )}
    </>
  )
}
export default BanList;