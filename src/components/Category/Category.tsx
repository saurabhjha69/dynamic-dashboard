import { useState } from "react";
import Widget from "../Widget/Widget"
import Modal from "../Modal/Modal";
import "./Category.css"
type Widget = {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
}

type Category = {
    id: string;
    name: string;
    widgets: Widget[]

}
type CategoryProps = {
    data: Category
}

function Category({data}: CategoryProps) {
    const [showModal,setShowModal] = useState<boolean>(false);
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const handleShowModal = () => {
        setShowModal(true)
        setShouldRender(true);
    }
    const handleCloseModal = () => {
        setShowModal(false)
        setTimeout(()=> {
            setShouldRender(false)
        },500)
    }
    return (
        <>
            <div className="category">
                <h4>{data.name}</h4>
                <div className="widgets">
                    {data.widgets.map(widget => {
                        if (widget.isActive)
                        return(
                            <Widget categoryId={data.id} data={widget} key={widget.id} />
                        )
                    })
                }
                    <div className="widget only-btn">
                        <button className="add-widget" onClick={handleShowModal}>Add Widget +</button>
                    </div>
                </div>
            </div>
            { shouldRender ? 
                <Modal 
                    isVisible={showModal} 
                    closeModal={handleCloseModal} 
                    categoryId={data.id}
                    categoryName={data.name}/>
            : null
            }
        </>
    )
}

export default Category