const NotificacionAgenda = ({ message, type }) => {
    if (message === null) {
      return null
    }

    const notificacionStyle = {
      color: type === 'success' ? 'green' : 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  
    return (
      <div style={notificacionStyle}>
        {message}
      </div>
    )
  }

  export default NotificacionAgenda