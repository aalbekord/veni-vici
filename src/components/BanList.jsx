import "./BanList.css"

const BanList = (props) => {
  return (
    <>
      <div className="ban-container">
        <h2>Ban List</h2>
        <div className="ban-list">
          {props.bans.map((ban) => 
            <button className="tag" onClick={props.onClick} key={ban}>{ban}</button>
          )}
        </div>
      </div>
    </>
  )
}
export default BanList;