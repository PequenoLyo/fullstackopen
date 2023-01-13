const Notification = (props) => {
  if (props.message === null) { return null }
  const className = `notification ${props.className}`
  return (
    <div className={className}>
      {props.message}
    </div>
  )
}

export default Notification