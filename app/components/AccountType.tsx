export default function AccountType({title, image, description}: {title: string, image: string, description: string}){
    return (
        <div className="account-type">
            <img src={image} alt={title} className="account-type-icon" style={{width: '150px', height: '150px'}} />
            <h3 className="account-type-title">{title}</h3>
            <p className="account-type-description">{description}</p>
        </div>
    )
}