import './BoxComponent.scss';

const BoxComponent = ({bgColor, title, icon, count}) => {
  return (
    <div className={`info-box ${bgColor}`}>
    <span className="info-icon">{ icon }</span>
    <span className="info-text">
        <p>{title}</p>
        <h4>{count}</h4>
    </span>
    </div>
  )
}
export default BoxComponent