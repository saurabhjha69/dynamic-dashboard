/*
 * DynamicDashboardApp
 * Copyright (c) 2025 Saurabh Rajesh Jha
 * 
 * Released under the MIT License.
 * Free to use for non-commercial / non-profit purposes.
 * Commercial use requires separate permission.
 */
import "./Modal.css"
import { useDispatch } from "react-redux";
import { addWidget, startLoading } from "../../redux/slice/slice";
import type { AppDispatch } from "../../redux/store/store";
import { useEffect, useState } from "react";

type ModalProps = {
    categoryId: string,
    categoryName: string,
    isVisible: boolean
    closeModal: () => void
}
type InputState = {
    categoryId: string,
    widgetTitle: string,
    widgetDescription: string
}

function Modal({isVisible,closeModal,categoryId,categoryName} : ModalProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [inputData,setInputData] = useState<InputState>({
        categoryId: categoryId,
        widgetTitle: "",
        widgetDescription: ""
    })

    useEffect(()=>{
        if(isVisible) {
             document.body.style.overflow = "hidden";
        }
        else {
             document.body.style.overflow = "";
        }
    }, [isVisible])

    const handleInputState = (e) => {
        const {name,value} = e.target
        setInputData((inputData) => ({...inputData, [name]: value}))
    }

    const handleFormSubmit = () => {
        dispatch(startLoading())
        dispatch(addWidget(inputData))
        setInputData((inputData) => ({...inputData, widgetTitle: "", widgetDescription: ""}))
        closeModal()
        
    }
    return (
        <div className={`modal-wrapper ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <div className={`modal ${isVisible ? 'pop-down' : 'pop-up'}`}>
                <div className="modal__header">
                    <h4>{categoryName}</h4>
                </div>
                <div className="modal__body">
                    <div className="input-group">
                        <label htmlFor="widget-title">Title</label>
                        <input 
                            placeholder="Widget Title" 
                            type="text" name="widgetTitle" 
                            id="widget-title"
                            value={inputData.widgetTitle}
                            onChange={handleInputState}/>
                    </div>
                    <div className="input-group">
                        <label htmlFor="widget-description">Description</label>
                        <textarea 
                            placeholder="Widget Description" 
                            name="widgetDescription" 
                            id="widget-description" 
                            rows={3}
                            value={inputData.widgetDescription}
                            onChange={handleInputState}
                            ></textarea>
                    </div>
                </div>
                <div className="modal__cta">
                    <button onClick={handleFormSubmit}>Add Widget</button>
                </div>
                <button className="modal__close" onClick={closeModal}>x</button>
            </div>
        </div>
    )
}

export default Modal