import React from 'react'


function CardItem(props) {
    const {onImageClick, url, name, children, index} = props

    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
          return title.substring(0, maxLength) + '...';
        }
        return title;
      };

      
    return (
        <div className="card">
            <div>
                <img onClick={() => onImageClick(index)} src={url} alt={name} style={{ width: '100%' }} />
                <h2 style={{ fontWeight: 'bold' }}>{truncateTitle(name, 15)}</h2>
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CardItem