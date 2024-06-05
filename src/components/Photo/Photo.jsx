function Photo({ name , image }){
    return(
        <div>
            <div>{name}</div>
            <div><img src={image} /></div>
        </div>
    )
}

export default Photo;