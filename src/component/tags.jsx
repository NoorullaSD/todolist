function Tags() {
    let tag = [
        {
            id: 1,
            title: "Tag 1",
            bgColor: 'rgba(255, 0, 0, 0.5)',
        },
        {
            id: 2,
            title: "Tag 2",
            bgColor: 'rgba(0, 255, 0, 0.5)',
        },
    ]
    return (
        <div className="list-container work-container">
            <h6 className="list-tittle">
                Lists
            </h6>
            <ul className="list-group list-group-horizontal">
                {
                    tag.map((item, index) => {
                        return (
                            <div key={index} style={{ borderRadius: '10%', marginRight: "10px" }} >
                                <a style={{ backgroundColor: item?.bgColor, }} href="#" className="list-group-item">{item?.title}</a>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Tags