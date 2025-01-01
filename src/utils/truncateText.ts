const truncateText = (text: string) : string =>{
    return (text.length > 20 ? text.substring(0,20) + '...' : text)
}

export default truncateText